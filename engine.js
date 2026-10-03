/* =====================================================================
   PROGRAMM 2 — ENGINE (Baustein D: Zeichenformatierung, erweitert)

   Prüfprinzip unverändert: getComputedStyle() auf dem Zielwort, robust
   gegenüber der konkreten HTML-Struktur, die der Browser erzeugt.

   Fett/Kursiv/Unterstrichen/Durchgestrichen/Hochgestellt/Tiefgestellt/
   Schriftfarbe/Hervorhebung/Schriftart nutzen die native execCommand()-
   API. Schriftgröße, Großbuchstaben (Effekt), Kapitälchen und Doppelt
   durchgestrichen setzen wir direkt per CSS über eine verallgemeinerte
   applyStyle()-Funktion, weil es dafür keine robuste execCommand-
   Entsprechung gibt bzw. (bei Schriftgröße) die native Variante auf
   browserabhängige Legacy-Stufen beschränkt wäre.
   ===================================================================== */

window.FormatEngine = (() => {
  "use strict";

  const editor = document.getElementById("editor");
  const el = {
    panelBody: document.getElementById("panelBody"),
    progressFill: document.getElementById("progressFill"),
    progressLabel: document.getElementById("progressLabel"),
    familyLabel: document.getElementById("familyLabel"),
    brandNum: document.getElementById("brandNum"),
    docName: document.getElementById("docName"),
    ribbon: document.getElementById("ribbon"),
    keyboardDock: document.getElementById("keyboardDock"),
    keyboardSvgHost: document.getElementById("keyboardSvgHost"),
  };

  const state = {
    missions: [], index: 0, phase: "erklaerung", done: false,
    startNumber: 1, totalCount: 39, onComplete: null,
  };

  // -----------------------------------------------------------
  // Text-Hilfsfunktionen
  // -----------------------------------------------------------

  function getPlainText() {
    return [...editor.querySelectorAll("p")].map(p => p.textContent).join("\n");
  }
  function setParagraphs(paragraphs) {
    editor.innerHTML = "";
    paragraphs.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      editor.appendChild(p);
    });
  }

  // Findet die erste Textstelle, die "word" enthält, und liefert ihren
  // berechneten (kaskadierten) Stil.
  function styleOf(word) {
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.includes(word)) {
        return getComputedStyle(node.parentElement);
      }
    }
    return null;
  }

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // -----------------------------------------------------------
  // Formatierungs-Aktionen
  // -----------------------------------------------------------

  function hasSelection() {
    const sel = window.getSelection();
    return sel && sel.rangeCount > 0 && !sel.isCollapsed && editor.contains(sel.anchorNode);
  }

  function exec(cmd, value) {
    if (!hasSelection()) return false;
    editor.focus();
    document.execCommand(cmd, false, value || null);
    return true;
  }

  // Verallgemeinerte Funktion: umschließt die Selektion mit einem <span>,
  // auf den beliebige CSS-Eigenschaften gesetzt werden — für alles, wofür
  // es keine robuste native execCommand-Entsprechung gibt.
  function applyStyle(styleObj) {
    const sel = window.getSelection();
    if (!hasSelection()) return false;
    const range = sel.getRangeAt(0);
    const span = document.createElement("span");
    Object.assign(span.style, styleObj);
    try {
      range.surroundContents(span);
    } catch (e) {
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    }
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(newRange);
    return true;
  }

  function flashButton(elm) {
    if (!elm) return;
    elm.classList.add("flash");
    setTimeout(() => elm.classList.remove("flash"), 220);
  }

  // Ribbon-Buttons verdrahten
  document.getElementById("btn-fett").addEventListener("click", (e) => { flashButton(e.currentTarget); if (exec("bold")) afterManualEdit(); });
  document.getElementById("btn-kursiv").addEventListener("click", (e) => { flashButton(e.currentTarget); if (exec("italic")) afterManualEdit(); });
  document.getElementById("btn-unterstrichen").addEventListener("click", (e) => { flashButton(e.currentTarget); if (exec("underline")) afterManualEdit(); });
  document.getElementById("btn-entfernen").addEventListener("click", (e) => { flashButton(e.currentTarget); if (exec("removeFormat")) afterManualEdit(); });

  document.getElementById("btn-durchgestrichen").addEventListener("click", (e) => { flashButton(e.currentTarget); if (exec("strikeThrough")) afterManualEdit(); });
  document.getElementById("btn-hochgestellt").addEventListener("click", (e) => { flashButton(e.currentTarget); if (exec("superscript")) afterManualEdit(); });
  document.getElementById("btn-tiefgestellt").addEventListener("click", (e) => { flashButton(e.currentTarget); if (exec("subscript")) afterManualEdit(); });
  document.getElementById("btn-grossbuchstaben").addEventListener("click", (e) => { flashButton(e.currentTarget); if (applyStyle({ textTransform: "uppercase" })) afterManualEdit(); });
  document.getElementById("btn-kapitaelchen").addEventListener("click", (e) => { flashButton(e.currentTarget); if (applyStyle({ fontVariant: "small-caps" })) afterManualEdit(); });
  document.getElementById("btn-doppelt-durchgestrichen").addEventListener("click", (e) => { flashButton(e.currentTarget); if (applyStyle({ textDecorationLine: "line-through", textDecorationStyle: "double" })) afterManualEdit(); });

  document.querySelectorAll("#groupFarbe .swatch").forEach(btn => {
    btn.addEventListener("click", () => { flashButton(btn); if (exec("foreColor", btn.dataset.color)) afterManualEdit(); });
  });
  document.querySelectorAll("#groupMarker .swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      flashButton(btn);
      const val = btn.dataset.color === "transparent" ? "transparent" : btn.dataset.color;
      if (exec("hiliteColor", val)) afterManualEdit();
    });
  });
  document.querySelectorAll(".rbtn-font").forEach(btn => {
    btn.addEventListener("click", () => { flashButton(btn); if (exec("fontName", btn.dataset.font)) afterManualEdit(); });
  });
  document.querySelectorAll(".rbtn-size").forEach(btn => {
    btn.addEventListener("click", () => { flashButton(btn); if (applyStyle({ fontSize: btn.dataset.size + "px" })) afterManualEdit(); });
  });

  // Tastenkombinationen für Fett/Kursiv/Unterstrichen (sicher, da nicht
  // browserseitig reserviert — anders als z. B. Strg+L für Ausrichtung).
  // Die neuen Effekte (Durchgestrichen usw.) liegen auch in echtem Word
  // nur im Schriftart-Dialogfeld, nicht auf einer Tastenkombination —
  // deshalb bewusst nur per Klick, kein zusätzliches Tastenkürzel.
  editor.addEventListener("keydown", (e) => {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod || !e.shiftKey) return;
    const k = e.key.toLowerCase();
    if (k === "f") { e.preventDefault(); if (exec("bold")) afterManualEdit(); }
    else if (k === "k") { e.preventDefault(); if (exec("italic")) afterManualEdit(); }
    else if (k === "u") { e.preventDefault(); if (exec("underline")) afterManualEdit(); }
  });

  function afterManualEdit() { runCheck(); updateRibbonState(); }

  // -----------------------------------------------------------
  // Live-Status der Ribbon-Buttons
  // -----------------------------------------------------------

  function updateRibbonState() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editor.contains(sel.anchorNode)) return;
    try {
      toggle("btn-fett", document.queryCommandState("bold"));
      toggle("btn-kursiv", document.queryCommandState("italic"));
      toggle("btn-unterstrichen", document.queryCommandState("underline"));
      toggle("btn-durchgestrichen", document.queryCommandState("strikeThrough"));
      toggle("btn-hochgestellt", document.queryCommandState("superscript"));
      toggle("btn-tiefgestellt", document.queryCommandState("subscript"));
    } catch (e) { /* queryCommandState kann bei leerer Selektion werfen */ }

    // Für die CSS-basierten Effekte: berechneten Stil an der Cursorposition prüfen
    let node = sel.anchorNode;
    if (node && node.nodeType === 3) node = node.parentElement;
    if (node && editor.contains(node)) {
      const cs = getComputedStyle(node);
      toggle("btn-grossbuchstaben", cs.textTransform === "uppercase");
      toggle("btn-kapitaelchen", (cs.fontVariant || "").includes("small-caps"));
      toggle("btn-doppelt-durchgestrichen", cs.textDecorationStyle === "double" && (cs.textDecorationLine || "").includes("line-through"));
    }
  }
  function toggle(id, on) {
    const elm = document.getElementById(id);
    if (elm) elm.classList.toggle("active", !!on);
  }

  document.addEventListener("selectionchange", () => {
    if (editor.contains(document.activeElement) || document.activeElement === editor) {
      updateRibbonState();
      runCheck();
    }
  });

  // -----------------------------------------------------------
  // Tastatur-Grafik (nur für Fett/Kursiv/Unterstrichen-Missionen)
  // -----------------------------------------------------------

  const KEY_LAYOUT = [
    ["q", "Q", 10, 10, 34, 34], ["w", "W", 46, 10, 34, 34], ["e", "E", 82, 10, 34, 34],
    ["r", "R", 118, 10, 34, 34], ["t", "T", 154, 10, 34, 34], ["z", "Z", 190, 10, 34, 34],
    ["u", "U", 226, 10, 34, 34], ["i", "I", 262, 10, 34, 34], ["o", "O", 298, 10, 34, 34],
    ["p", "P", 334, 10, 34, 34],
    ["a", "A", 28, 46, 34, 34], ["s", "S", 64, 46, 34, 34], ["d", "D", 100, 46, 34, 34],
    ["f", "F", 136, 46, 34, 34], ["g", "G", 172, 46, 34, 34], ["h", "H", 208, 46, 34, 34],
    ["j", "J", 244, 46, 34, 34], ["k", "K", 280, 46, 34, 34], ["l", "L", 316, 46, 34, 34],
    ["shift-l", "⇧ Umschalt", 10, 82, 66, 34], ["y", "Y", 80, 82, 34, 34],
    ["x", "X", 116, 82, 34, 34], ["c", "C", 152, 82, 34, 34], ["v", "V", 188, 82, 34, 34],
    ["b", "B", 224, 82, 34, 34], ["n", "N", 260, 82, 34, 34], ["m", "M", 296, 82, 34, 34],
    ["shift-r", "⇧ Umschalt", 332, 82, 66, 34],
    ["strg-l", "Strg", 10, 118, 50, 34], ["alt", "Alt", 64, 118, 42, 34],
    ["leertaste", "Leertaste", 110, 118, 180, 34], ["altgr", "Alt Gr", 294, 118, 42, 34],
    ["strg-r", "Strg", 340, 118, 50, 34],
  ];
  function buildKeyboardSVG() {
    const parts = KEY_LAYOUT.map(([id, label, x, y, w, h]) => `
      <g class="kbd-key" data-key="${id}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5"></rect>
        <text x="${x + w / 2}" y="${y + h / 2 + 3.5}" text-anchor="middle">${label}</text>
      </g>`).join("");
    return `<svg viewBox="0 0 410 162" xmlns="http://www.w3.org/2000/svg">${parts}</svg>`;
  }
  el.keyboardSvgHost.innerHTML = buildKeyboardSVG();

  function highlightKeys(keyIds, { onDone } = {}) {
    el.keyboardDock.querySelectorAll(".kbd-key").forEach(g => g.classList.remove("key-active"));
    if (!keyIds || !keyIds.length) { if (onDone) onDone(); return; }
    const modifiers = keyIds.filter(k => k.startsWith("strg") || k.startsWith("shift"));
    const others = keyIds.filter(k => !modifiers.includes(k));
    function activate(id) {
      const g = el.keyboardDock.querySelector(`.kbd-key[data-key="${id}"]`);
      if (g) g.classList.add("key-active");
    }
    modifiers.forEach(activate);
    others.forEach(activate);
    setTimeout(() => onDone && onDone(), 900);
  }

  // -----------------------------------------------------------
  // Ribbon-Demo: hebt die zu klickenden Buttons kurz hervor
  // -----------------------------------------------------------

  function highlightRibbon(buttonIds, { onDone } = {}) {
    if (!buttonIds || !buttonIds.length) { if (onDone) onDone(); return; }
    let i = 0;
    const step = () => {
      if (i > 0) {
        const prevElm = document.getElementById(buttonIds[i - 1]);
        if (prevElm) prevElm.classList.remove("active", "flash");
      }
      if (i < buttonIds.length) {
        const elm = document.getElementById(buttonIds[i]);
        if (elm) elm.classList.add("flash");
        i++;
        setTimeout(step, 650);
      } else {
        setTimeout(() => onDone && onDone(), 300);
      }
    };
    step();
  }

  function renderTextCompare(host, vorherHTML, nachherHTML) {
    if (!host) return;
    host.innerHTML = `
      <div class="demo-compare">
        <div class="demo-compare-box">
          <span class="demo-compare-label">Vorher</span>
          <p>${vorherHTML}</p>
        </div>
        <div class="demo-compare-arrow">↓</div>
        <div class="demo-compare-box demo-compare-after">
          <span class="demo-compare-label">Nachher</span>
          <p>${nachherHTML}</p>
        </div>
      </div>`;
  }

  // -----------------------------------------------------------
  // Missions-/Phasen-Steuerung
  // -----------------------------------------------------------

  function currentMission() { return state.missions[state.index]; }
  function isKeyboardMission(m) { return m.keys && m.keys.length; }

  function renderKeyboardDock(m) {
    if (isKeyboardMission(m)) el.keyboardDock.hidden = false;
    else { el.keyboardDock.hidden = true; el.keyboardDock.querySelectorAll(".kbd-key").forEach(g => g.classList.remove("key-active")); }
  }

  function setPhase(phase) { state.phase = phase; render(); }

  function render() {
    const m = currentMission();
    el.docName.textContent = "Mission " + (state.index + state.startNumber) + " – " + m.title + ".docx";
    renderKeyboardDock(m);
    if (el.brandNum && m.baustein) el.brandNum.textContent = m.baustein;
    if (m.bausteinLabel) el.familyLabel.textContent = m.bausteinLabel;
    document.querySelectorAll(".rbtn, .swatch").forEach(b => b.classList.remove("active", "flash"));

    if (state.phase === "erklaerung") {
      editor.contentEditable = "false";
      setParagraphs(m.paragraphs);
      el.panelBody.innerHTML = `
        <span class="phase-tag">So wird es gemacht!</span>
        <span class="method-badge">${m.method === "maus" ? "🖱️ Maus" : m.method === "tastatur" ? "⌨️ Tastatur" : "🖱️⌨️ Beides"}</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="explanation-text">${m.erklaerung}</p>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnSkipDemo">Direkt zur Übung →</button>
          <button class="btn btn-primary" id="btnZurDemo">Demo ansehen →</button>
        </div>`;
      document.getElementById("btnZurDemo").addEventListener("click", () => setPhase("demo"));
      document.getElementById("btnSkipDemo").addEventListener("click", () => setPhase("aufgabe"));
      return;
    }

    if (state.phase === "demo") {
      editor.contentEditable = "false";
      setParagraphs(m.paragraphs);
      el.panelBody.innerHTML = `
        <span class="phase-tag demo">Demo</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="explanation-text">${m.erklaerung}</p>
        <div id="demoVisual" class="demo-visual"></div>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnDemoNochmal">Nochmal ansehen</button>
          <button class="btn btn-primary" id="btnJetztDu">Jetzt du! →</button>
        </div>`;
      document.getElementById("btnDemoNochmal").addEventListener("click", playDemo);
      document.getElementById("btnJetztDu").addEventListener("click", () => setPhase("aufgabe"));
      playDemo();
      return;
    }

    if (state.phase === "aufgabe") {
      state.done = false;
      setParagraphs(m.paragraphs);
      editor.contentEditable = "true";
      el.panelBody.innerHTML = `
        <span class="phase-tag aufgabe">Deine Aufgabe</span>
        <span class="method-badge">${m.method === "maus" ? "🖱️ Mit der Maus" : m.method === "tastatur" ? "⌨️ Mit der Tastatur" : "🖱️⌨️ Maus oder Tastatur"}</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="instruction">${m.aufgabe}</p>
        ${m.hint ? `<div class="hintbox">
          <button class="hint-toggle" id="hintToggle">Tipp anzeigen</button>
          <p class="hint-text" id="hintText" hidden>${m.hint}</p>
        </div>` : ""}
        <div class="feedback" id="feedback"></div>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnRetry">Neu starten</button>
          <button class="btn btn-primary" id="btnNext" disabled>Weiter →</button>
        </div>`;
      if (m.hint) {
        document.getElementById("hintToggle").addEventListener("click", () => {
          const t = document.getElementById("hintText");
          const show = t.hidden;
          t.hidden = !show;
          document.getElementById("hintToggle").textContent = show ? "Tipp verbergen" : "Tipp anzeigen";
        });
      }
      document.getElementById("btnRetry").addEventListener("click", () => setPhase("aufgabe"));
      document.getElementById("btnNext").addEventListener("click", nextMission);
      editor.focus();
      return;
    }
  }

  function playDemo() {
    const m = currentMission();
    const visualHost = document.getElementById("demoVisual");
    if (visualHost) visualHost.innerHTML = "";
    const runVisual = () => renderTextCompare(visualHost, m.demo.vorher, m.demo.nachher);
    if (m.ribbonDemo && m.ribbonDemo.length) highlightRibbon(m.ribbonDemo, { onDone: runVisual });
    else if (isKeyboardMission(m)) highlightKeys(m.keys, { onDone: runVisual });
    else runVisual();
  }

  function updateProgress() {
    el.progressFill.style.width = Math.round(state.index / state.missions.length * 100) + "%";
    el.progressLabel.textContent = "Mission " + (state.index + state.startNumber) + " / " + state.totalCount;
  }

  function runCheck() {
    const m = currentMission();
    if (state.phase !== "aufgabe" || state.done) return;
    const ctx = { styleOf, hexToRgb, plainText: getPlainText() };
    let ok = false;
    try { ok = !!m.check(ctx); } catch (e) { ok = false; }
    if (ok) {
      state.done = true;
      const fb = document.getElementById("feedback");
      if (fb) { fb.textContent = "✓ Richtig gemacht! Klicke auf „Weiter“."; fb.className = "feedback ok"; }
      const btn = document.getElementById("btnNext");
      if (btn) btn.disabled = false;
      updateProgress();
    }
  }
  editor.addEventListener("keyup", runCheck);
  editor.addEventListener("mouseup", runCheck);

  function nextMission() {
    if (state.index < state.missions.length - 1) {
      state.index++;
      updateProgress();
      setPhase("erklaerung");
    } else {
      editor.contentEditable = "false";
      el.keyboardDock.hidden = true;
      const done = state.onComplete || { title: "Geschafft", text: `Du hast alle ${state.totalCount} Missionen gemeistert.` };
      el.panelBody.innerHTML = `
        <span class="phase-tag aufgabe">Geschafft! 🎉</span>
        <h2 id="missionTitle">${done.title}</h2>
        <p class="explanation-text">${done.text}</p>`;
    }
  }

  function start(missions, { familyLabel, startNumber = 1, totalCount, onComplete } = {}) {
    state.missions = missions;
    state.index = 0;
    state.startNumber = startNumber;
    state.totalCount = totalCount || missions.length;
    state.onComplete = onComplete || null;
    if (familyLabel) el.familyLabel.textContent = familyLabel;
    updateProgress();
    setPhase("erklaerung");
  }

  return { start, hexToRgb };
})();
