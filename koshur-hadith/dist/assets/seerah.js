let book;
let chapterIndex = 0;
let language = "kashmiri";
let textScale = Number(localStorage.getItem("seerah-text-scale") || 1);
let fontMode = localStorage.getItem("seerah-font-mode") || "naskh";
let nightMode = localStorage.getItem("seerah-night-mode") === "true";
const savedLastChapter = Number(localStorage.getItem("seerah-last-chapter"));
const TTS_SPACE = "https://gaash-lab-matcha-tts-kashmiri-demo.hf.space";
const speechCache = new Map();
let activeAudio = null;

const body = document.querySelector("#chapter-body");
const mapDialog = document.querySelector("#map-dialog");
const wordDialog = document.querySelector("#word-dialog");

function selectBoundary(id) {
  const boundary = book.map.boundaries.find((item) => item.id === id);
  if (!boundary) return;
  document.querySelectorAll("[data-boundary]").forEach((button) => {
    const selected = button.dataset.boundary === id;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  const detail = document.querySelector("#map-detail");
  detail.replaceChildren();
  const direction = document.createElement("strong");
  direction.textContent = `${boundary.directionKashmiri} · ${boundary.directionEnglish}`;
  const kashmiri = document.createElement("p");
  kashmiri.lang = "ks-Arab";
  kashmiri.dir = "rtl";
  kashmiri.textContent = boundary.kashmiri;
  const english = document.createElement("p");
  english.textContent = boundary.english;
  detail.append(direction, kashmiri, english);
}

function openMap() {
  if (typeof mapDialog.showModal === "function") mapDialog.showModal();
  else mapDialog.setAttribute("open", "");
  selectBoundary("west");
}

function setupMap() {
  document.querySelector("#map-title").textContent = book.map.titleEnglish;
  document.querySelector("#map-subtitle").textContent = book.map.titleKashmiri;
  document.querySelector("#boundary-map-image").src = book.map.image;
  const buttons = document.querySelector("#map-boundary-buttons");
  book.map.boundaries.forEach((boundary) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.boundary = boundary.id;
    const english = document.createElement("span");
    english.textContent = boundary.directionEnglish;
    const kashmiri = document.createElement("small");
    kashmiri.lang = "ks-Arab";
    kashmiri.dir = "rtl";
    kashmiri.textContent = boundary.directionKashmiri;
    button.append(english, kashmiri);
    button.addEventListener("click", () => selectBoundary(boundary.id));
    buttons.append(button);
  });
  document.querySelectorAll(".map-hotspot").forEach((button) => {
    const boundary = book.map.boundaries.find(
      (item) => item.id === button.dataset.boundary,
    );
    button.setAttribute(
      "aria-label",
      `Show ${boundary.directionEnglish} boundary`,
    );
    button.addEventListener("click", () =>
      selectBoundary(button.dataset.boundary),
    );
  });
  document
    .querySelector("#close-map")
    .addEventListener("click", () => mapDialog.close());
  mapDialog.addEventListener("click", (event) => {
    if (event.target === mapDialog) mapDialog.close();
  });
}

function appendWords(parent, value, counter) {
  value.split(/(\s+)/).forEach((piece) => {
    if (!piece) return;
    if (/^\s+$/.test(piece)) {
      parent.append(document.createTextNode(piece));
      return;
    }
    const word = document.createElement("span");
    word.className = "spoken-word";
    word.dataset.wordIndex = counter.value++;
    word.dataset.lookup = piece.replace(
      /^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu,
      "",
    );
    word.tabIndex = 0;
    word.setAttribute("role", "button");
    word.setAttribute("aria-label", `${piece} — show English meaning`);
    word.textContent = piece;
    parent.append(word);
  });
}

function appendAnnotatedText(paragraph, value, glossary = []) {
  let cursor = 0;
  const counter = { value: 0 };
  const matches = [];
  glossary.forEach((entry) => {
    let start = value.indexOf(entry.term);
    while (start >= 0) {
      matches.push({ start, end: start + entry.term.length, entry });
      start = value.indexOf(entry.term, start + entry.term.length);
    }
  });
  matches
    .sort((a, b) => a.start - b.start || b.end - a.end)
    .filter((match, index, list) =>
      !list.some((other, otherIndex) =>
        otherIndex < index && match.start < other.end && match.end > other.start,
      ),
    )
    .forEach((match) => {
      appendWords(paragraph, value.slice(cursor, match.start), counter);
      const term = document.createElement("span");
      term.className = "glossary-term";
      appendWords(term, match.entry.term, counter);
      term
        .querySelectorAll(".spoken-word")
        .forEach((word) => (word.dataset.meaning = match.entry.english));
      const meaning = document.createElement("span");
      meaning.className = "inline-meaning";
      meaning.lang = "en";
      meaning.dir = "ltr";
      meaning.textContent = ` (${match.entry.english})`;
      paragraph.append(term, meaning);
      cursor = match.end;
    });
  appendWords(paragraph, value.slice(cursor), counter);
}

async function generateSpeech(value) {
  const key = `Male\0Low (fast)\0${value}`;
  if (speechCache.has(key)) return speechCache.get(key);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);
  try {
    const sessionHash = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    const joined = await fetch(`${TTS_SPACE}/gradio_api/queue/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        data: [value, false, "Male", "Low (fast)"],
        fn_index: 0,
        session_hash: sessionHash,
      }),
    });
    if (!joined.ok) throw Error(`Bolbosh unavailable (${joined.status})`);
    const { event_id: eventId } = await joined.json();
    const response = await fetch(
      `${TTS_SPACE}/gradio_api/queue/data?session_hash=${encodeURIComponent(sessionHash)}`,
      { signal: controller.signal, headers: { Accept: "text/event-stream" } },
    );
    if (!response.ok || !response.body) throw Error("Bolbosh stream unavailable");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      buffer += decoder.decode(chunk.value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() || "";
      for (const event of events) {
        const line = event.split("\n").find((item) => item.startsWith("data: "));
        if (!line) continue;
        const message = JSON.parse(line.slice(6));
        if (message.event_id && message.event_id !== eventId) continue;
        if (message.msg === "process_completed") {
          if (!message.success || message.output?.error)
            throw Error(message.output?.error || "Bolbosh generation failed");
          const file = message.output.data?.[1];
          const url = typeof file === "string" ? file : file?.url;
          const audioUrl = url
            ? new URL(url, TTS_SPACE).href
            : file?.path
              ? `${TTS_SPACE}/gradio_api/file=${encodeURIComponent(file.path)}`
              : null;
          if (!audioUrl) throw Error("Bolbosh returned no audio");
          speechCache.set(key, audioUrl);
          return audioUrl;
        }
      }
    }
    throw Error("Bolbosh closed before returning audio");
  } finally {
    clearTimeout(timeout);
  }
}

function clearWordHighlight(paragraph) {
  paragraph
    .querySelectorAll(".spoken-word")
    .forEach((word) => word.classList.remove("speaking", "spoken"));
}

async function playSpokenLine(button, paragraph, value, status, audio) {
  if (activeAudio && activeAudio !== audio) activeAudio.pause();
  if (audio.src) {
    if (audio.paused) await audio.play();
    else audio.pause();
    return;
  }
  button.disabled = true;
  button.textContent = "Bolbosh…";
  status.textContent = "آواز تیار گژھان · Generating";
  try {
    audio.src = await generateSpeech(value);
    activeAudio = audio;
    await audio.play();
    status.textContent = "لفظ بہ لفظ · approximate highlighting";
  } catch (error) {
    status.textContent = error.name === "AbortError" ? "Timed out · دوبارٕ کوشش کٔریو" : `${error.message} · Try again`;
    audio.removeAttribute("src");
  } finally {
    button.disabled = false;
    button.textContent = "▶ سُنِو · Listen";
  }
}

function createLineAudio(paragraph, value) {
  const controls = document.createElement("div");
  controls.className = "line-audio";
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "▶ سُنِو · Listen";
  const status = document.createElement("small");
  status.textContent = "Bolbosh · Kashmiri voice";
  const audio = document.createElement("audio");
  audio.preload = "none";
  audio.addEventListener("play", () => {
    activeAudio = audio;
    button.textContent = "❚❚ وُچھراو · Pause";
  });
  audio.addEventListener("pause", () => {
    button.textContent = "▶ سُنِو · Listen";
  });
  audio.addEventListener("timeupdate", () => {
    const words = [...paragraph.querySelectorAll(".spoken-word")];
    if (!words.length || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const active = Math.min(words.length - 1, Math.floor((audio.currentTime / audio.duration) * words.length));
    words.forEach((word, index) => {
      word.classList.toggle("speaking", index === active && !audio.paused);
      word.classList.toggle("spoken", index < active);
    });
  });
  audio.addEventListener("ended", () => {
    clearWordHighlight(paragraph);
    button.textContent = "↻ دوبارٕ سُنِو · Replay";
  });
  button.addEventListener("click", () => playSpokenLine(button, paragraph, value, status, audio));
  controls.append(button, status, audio);
  return controls;
}

function openWordMeaning(word) {
  const lookup = word.dataset.lookup || word.textContent.trim();
  const meaning =
    word.dataset.meaning ||
    book.wordMeanings?.[lookup] ||
    "Meaning not reviewed yet";
  document.querySelector("#word-dialog-title").textContent = word.textContent;
  document.querySelector("#word-meaning").textContent = meaning;
  document.querySelector("#word-context-english").textContent =
    word.closest(".spoken-line")?.dataset.englishContext ||
    "English context is not available for this line.";
  const reviewed = meaning !== "Meaning not reviewed yet";
  document.querySelector("#word-review-note").textContent = reviewed
    ? "Contextual English meaning · reviewed vocabulary may be refined further."
    : "This word has not yet received a reviewed one-word gloss; use the sentence translation above for context.";
  if (typeof wordDialog.showModal === "function") wordDialog.showModal();
  else wordDialog.setAttribute("open", "");
}

function createSectionVisual(section) {
  if (!section.image) return null;
  const figure = document.createElement("figure");
  figure.className = section.imageSecondary
    ? "section-visual section-visual-pair"
    : "section-visual";
  [
    [section.image, section.imageAlt],
    [section.imageSecondary, section.imageSecondaryAlt],
  ].forEach(([src, alt]) => {
    if (!src) return;
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt || "Historical reference illustration";
    image.loading = "lazy";
    image.decoding = "async";
    figure.append(image);
  });
  const caption = document.createElement("figcaption");
  const primary = document.createElement("span");
  primary.lang = "ks-Arab";
  primary.dir = "rtl";
  primary.textContent = section.imageCaptionKashmiri || section.titleKashmiri;
  const secondary = document.createElement("small");
  secondary.lang = "en";
  secondary.dir = "ltr";
  secondary.textContent = section.imageCaptionEnglish || section.titleEnglish;
  caption.append(primary, secondary);
  figure.append(caption);
  return figure;
}

function renderBody(chapter) {
  body.replaceChildren();
  body.lang = language === "english" ? "en" : "ks-Arab";
  body.dir = language === "english" ? "ltr" : "rtl";
  body.classList.toggle("english", language === "english");
  body.classList.toggle("comparison", language === "comparison");
  body.classList.toggle("nastaliq", fontMode === "nastaliq");
  chapter.sections.forEach((section, sectionIndex) => {
    const sectionNode = document.createElement("section");
    sectionNode.id = `topic-${chapter.number}-${sectionIndex + 1}`;
    const heading = document.createElement("h3");
    heading.textContent =
      language === "english" ? section.titleEnglish : section.titleKashmiri;
    sectionNode.append(heading);
    const visual = createSectionVisual(section);
    if (visual) sectionNode.append(visual);
    const paragraphs =
      language === "english" ? section.english : section.kashmiri;
    paragraphs.forEach((value, paragraphIndex) => {
      const paragraph = document.createElement("p");
      paragraph.className = "spoken-line";
      paragraph.dataset.englishContext = section.english[paragraphIndex] || "";
      if (language === "english") paragraph.textContent = value;
      else appendAnnotatedText(paragraph, value, section.glossary || []);
      if (language === "comparison") {
        const pair = document.createElement("div");
        pair.className = "translation-pair";
        const spoken = document.createElement("div");
        spoken.className = "spoken-column";
        spoken.append(createLineAudio(paragraph, value), paragraph);
        const reference = document.createElement("p");
        reference.className = "reference-text";
        reference.lang = "en";
        reference.dir = "ltr";
        reference.textContent = section.english[paragraphIndex] || "";
        pair.append(spoken, reference);
        sectionNode.append(pair);
      } else if (language === "kashmiri") {
        const line = document.createElement("div");
        line.className = "spoken-line-card";
        line.append(createLineAudio(paragraph, value), paragraph);
        sectionNode.append(line);
      } else sectionNode.append(paragraph);
    });
    if (section.glossary?.length && language !== "english") {
      const glossary = document.createElement("aside");
      glossary.className = "section-glossary";
      const label = document.createElement("strong");
      label.textContent = "Difficult words · مُشکِل لَفظ";
      glossary.append(label);
      section.glossary.forEach((entry) => {
        const chip = document.createElement("span");
        chip.textContent = `${entry.term} (${entry.english})`;
        glossary.append(chip);
      });
      sectionNode.append(glossary);
    }
    if (section.mapReference) {
      const mapButton = document.createElement("button");
      mapButton.type = "button";
      mapButton.className = "open-map";
      const icon = document.createElement("span");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "⌖";
      const label = document.createElement("span");
      label.textContent =
        language === "kashmiri"
          ? book.map.openLabelKashmiri
          : book.map.openLabelEnglish;
      const secondary = document.createElement("small");
      secondary.textContent =
        language === "kashmiri"
          ? book.map.openLabelEnglish
          : book.map.openLabelKashmiri;
      label.append(secondary);
      mapButton.append(icon, label);
      mapButton.addEventListener("click", openMap);
      sectionNode.append(mapButton);
    }
    body.append(sectionNode);
  });
}

function render() {
  const chapter = book.chapters[chapterIndex];
  document.querySelector("#chapter-number").textContent = String(
    chapter.number,
  ).padStart(2, "0");
  document.querySelector("#chapter-title-en").textContent =
    chapter.titleEnglish;
  document.querySelector("#chapter-title-ks").textContent =
    chapter.titleKashmiri;
  document.querySelector("#source-pages").textContent =
    `Source pages ${chapter.sourcePages}`;
  document.querySelector("#review-status").textContent =
    chapter.translationStatusLabel;
  const wordCount = chapter.sections
    .flatMap((section) => section.kashmiri)
    .join(" ")
    .split(/\s+/).length;
  document.querySelector("#reading-time").textContent =
    `${Math.max(1, Math.ceil(wordCount / 140))} min read`;
  document
    .querySelectorAll(".reading-tab")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.language === language),
    );
  document
    .querySelectorAll("[data-chapter]")
    .forEach((button) =>
      button.classList.toggle(
        "active",
        Number(button.dataset.chapter) === chapterIndex,
      ),
    );
  renderBody(chapter);
  body.style.setProperty("--reader-scale", textScale);
  const previous = document.querySelector("#previous-chapter");
  const next = document.querySelector("#next-chapter");
  previous.disabled = chapterIndex === 0;
  next.disabled = chapterIndex === book.chapters.length - 1;
  previous.textContent = chapterIndex
    ? `← ${book.chapters[chapterIndex - 1].titleEnglish}`
    : "Beginning of book";
  next.textContent =
    chapterIndex < book.chapters.length - 1
      ? `${book.chapters[chapterIndex + 1].titleEnglish} →`
      : "More translation coming";
  history.replaceState(null, "", `#chapter-${chapter.number}`);
  localStorage.setItem("seerah-last-chapter", chapter.number);
  updateBookmarkState();
}

function bookmarkedChapters() {
  return JSON.parse(localStorage.getItem("seerah-bookmarks") || "[]");
}

function updateBookmarkState() {
  const saved = bookmarkedChapters().includes(
    book.chapters[chapterIndex].number,
  );
  const button = document.querySelector("#bookmark-chapter");
  button.setAttribute("aria-pressed", String(saved));
  button.textContent = saved ? "♥ Bookmarked" : "♡ Bookmark";
  document.querySelector("#mobile-bookmark").textContent = saved
    ? "♥ Saved"
    : "♡ Save";
}

function toggleBookmark() {
  const number = book.chapters[chapterIndex].number;
  const saved = bookmarkedChapters();
  const index = saved.indexOf(number);
  if (index >= 0) saved.splice(index, 1);
  else saved.push(number);
  localStorage.setItem("seerah-bookmarks", JSON.stringify(saved));
  updateBookmarkState();
}

function toggleTheme() {
  nightMode = !nightMode;
  localStorage.setItem("seerah-night-mode", String(nightMode));
  document.body.classList.toggle("night-reading", nightMode);
  document.querySelector("#toggle-theme").textContent = nightMode
    ? "☀ Day"
    : "☾ Night";
  document.querySelector("#mobile-theme").textContent = nightMode
    ? "☀ Day"
    : "☾ Night";
}

function buildNavigation() {
  const nav = document.querySelector("#chapter-nav");
  nav.replaceChildren();
  book.chapters.forEach((chapter, index) => {
    const group = document.createElement("section");
    group.className = "contents-chapter";
    group.dataset.search =
      `${chapter.titleEnglish} ${chapter.titleKashmiri} ${chapter.sections.map((section) => `${section.titleEnglish} ${section.titleKashmiri}`).join(" ")}`.toLowerCase();
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.chapter = index;
    button.className = "chapter-link";
    const number = document.createElement("span");
    number.textContent = String(chapter.number).padStart(2, "0");
    const title = document.createElement("span");
    title.textContent = chapter.titleEnglish;
    const ksTitle = document.createElement("small");
    ksTitle.textContent = chapter.titleKashmiri;
    const status = document.createElement("em");
    status.className = "contents-status";
    status.textContent = "In review";
    title.append(ksTitle, status);
    button.append(number, title);
    const selectChapter = (sectionIndex = null) => {
      chapterIndex = index;
      render();
      document.body.classList.remove("contents-open");
      requestAnimationFrame(() =>
        document
          .querySelector(
            sectionIndex === null
              ? "#chapter"
              : `#topic-${chapter.number}-${sectionIndex + 1}`,
          )
          .scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    };
    button.addEventListener("click", () => selectChapter());
    const topics = document.createElement("div");
    topics.className = "topic-links";
    chapter.sections.forEach((section, sectionIndex) => {
      const topic = document.createElement("button");
      topic.type = "button";
      topic.className = "topic-link";
      topic.innerHTML = `<span>${String(sectionIndex + 1).padStart(2, "0")}</span><span>${section.titleEnglish}<small lang="ks-Arab" dir="rtl">${section.titleKashmiri}</small></span>`;
      topic.addEventListener("click", () => selectChapter(sectionIndex));
      topics.append(topic);
    });
    group.append(button, topics);
    nav.append(group);
  });
}

function changeChapter(offset) {
  const nextIndex = chapterIndex + offset;
  if (nextIndex < 0 || nextIndex >= book.chapters.length) return;
  chapterIndex = nextIndex;
  render();
  document.querySelector("#chapter").scrollIntoView({ behavior: "smooth" });
}

function updateProgress() {
  const documentHeight = document.documentElement.scrollHeight - innerHeight;
  const progress =
    documentHeight > 0 ? Math.min(100, (scrollY / documentHeight) * 100) : 0;
  document.querySelector("#reading-progress-bar").style.width = `${progress}%`;
}

document.querySelectorAll(".reading-tab").forEach((button) =>
  button.addEventListener("click", () => {
    language = button.dataset.language;
    render();
  }),
);
body.addEventListener("click", (event) => {
  const word = event.target.closest(".spoken-word");
  if (word) openWordMeaning(word);
});
body.addEventListener("keydown", (event) => {
  const word = event.target.closest(".spoken-word");
  if (word && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openWordMeaning(word);
  }
});
document
  .querySelector("#close-word-dialog")
  .addEventListener("click", () => wordDialog.close());
wordDialog.addEventListener("click", (event) => {
  if (event.target === wordDialog) wordDialog.close();
});
document
  .querySelector("#previous-chapter")
  .addEventListener("click", () => changeChapter(-1));
document
  .querySelector("#next-chapter")
  .addEventListener("click", () => changeChapter(1));
document
  .querySelector("#bookmark-chapter")
  .addEventListener("click", toggleBookmark);
document
  .querySelector("#mobile-bookmark")
  .addEventListener("click", toggleBookmark);
document.querySelector("#toggle-theme").addEventListener("click", toggleTheme);
document.querySelector("#mobile-theme").addEventListener("click", toggleTheme);
document.querySelector("#font-mode").addEventListener("change", (event) => {
  fontMode = event.target.value;
  localStorage.setItem("seerah-font-mode", fontMode);
  render();
});
document
  .querySelector("#mobile-contents")
  .addEventListener("click", () => document.body.classList.add("contents-open"));
document
  .querySelector("#close-contents")
  .addEventListener("click", () => document.body.classList.remove("contents-open"));
document.querySelector("#increase-font").addEventListener("click", () => {
  textScale = Math.min(1.3, textScale + 0.08);
  localStorage.setItem("seerah-text-scale", textScale);
  render();
});
document.querySelector("#decrease-font").addEventListener("click", () => {
  textScale = Math.max(0.82, textScale - 0.08);
  localStorage.setItem("seerah-text-scale", textScale);
  render();
});
document.querySelector("#toggle-focus").addEventListener("click", (event) => {
  const active = document.body.classList.toggle("focus-reading");
  event.currentTarget.setAttribute("aria-pressed", String(active));
  event.currentTarget.textContent = active ? "Exit focus" : "Focus reading";
});
document
  .querySelector("#contents-search")
  .addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    document
      .querySelectorAll(".contents-chapter")
      .forEach(
        (item) => (item.hidden = query && !item.dataset.search.includes(query)),
      );
  });
addEventListener("scroll", updateProgress, { passive: true });

fetch("/data/seerah.json")
  .then((response) => {
    if (!response.ok) throw Error("Seerah data could not be loaded.");
    return response.json();
  })
  .then((data) => {
    book = data;
    document.querySelector("#coverage").textContent = data.coverage;
    setupMap();
    buildNavigation();
    document.querySelector("#chapter-count").textContent =
      `${data.chapters.length} chapters · ${data.chapters.reduce((total, chapter) => total + chapter.sections.length, 0)} topics`;
    const matched = location.hash.match(/^#chapter-(\d+)/);
    if (matched)
      chapterIndex = Math.max(
        0,
        data.chapters.findIndex(
          (chapter) => chapter.number === Number(matched[1]),
        ),
      );
    document.querySelector("#font-mode").value = fontMode;
    document.body.classList.toggle("night-reading", nightMode);
    document.querySelector("#toggle-theme").textContent = nightMode
      ? "☀ Day"
      : "☾ Night";
    document.querySelector("#mobile-theme").textContent = nightMode
      ? "☀ Day"
      : "☾ Night";
    document
      .querySelector("#continue-reading")
      .addEventListener("click", () => {
        const found = data.chapters.findIndex(
          (chapter) => chapter.number === savedLastChapter,
        );
        if (found >= 0) chapterIndex = found;
        render();
        document
          .querySelector("#chapter")
          .scrollIntoView({ behavior: "smooth" });
      });
    render();
    updateProgress();
  })
  .catch((error) => {
    body.textContent = error.message;
  });
