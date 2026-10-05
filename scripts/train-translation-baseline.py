"""Train bidirectional IBM Model 1 word translation probabilities on paired text."""
import collections, hashlib, json, math, pathlib, re
root = pathlib.Path(__file__).resolve().parents[1]
out = root/'training-data/translation-baseline'
out.mkdir(parents=True, exist_ok=True)
def tokenize(text):
    return re.findall(r'[^\W\d_]+(?:[\u064b-\u065f\u0670][^\W\d_]*)*',text.lower(), re.UNICODE)
rows = [json.loads(line) for line in (root/'training-data/reviewed-parallel.jsonl').read_text().splitlines() if line.strip()]
train, test = [], []
for row in rows:
    pair = (tokenize(row['english']), tokenize(row['kashmiri']))
    if not all(pair): continue
    (test if int(hashlib.sha256((row['english']+'\0'+row['kashmiri']).encode()).hexdigest(),16)%10 == 0 else train).append(pair)
def fit(pairs):
    candidates = collections.defaultdict(set)
    for source,target in pairs:
        for s in ['<NULL>']+source: candidates[s].update(target)
    probabilities = {s:{t:1/len(ts) for t in ts} for s,ts in candidates.items()}
    for iteration in range(30):
        counts = collections.defaultdict(lambda:collections.defaultdict(float))
        totals = collections.defaultdict(float)
        for source,target in pairs:
            source = ['<NULL>']+source
            for t in target:
                denominator = sum(probabilities[s][t] for s in source)
                for s in source:
                    contribution = probabilities[s][t]/denominator
                    counts[s][t] += contribution; totals[s] += contribution
        probabilities = {s:{t:c/totals[s] for t,c in ts.items()} for s,ts in counts.items()}
    return probabilities
models = {}
evaluation = {}
for direction,pairs,heldout in [('en-ks',train,test),('ks-en',[(b,a) for a,b in train],[(b,a) for a,b in test])]:
    probabilities = fit(pairs)
    models[direction] = probabilities
    tokens = covered = matches = 0
    for source,target in heldout:
        for s in source:
            tokens += 1
            if s in probabilities:
                covered += 1
                prediction = max(probabilities[s],key=probabilities[s].get)
                matches += prediction in target
    evaluation[direction] = {'heldoutSourceTokens':tokens,'coveredTokens':covered,'predictedWordPresentInReference':matches,'note':'Word coverage diagnostic; not a sentence translation accuracy score.'}
(out/'model.json').write_text(json.dumps({'architecture':'IBM Model 1','iterations':30,'models':models},ensure_ascii=False))
report = {'trainingPairs':len(train),'heldoutPairs':len(test),'iterations':30,'architecture':'IBM Model 1 bidirectional statistical word translation','evaluation':evaluation,'limitations':['Small source-attested corpus; most pairs are pending human review.','Word probabilities do not model Kashmiri grammar or sentence order.','Experimental artifact only; production NLLB weights and tokenizer unchanged.'],'sources':list({r['source']['url'] for r in rows})}
(out/'training-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False))
