# Master Kashmiri Linguistic & Grammar Patterns Reference Guide
**Repository:** [sameerahmad86232/cipher](https://github.com/sameerahmad86232/cipher)  
**Language:** Kashmiri (کٲشُر / Koshur) — ISO 639-3: `kas`  
**Script:** Kashmiri Perso-Arabic Orthography with Official Diacritics  

This document synthesizes deep structural, syntactic, and morphological patterns of the Kashmiri language extracted from classical grammars (Wade 1888, Grierson 1899), modern linguistic frameworks (Koul, Wali, Syeed, Hook), JKBOSE curriculum textbooks (Classes 1–10), and empirical corpus analysis.

---

## Table of Contents
1. [Clause Architecture & Word Order (V2 vs. Subordinate SOV)](#1-clause-architecture--word-order-v2-vs-subordinate-sov)
2. [Split Ergativity & Object Gender/Number Agreement](#2-split-ergativity--object-gendernumber-agreement)
3. [The Complete Kashmiri Tense & Aspect System](#3-the-complete-kashmiri-tense--aspect-system)
4. [Diacritical Orthography & Phonetic Disambiguation](#4-diacritical-orthography--phonetic-disambiguation)
5. [The Pronominal Suffix (Clitic) System](#5-the-pronominal-suffix-clitic-system)
6. [The 3-Way Genitive (Possessive) System](#6-the-3-way-genitive-possessive-system)
7. [Dative Experiencer Constructions (Psychological Predicates)](#7-dative-experiencer-constructions-psychological-predicates)
8. [Correlative Symmetrical Clauses](#8-correlative-symmetrical-clauses)
9. [Echo-Word Reduplication Morphology](#9-echo-word-reduplication-morphology)
10. [Classical Translation Case Study: Sahih al-Bukhari Hadith 1](#10-classical-translation-case-study-sahih-al-bukhari-hadith-1)
11. [The 4 Noun Declensions & Case System](#11-the-4-noun-declensions--case-system)
12. [Postpositional Case Governance (Dative vs. Ablative vs. Genitive)](#12-postpositional-case-governance-dative-vs-ablative-vs-genitive)
13. [Causative, Double Causative & Passive Voice Morphology](#13-causative-double-causative--passive-voice-morphology)
14. [Conjunctive Participles (`ـِتھ` / *-ith*), Modals & Light Verbs](#14-conjunctive-participles-%D9%80%D9%90%D8%AA%DA%BE--ith-modals--light-verbs)
15. [Negation, Prohibition & Interrogative V2 Placement](#15-negation-prohibition--interrogative-v2-placement)
16. [The Quintuple Deictic & Adverbial Series (Wade Ch. VI)](#16-the-quintuple-deictic--adverbial-series-wade-ch-vi)
17. [Honorifics, Politeness & Classical Register](#17-honorifics-politeness--classical-register)
18. [Morphophonemic Vowel Harmony, Palatalization & Corpus Statistics](#18-morphophonemic-vowel-harmony-palatalization--corpus-statistics)

---

## 1. Clause Architecture & Word Order (V2 vs. Subordinate SOV)

Kashmiri is distinct among Indo-Aryan languages for adhering to the **Verb-Second (V2)** rule in main clauses (similar to German or Dutch), while permitting **Verb-Final (SOV)** in dependent clauses.

### Main Clauses: Strict V2
In an independent clause, the finite verb or auxiliary copula (`چھُ`, `اوس`, etc.) must occupy the **second structural slot**:
$$\text{XP (Constituent 1)} + \mathbf{V_{finite}\ [Position\ 2]} + \text{YP} + \text{ZP}$$

* **Subject First**:  
  `سُہ` (1) `چھُ` (2) `کِتاب پَران` (3) — *Suh chu kitaab paraan.* ("He is reading a book.")
* **Object First (Topicalization)**:  
  `کِتاب` (1) `چھُ` (2) `سُہ پَران` (3) — *Kitaab chu suh paraan.* ("The book, he is reading.")
* **Adverb First**:  
  `اَز` (1) `چھُ` (2) `سُہ کِتاب پَران` (3) — *Az chu suh kitaab paraan.* ("Today, he is reading a book.")

### Subordinate Clauses with `تِکیازِ` (*Tikyazi* = Because)
When introduced by a subordinating conjunction (`تِکیازِ`, `زِ`, `ییلہِ`, `حالانٛکِہ`), word order relaxes from strict V2 into canonical **SOV (Verb-Final)**:

* **Canonical SOV Subordinate Clause**:  
  `...تِکیازِ تٔمۍ کِتاب پٔر۔`  
  *(...tikyazi təm' kitaab pər.)*  
  $\rightarrow \text{Conjunction} + \text{Ergative Subject} + \text{Object} + \mathbf{Verb_{final}}$
* **Spoken SVO Infiltration**:  
  `...تِکیازِ تٔمۍ پٔر کِتاب۔`  
  *(...tikyazi təm' pər kitaab.)*

---

## 2. Split Ergativity & Object Gender/Number Agreement

Kashmiri operates a **split-ergative alignment** conditioned by tense/aspect and verb transitivity.

### The Rule
1. **Incomplete/Present/Future Tenses**: The subject is **Nominative**, and the verb agrees with the subject.
2. **Past/Perfective Transitive Verbs**: The subject takes the **Ergative Case** (`تٔمۍ` instead of `سُہ`), and the verb **agrees exclusively with the Direct Object** in gender and number.

| Object Category | Object Example | Kashmiri Verb Form | Complete Past Sentence | English Meaning |
| :--- | :--- | :---: | :--- | :--- |
| **Feminine Singular** | `کِتاب` (*kitaab* — book) | **پٔر** (*pər*) | `تٔمۍ پٔر کِتاب۔` | *He/She read a book.* |
| **Masculine Singular** | `اَخبار` (*akhbaar* — paper) | **پۆر** (*por*) | `تٔمۍ پۆر اَخبار۔` | *He/She read a newspaper.* |
| **Feminine Plural** | `کِتابہٕ` (*kitaabə* — books) | **پَرِ** (*pari*) | `تٔمۍ پَرِ کِتابہٕ۔` | *He/She read books.* |
| **Masculine Plural** | `اَخبارات` (*akhbaaraath*) | **پٔرۍ** (*pər'*) | `تٔمۍ پٔرۍ اَخبار۔` | *He/She read newspapers.* |

---

## 3. The Complete Kashmiri Tense & Aspect System

### A. The Present Auxiliary Copula (`چھُ` / *chu*)
$$\text{Subject} + \mathbf{Copula\ [V2]} + [\text{Object}] + \mathbf{Root\text{-}aan}$$

| Person | Masc. Sg. | Fem. Sg. | Masc. Pl. | Fem. Pl. | Example (*to read* = `پَرُن`) |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **1st** | `چھُس` (*chus*) | `چھَس` (*chas*) | `چھِ` (*chi*) | `چھِ` (*chi*) | `بِہ چھُس پَران` (*I am reading [m]*) |
| **2nd** | `چھُکھ` (*chukh*) | `چھَکھ` (*chakh*) | `چھِو` (*chiv*) | `چھِو` (*chiv*) | `ژٕ چھُکھ پَران` (*You are reading [m]*) |
| **3rd** | `چھُ` (*chu*) | `چھےٚ` (*che*) | `چھِ` (*chi*) | `چھَے` (*chey*) | `سُہ چھُ پَران` (*He is reading*) |

### B. The Past Imperfect Auxiliary Copula (`اوس` / *oos*)
* Masc. Sing: `اوس` (*oos*) $\rightarrow$ `سُہ اوس پَران` (*He was reading*)
* Fem. Sing: `ٲس` (*aas*) $\rightarrow$ `سۄ ٲس پَران` (*She was reading*)
* Masc. Plur: `ٲسۍ` (*əes'*) $\rightarrow$ `تِم ٲسۍ پَران` (*They were reading [m]*)
* Fem. Plur: `ٲسہِ` (*aasə*) $\rightarrow$ `تِمٕہ ٲسہِ پَران` (*They were reading [f]*)

### C. The Synthetic Future Tense
Future tense in Kashmiri does not use a copula; suffixes attach directly to the verb stem:
* 1st Sg: `بہٕ پَرٕ` (*Bə parə* — I will read)
* 1st Pl: `عٔسۍ پَروٚ` (*Əes' parav* — We will read)
* 2nd Sg: `ژٕ پَرَکھ` (*Tsə parakh* — You will read)
* 2nd Pl: `تۄہۍ پَرِو` (*Tɔh' pariv* — You all will read)
* 3rd Sg: `سُہ پَرِ` (*Suh pari* — He will read)
* 3rd Pl: `تِم پَرَن` (*Tim paran* — They will read)

### D. Perfect Participles (`ـمُت` / *-mut*)
* Masc Sg: `ـمُت` (*-mut*) $\rightarrow$ `پوٚرمُت` (*pormut*)
* Fem Sg: `ـمٕژ` (*-məts*) $\rightarrow$ `پٔرمٕژ` (*pərməts*)
* Masc Pl: `ـمٕتۍ` (*-mət'*) $\rightarrow$ `پٔرمٕتۍ` (*pərmət'*)
* Fem Pl: `ـمَژہِ` (*-matsə*) $\rightarrow$ `پَرمَژہِ` (*parmatsə*)

---

## 4. Diacritical Orthography & Phonetic Disambiguation

Because Kashmiri contains 16 distinct vocalic phonemes, standard Perso-Arabic letters without diacritics produce massive semantic ambiguity:

### Minimal Pair Homograph Disambiguation
| Skeleton Word | Diacritized Form | Pronunciation | Semantic Meaning | Grammatical Class |
| :---: | :---: | :---: | :---: | :---: |
| **گر** | **`گَر`** | */gar/* | If | Conjunction |
| **گر** | **`گُر`** | */gur/* | Horse | Noun (Animate) |
| **گر** | **`گَرٕ`** | */garə/* | Home / House | Noun (Inanimate / Locative) |
| **گر** | **`گۄر`** | */gɔr/* | Milkman | Noun (Agentive) |
| **پر** | **`پَر`** | */par/* | Feather / Wing | Noun |
| **پر** | **`پۆر`** | */por/* | He read (masc obj) | Transitive Past Verb |
| **پر** | **`پٔر`** | */pər/* | He read (fem obj) | Transitive Past Verb |
| **پر** | **`پٔرۍ`** | */pər'/* | They read (masc pl) | Transitive Past Verb |

---

## 5. The Pronominal Suffix (Clitic) System

Verbs can incorporate subject and object pronouns as suffixes, encoding a complete clause in a single word:

| Clitic Type | Clitic Suffix | Kashmiri Verb | Morphological Composition | Full English Translation |
| :--- | :---: | :--- | :--- | :--- |
| **1st Ergative** | `ـم` (*-m*) | **`پۆرم`** | `پۆر` (read) + `م` (by me) | *"I read it."* |
| **2nd Ergative** | `ـتھ` (*-th*) | **`پۆرتھ`** | `پۆر` (read) + `تھ` (by you) | *"You read it."* |
| **3rd Ergative** | `ـن` (*-n*) | **`پۆرُن`** | `پۆر` (read) + `ن` (by him/her) | *"He/She read it."* |
| **Fused Dual Clitic** | `ـمَس` (*-m-as*) | **`وۆنُمَس`** | `وۆن` (told) + `م` (I) + `س` (him) | *"I told him."* |
| **Fused Dual Clitic** | `ـمے` (*-m-y*) | **`دیُتُمے`** | `دیُت` (gave) + `م` (I) + `ے` (you) | *"I gave it to you."* |

---

## 6. The 3-Way Genitive (Possessive) System

| Owner Category | Masculine Possessed | Feminine Possessed | Example | Meaning |
| :--- | :---: | :---: | :--- | :--- |
| **Singular Male / Proper Name** | `سُنٛد` (*sund*) | `سٕنٛز` (*sənz*) | `عَسگَر سُنٛد گُر` | *Asgar's horse* |
| **Female / Any Plural Owner** | `ہُنٛد` (*hund*) | `ہِنٛز` (*hinz*) | `لَڑکیَن ہِنٛز کِتاب` | *The girls' book* |
| **Inanimate Entity / Place** | `ـُک` (*-uk*) | `ـٕچ` (*-əts*) | `شَہَرُک حال` | *State of the city* |

---

## 7. Dative Experiencer Constructions (Psychological Predicates)

Internal psychological, physiological, and emotional states take the **Dative Case (`مےٚ` / *Mye*)**:
* *I feel cold*: **`مےٚ چھےٚ شیٖشُر لَگان۔`** (*Mye che shēshur lagaan.*)
* *I have a headache*: **`مےٚ چھُ کَلہٕ دود۔`** (*Mye chu kalə dood.*)
* *I remember*: **`مےٚ چھُ یاد۔`** (*Mye chu yaad.*)
* *I need water*: **`مےٚ چھُ آب پَکار۔`** (*Mye chu aab pakaar.*)
* *I like this*: **`مےٚ چھُ یہِ پَسَند۔`** (*Mye chu yi pasand.*)

---

## 8. Correlative Symmetrical Clauses

Kashmiri pairs relative markers (`یـ`) with correlative markers (`تـ` / `سـ`):
* `یُس ... سُہ` (*Yus ... suh*): **`یُس ژھارِ، سُہ لَبِ۔`** (*Whoever seeks, he shall find.*)
* `یۆت ... تَتھ` (*Yot ... tath*): **`یۆت شَوق آسِ، تَتھ چھِ وَتھ میلان۔`** (*Where there is a will, there a way is found.*)
* `ییلہِ ... تِیلہِ` (*Yeli ... teli*): **`ییلہِ ژٕ یِکھ، تِیلہِ پَکو عٔسۍ۔`** (*When you come, then we will go.*)
* `یوٗتاہ ... تیوٗتاہ` (*Yootaah ... tyootaah*): **`یوٗتاہ کَرِکھ، تیوٗتاہ لَبِکھ۔`** (*As much as you do, that much you receive.*)

---

## 9. Echo-Word Reduplication Morphology

* **The `واو` (*W-*) Semantic Generalizer**:
  - `چاے واے` (*Chaay-waay* = Tea and snacks)
  - `کِتاب وِتاب` (*Kitaab-witaab* = Books and literature)
  - `کٲم وام` (*Kaam-waam* = Work and related duties)
  - `گَرٕ وَرٕ` (*Garə-warə* = Household and home)
* **Verbal Iterative Aspect**:
  - `پَکان پَکان` (*pakaan pakaan* = while continuously walking)
  - `پَران پَران` (*paraan paraan* = through continuous study)

---

## 10. Classical Translation Case Study: Sahih al-Bukhari Hadith 1

### Arabic Source Text:
> **«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ»**

### Master Kashmiri Translation:
> **«سارِوٕے کٲمَن (عَملَن) ہُنٛد دار و مَدار چھُ صِرف نِیَّتَن پؠٹھ، تہٕ ہَر اَکِس اِنسانَس مِلِہِ سۄے چیٖز، یِتھٕچ تٔمۍ نِیَّت کٔر۔**  
> **پَس یُس کانٛہہ کُنِہ دُنیٲوی فٲیدٕ حٲصِل کَرنہٕ خٲطرٕ، یا کٲنسہِ زَنانہِ سۭتۍ خانٛدَر (نِکاح) کَرنہٕ خٲطرٕ ہِجرَت کَرِ، تۆہ تَمہِ سٕنٛز ہِجرَت چھےٚ تَمِے مَقصَدَس خٲطرٕ شُمار گَژھان، یَمہِ خٲطرٕ تٔمۍ ہِجرَت کٔر۔»**

### Grammatical Parsing:
1. `سارِوٕے کٲمَن ہُنٛد دار و مَدار چھُ صِرف نِیَّتَن پؠٹھ`: Genitive Plural (`کٲمَن ہُنٛد`) with V2 copula (`چھُ`) and postpositional locative (`پؠٹھ`).
2. `ہَر اَکِس اِنسانَس مِلِہِ سۄے چیٖز`: Dative Benefactive (`ہَر اَکِس اِنسانَس`) + Future Verb (`مِلِہِ`).
3. `یِتھٕچ تٔمۍ نِیَّت کٔر`: Split Ergative Relative Clause with Feminine Object agreement (`نِیَّت` [f] $\rightarrow$ `کٔر`).
4. `تَمہِ سٕنٛز ہِجرَت چھےٚ`: Feminine Genitive (`سٕنٛز`) agreeing with `ہِجرَت` [f] + Feminine Copula (`چھےٚ`).

---

## 11. The 4 Noun Declensions & Case System

Per Wade's *Grammar of the Kashmiri Language* (Ch. II, Rules #7–36), Kashmiri nouns fall into **4 declensions** (2 Masculine, 2 Feminine) across 5 core cases:

| Declension | Gender & Ending | Nom. Sg. | Dative Sg. | Agentive/Erg. Sg. | Ablative Sg. | Dative/Erg. Pl. | Example |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **I (Masc. Consonant / -a)** | Masculine, no palatalization | `گَرٕ` (*garə*) | `گَرَس` (*garas*) | `گَرَن` (*garan*) | `گَرٕ` (*garə*) | `گَرَن` (*garan*) | `گَرَس مَنٛز` (*in the house*) |
| **II (Masc. Palatalized / -u)** | Masculine ending in short `-u` | `گُر` (*gur*) | `گُرِس` (*guris*) | `گُرۍ` (*gur'*) | `گُرِ` (*guri*) | `گُرؠن` (*gur'an*) | `گُرِس پؠٹھ` (*on the horse*) |
| **III (Fem. Vowel-mutating)** | Feminine with stem vowel shift | `کِتاب` (*kitaab*) | `کِتابِہ` (*kitaabi*) | `کِتابِہ` (*kitaabi*) | `کِتابِہ` (*kitaabi*) | `کِتابَن` (*kitaaban*) | `کِتابِہ مَنٛز` (*in the book*) |
| **IV (Fem. Invariable / -ə)** | Feminine ending in `-ə` / `-i` | `زَنان` (*zanaan*) | `زَنانہِ` (*zanaani*) | `زَنانہِ` (*zanaani*) | `زَنانہِ` (*zanaani*) | `زَنانَن` (*zanaanan*) | `زَنانہِ سۭتۍ` (*with the woman*) |

* **Epenthetic `ہ` (*-h-*) Insertion (Wade Rule #8)**: Vowel-final Declension I nouns insert `ہ` before `-as` / `-an` (e.g., `سَزا` *sazaa* $\rightarrow$ `سَزاہَس` *sazaahas*).

---

## 12. Postpositional Case Governance (Dative vs. Ablative vs. Genitive)

Postpositions always follow their noun phrase and **govern a specific oblique case** on the preceding noun:

| Governed Case | Postpositions | Kashmiri Examples | English Meaning |
| :--- | :--- | :--- | :--- |
| **Dative (`-as`, `-is`, `-i`, `-an`)** | `مَنٛز` (in), `پؠٹھ` (on/at), `نِش` (near/to), `خٲطرٕ` (for), `سۭتۍ` (with), `تَل` (under) | `سَرَس پؠٹھ` / `وانَس پؠٹھ` / `خۄابَن سۭتۍ` | *on the lake / at the store / with dreams* |
| **Ablative (`-ə`, `-i`, `-av`)** | `پؠٹھٕ` (from on), `مَنٛزٕ` (from inside), `نِشہِ` (from near), `بَغٲر` (without), `سِواے` (except) | `گَرٕ پؠٹھٕ` / `شَہَرٕ مَنٛزٕ` | *from home / out of the city* |
| **Genitive (`سُنٛد`, `ہُنٛد`, `ـُک`)** | `خِلاف` (against), `مُتعلِق` (about), `دٔسۍ` (by means of) | `تَمہِ سٕنٛدِ خِلاف` | *against him/her* |

> **Critical Contrast**: `پؠٹھ` (*peth*, "on/at") governs Dative (`مےٚ پؠٹھ`), whereas `پؠٹھٕ` (*pethə*, "from") governs Ablative (`گَرٕ پؠٹھٕ`). Dropping the final `ـٕ` changes "from" into "on".

---

## 13. Causative, Double Causative & Passive Voice Morphology

### A. Causative Derivation (Wade Rule #100)
Adding **`ـاوُن` (*-aavun*)** creates a first-degree causative (transitive); adding **`ـاوناوُن` (*-aavnaavun*)** creates a second-degree (double) causative:

| Base Verb (Intransitive/Simple) | 1st Causative (*to make X do*) | 2nd Causative (*to have someone make X do*) |
| :--- | :--- | :--- |
| `بَچُن` (*bachun* — to escape) | `بَچاوُن` (*bachaavun* — to save) | `بَچاوناوُن` (*bachaavnaavun* — to have saved) |
| `بوزُن` (*bozun* — to hear) | `بوزناوُن` (*boznaavun* — to inform) | `بوزناوناوُن` (*boznaavnaavun* — to have informed) |
| `بیہُن` (*behun* — to sit) | `بیہناوُن` (*behnaavun* — to seat) | `بیہناوناوُن` (*behnaavnaavun* — to have seated) |
| `دِیُن` (*diyun* — to give) | `دِیاوُن` (*diyaavun* — to cause to give) | `دِیاوناوُن` (*diyaavnaavun*) |

### B. Passive Voice (`ـنہٕ یُن` / *-nə yun*) (Wade Rule #101)
The passive is formed regularly by replacing the infinitive ending **`ـُن` (*-un*)** with invariable **`ـنہٕ` (*-nə*)** + inflected auxiliary **`یُن` (*yun*, "to come")**:
* `کَرُن` (*to do*) $\rightarrow$ `کَرنہٕ یِیِہ` (*will be done*) / `کَرنہٕ آو` (*was done [m.sg]*) / `کَرنہٕ آیہِ` (*was done [f.sg]*).
* `لیٖکھُن` (*to write*) $\rightarrow$ `لیٖکھنہٕ آمُت` (*has been written*).

---

## 14. Conjunctive Participles (`ـِتھ` / *-ith*), Modals & Light Verbs

### A. Conjunctive Participle (`ـِتھ` / *-ith*) — "Having done X, Y"
Attaches `ـِتھ` to the verb root to chain sequential actions without a conjunction:
* `پَرِتھ` (*parith* — having read): `کِتاب پَرِتھ گوٚو سُہ گَرٕ۔` (*Having read the book, he went home.*)
* `ہؠتھ` (*heth* — having taken / carrying): `کِتاب ہؠتھ آو۔` (*He came with the book.*)
* `ٲسِتھ` (*əesith* — being / despite being): `رازٕ ہَمٕس ٲسِتھ` (*despite being a royal swan*).

### B. Core Modal Auxiliaries
* **Ability (`ہؠکُن` / *hyekun* — can)**: `بہٕ ہؠکہٕ یہِ کٲم کٔرِتھ۔` (*I can do this work.*) — Takes the main verb in **`ـِتھ` (*-ith*)**!
* **Obligation (`پَزُن` / *pazun* — should/must)**: `تۄہۍ پَزِ سَچ وَنُن۔` (*You should speak the truth.*) — Takes **Dative subject** + Infinitive.
* **Need (`گَژھُن` / *gatshun* — ought/must)**: `یہِ گَژھِ کَرُن۔` (*This must be done.*)

### C. Light Verb Compounds (Noun/Adj + `کَرُن` / `گَژھُن` / `سَپُدُن`)
High-register and modern Kashmiri integrates Arabic, Persian, and English loanwords via light verbs:
* **Active/Transitive (`کَرُن` *karun*)**: `شروٗع کَرُن` (*to start*), `حٲصِل کَرُن` (*to obtain*), `رِوایَت کَرُن` (*to narrate*), `نَظَر کَرُن` (*to observe*).
* **Inchoative/Stative (`گَژھُن` *gatshun* / `سَپُدُن` *sapudun*)**: `نازِل سَپُدُن` (*to be revealed*), `بَنٛد گَژھُن` (*to close*), `شُمار گَژھُن` (*to be counted*).

---

## 15. Negation, Prohibition & Interrogative V2 Placement

### A. Negation (`نہٕ` / *nə*)
Unlike English pre-verbal *not*, Kashmiri **`نہٕ` (*nə*)** attaches **immediately after the finite V2 verb/auxiliary**:
* `سُہ چھُ نہٕ گَژھان۔` (*Suh chu nə gatshaan.* — "He is not going.")
* `مےٚ روٗد نٕہ تٔمؠ سُنٛد ناو وَنہِ۔` (*Mye rood nə təm'sund naav vani.* — "I couldn't remember his name.")

### B. Prohibitive (`مَہ` / `مَتہٕ` — Don't!)
In negative imperatives, **`مَہ` (*ma*)** or **`مَتہٕ` (*matə*)** precedes the imperative verb:
* `مَہ کَر!` (*Ma kar!* — "Don't do it!") / `مَتہٕ گَژھِو!` (*Matə gatshiv!* — "Don't go [polite]!")

### C. Interrogatives (Wh-Words & Yes/No Enclitic `ـآ`)
* **Yes/No Questions**: Append the interrogative suffix **`ـآ` (*-aa*)** to the finite V2 verb (`تۄہۍ چھِوا خۄش؟` *Chivaa khush?* — "Are you happy?"), or front `کِیا` (*kyaa*).
* **Wh-Questions**: Wh-words (`کُس` who, `کؠا` what, `کَر` when, `کَتہِ` where, `کِتھہٕ` how) appear **immediately before the finite V2 verb** (Slot 1, or Slot 2 right before V2 if subject is topicalized):
  - `سُہ کُس چھُ؟` (*Who is he?*)
  - `سُہ کَر آو؟` (*When did he come?*)

---

## 16. The Quintuple Deictic & Adverbial Series (Wade Ch. VI)

Kashmiri maintains a symmetrical **5-way demonstrative/adverbial grid** (unlike English's 2-way *this/that*):

| Series | Proximal (*this/here*) | Remote Visible (*that over there*) | Remote Invisible (*that/then*) | Relative (*which/where*) | Interrogative (*who/where?*) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Pronoun** | `یِہ` (*yih*) | `ہُہ` (*huh*) | `سُہ` (*suh*) | `یُس` (*yus*) | `کُس` (*kus*) |
| **Place** | `یَتہِ` (*yati*) | `ہۄتہِ` (*hoti*) | `تَتہِ` (*tati*) | `یۆت` (*yot*) | `کَتہِ` (*kati*) |
| **Time** | `وۄنؠ` (*vɔn'*) | — | `تیلہِ` (*teli*) | `ییلہِ` (*yeli*) | `کَر` (*kar*) |
| **Manner** | `یِتھہٕ` (*yithə*) | `ہُتھہٕ` (*huthə*) | `تِتھہٕ` (*tithə*) | `یِتھہٕ کٔنۍ` | `کِتھہٕ کٔنۍ` |
| **Quantity** | `یوٗت` (*yoot*) | `ہوٗت` (*hoot*) | `تیوٗت` (*tyoot*) | `یوٗتاہ` (*yootaah*) | `کوٗت` (*koot*) |

---

## 17. Honorifics, Politeness & Classical Register

1. **2nd Person Plural as Polite Singular**: Use **`تۄہۍ` / `تُہۍ`** (*tɔh' / tuh'*) + plural verb suffix **`ـِو` (*-iv*)** (`تُہۍ چھِو` instead of `ژٕ چھُکھ`).
2. **3rd Person Plural as Respectful Singular**: Classical and Hadith prose uses plural **`تِم` (*tim*) + `چھِ` / `ٲسۍ`** for prophets, elders, and teachers (e.g., `حَضرت اِبنِ عباس چھِ رِوایَت کَران`).
3. **Polite Imperative Clitics (Wade Rule #89)**: Append **`ـزِ` (*-zi*)**, **`ـتۄ` (*-tə*)**, or honorific titles (`صٲب` *səəb*, `جَناب` *janaab*, `حَض` *haz*) to soften commands (`وَنِو` / `وَنزِو` — "please tell").

---

## 18. Morphophonemic Vowel Harmony, Palatalization & Corpus Statistics

### A. Systematic Stem Vowel & Consonant Mutations
When adding feminine or plural suffixes (`-i`, `-ʲ`), Kashmiri triggers **regressive vowel raising/centralization** and **palatalization**:
* **Vowel Mutation**: `/a/` $\rightarrow$ `/ə/` (`کَرُن` $\rightarrow$ `کٔر` *kər* [f.sg]); `/o/` $\rightarrow$ `/ɔ/` or `/u/` (`کوٚر` *kor* [m.sg] vs. `کٔرۍ` *kər'* [m.pl]).
* **Consonant Palatalization**: Dental/velar stops shift when palatalized: `ت` $\rightarrow$ `ژ` (`رات` $\rightarrow$ `راژ`), `د` $\rightarrow$ `ز`, `ک` $\rightarrow$ `چ`, `گ` $\rightarrow$ `ج`, `ل` $\rightarrow$ `لۍ`.

### B. Empirical Corpus Pattern Counts (399 Reviewed Parallel & Grammar Lesson Sentences)
Automated pattern mining across `combined-parallel.jsonl`, `reviewed-parallel.jsonl`, `approved-parallel.jsonl`, and `native-speaker-grammar-lesson-1..27`:
* **Progressive `-aan` (`ـان`)**: 161 occurrences
* **Present Copula (`چھُ` / `چھےٚ` / `چھِ` / `چھُس`)**: 143 occurrences
* **Post-verbal Negation (`نہٕ` / `نَہ`)**: 70 occurrences
* **Past Copula (`اوس` / `ٲس` / `ٲسۍ`)**: 53 occurrences
* **Locative `مَنٛز` (*in*) / `پؠٹھ` (*on/at*)**: 52 / 49 occurrences
* **Conjunctive Participle (`ـِتھ` *-ith*)**: 36 occurrences
* **Perfect Participle (`ـمُت` / `ـمٕژ` / `ـمٕتۍ`)**: 35 occurrences
* **3-Way Genitive (`سُنٛد` / `ہُنٛد`)**: 32 occurrences
* **Instrumental `سۭتۍ` (*with*) / Ablative `نِش` / `پؠٹھٕ`**: 25 / 24 occurrences
* **Subordinating `زِ` (*that*) / Purposive `خٲطرٕ` (*for*)**: 23 / 22 occurrences
