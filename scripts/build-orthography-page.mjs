import fs from 'node:fs';

const sourcePath = '/tmp/kashmiri-orthography-share.html';
const outputPath = new URL('../dist/orthography.html', import.meta.url);
const source = fs.readFileSync(sourcePath, 'utf8');
let content = source.split('</header>')[1].split('</body>')[0];
content = content.replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<aside class="sidebar">[\s\S]*?<\/aside>/i, '')
  .replace(/<div id="panel"[\s\S]*?<\/div>/i, '')
  .replace(/<div id="fn-pop"[\s\S]*?<\/div>/i, '')
  .replace(/<h1>Arabic, Kashmiri<\/h1>\s*<div class="orthographyLine">Nastaliq orthography notes<\/div>/i, '')
  .replace(/\s+id="toc"/g, '')
  .replace(/\s+id="tochead"/g, '');
const base = 'https://r12a.github.io/scripts/arab/';
content = content.replace(/\b(src|href)="([^"#][^"]*)"/gi, (all, attr, value) => {
  try { return `${attr}="${new URL(value, base).href}"`; } catch { return all; }
});

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Complete Kashmiri Arabic-script orthography and typography guide, adapted from Richard Ishida's v32 notes.">
<title>Kashmiri orthography · Koshur Lughat</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css"><link rel="stylesheet" href="/assets/expanded.css">
<style>
body.orthography-body { background: #f7f6f0; }
.orthography-header { max-width: 1180px; margin: 0 auto; padding: 18px 26px; display:flex; justify-content:space-between; align-items:center; gap:20px; }
.orthography-header a { color: var(--green); font-weight:700; text-decoration:none; }
.orthography-main { max-width: 1180px; margin: 0 auto; padding: 38px 26px 80px; }
.orthography-main > header { border-bottom: 1px solid var(--line); padding-bottom: 28px; }
.orthography-main h1 { max-width: 780px; font-size: clamp(36px, 6vw, 68px); line-height: 1.04; margin: 12px 0; color: var(--forest); }
.orthography-main .lede { max-width: 760px; color: var(--muted); font-size: 17px; line-height: 1.7; }
.source-credit { padding: 15px 18px; margin: 24px 0 0; border-left: 4px solid var(--green); background: #e9eee3; color: var(--forest); line-height: 1.6; }
.orthography-toc { margin: 30px 0; padding: 22px; border: 1px solid var(--line); border-radius: 14px; background: white; }
.orthography-toc strong { display:block; margin-bottom:10px; color:var(--forest); }
.orthography-toc a { display:inline-block; margin: 4px 14px 4px 0; color:var(--green); font-size: 13px; text-decoration:none; }
.orthography-toc a:hover { text-decoration:underline; }
.orthography-content { background: white; border: 1px solid var(--line); border-radius: 16px; padding: clamp(20px, 4vw, 52px); overflow-wrap:anywhere; }
.orthography-content h2 { color: var(--forest); font-size: 30px; line-height:1.2; margin: 44px 0 14px; padding-top: 18px; border-top: 1px solid var(--line); scroll-margin-top: 20px; }
.orthography-content h3 { color: var(--green); font-size: 21px; margin: 30px 0 10px; scroll-margin-top:20px; }
.orthography-content h4 { color: var(--forest); margin-top:24px; }
.orthography-content p, .orthography-content li { max-width: 920px; line-height:1.65; }
.orthography-content table { width:100%; display:block; overflow-x:auto; border-collapse:collapse; margin:16px 0 24px; font-size:13px; }
.orthography-content th, .orthography-content td { border:1px solid #dfe3dc; padding:7px 9px; vertical-align:top; }
.orthography-content th { background:#eef2e9; color:var(--forest); text-align:left; }
.orthography-content [lang="ks"], .orthography-content [lang^="ks-"] { font-family:"Noto Nastaliq Urdu", serif; font-size:1.2em; }
.orthography-content .mapItem, .orthography-content .example { margin-block: 14px; }
.orthography-content img { max-width:100%; height:auto; }
.orthography-content code, .orthography-content pre { white-space:pre-wrap; overflow-wrap:anywhere; }
.orthography-content .smallprint, .orthography-content #status { color:var(--muted); font-size:13px; }
@media(max-width:760px){.orthography-header,.orthography-main{padding-left:16px;padding-right:16px}.orthography-content{padding:18px}.orthography-content h2{font-size:25px}}
</style>
</head>
<body class="orthography-body">
<header class="site-header orthography-header"><a class="brand" href="/"><span class="brand-mark">ک</span><span><strong>Koshur Lughat</strong><small>کٲشُر لُغَتھ</small></span></a><a href="/">← Dictionary</a></header>
<main class="orthography-main">
<header><p class="eyebrow">WRITING SYSTEM · SOURCE NOTES V32</p><h1>Kashmiri Arabic orthography</h1><p class="lede">The complete Kashmiri Perso-Arabic writing and typography reference used by this dictionary: sounds, characters, combining marks, shaping, direction, layout, punctuation and forms.</p><p class="source-credit"><strong>Source and attribution.</strong> Richard Ishida, <em>Arabic (Kashmiri), Nastaliq orthography notes v32</em>, updated 27 April 2026. The project owner reports rights-holder permission for this public reuse. The original reference remains available at <a href="https://r12a.github.io/scripts/arab/ks.html" target="_blank" rel="noopener noreferrer">r12a.github.io/scripts/arab/ks.html</a>.</p></header>
<nav class="orthography-toc" aria-label="Orthography sections"><strong>On this page</strong><div id="orthography-toc-links"></div></nav>
<article class="orthography-content">${content}</article>
</main>
<script>
const toc = document.querySelector('#orthography-toc-links');
document.querySelectorAll('.orthography-content h2, .orthography-content h3').forEach((heading, index) => {
  if (!heading.id) heading.id = 'orthography-' + index;
  const link = document.createElement('a'); link.href = '#' + heading.id; link.textContent = heading.textContent.trim();
  toc.append(link);
});
</script>
</body></html>\n`;
fs.writeFileSync(outputPath, page);
console.log(`wrote ${outputPath.pathname} (${page.length} chars)`);
