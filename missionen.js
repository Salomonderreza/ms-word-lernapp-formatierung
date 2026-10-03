/* =====================================================================
   MISSIONSDATEN — Baustein D: Zeichenformatierung (39 Einheiten)
   13 Familien × 3 Wiederholungen. Prüfung über ctx.styleOf(wort) →
   getComputedStyle. Reihenfolge wird am Ende per Round-Robin über alle
   13 Familien gemischt (durchgemischte Struktur statt Blockübung).
   ===================================================================== */

(() => {
  "use strict";
  const missions = [];
  const isBold = (s) => !!s && (parseInt(s.fontWeight, 10) >= 600 || s.fontWeight === "bold");
  const isItalic = (s) => !!s && s.fontStyle === "italic";
  const isUnderline = (s) => !!s && (s.textDecorationLine || s.textDecoration || "").includes("underline");
  const isStrike = (s) => !!s && (s.textDecorationLine || s.textDecoration || "").includes("line-through") && s.textDecorationStyle !== "double";
  const isDoubleStrike = (s) => !!s && (s.textDecorationLine || s.textDecoration || "").includes("line-through") && s.textDecorationStyle === "double";

  // ---------------------------------------------------------------
  // D1 — Fett
  // ---------------------------------------------------------------
  missions.push({
    id: "d1-1", family: "D1", method: "beides", title: "Ein Wort fett machen",
    keys: ["strg-l", "shift-l", "f"], ribbonDemo: ["btn-fett"],
    erklaerung: "Fett hervorheben geht per Tastenkombination (Strg+Umschalt+F) oder per Klick auf das „F“ im Menüband.",
    aufgabe: "Markiere das Wort „wichtig“ und mache es fett.",
    hint: "Markieren, dann Strg+Umschalt+F oder auf das „F“ klicken.",
    paragraphs: ["Das ist wirklich wichtig für die Zeitung."],
    demo: { vorher: "Das ist wirklich wichtig für die Zeitung.", nachher: "Das ist wirklich <b>wichtig</b> für die Zeitung." },
    check: (ctx) => isBold(ctx.styleOf("wichtig")),
  });
  missions.push({
    id: "d1-2", family: "D1", method: "beides", title: "Einen Satzteil fett machen",
    keys: ["strg-l", "shift-l", "f"], ribbonDemo: ["btn-fett"],
    erklaerung: "Auch mehrere Wörter am Stück lassen sich auf einmal fett formatieren.",
    aufgabe: "Markiere „nicht vergessen“ und mache es fett.",
    hint: "Beide Wörter zusammen markieren, dann fett.",
    paragraphs: ["Bitte das Treffen nicht vergessen!"],
    demo: { vorher: "Bitte das Treffen nicht vergessen!", nachher: "Bitte das Treffen <b>nicht vergessen</b>!" },
    check: (ctx) => isBold(ctx.styleOf("nicht vergessen")),
  });
  missions.push({
    id: "d1-3", family: "D1", method: "beides", title: "Eine Überschrift fett machen",
    keys: ["strg-l", "shift-l", "f"], ribbonDemo: ["btn-fett"],
    erklaerung: "Überschriften werden in echten Artikeln oft zusätzlich fett gesetzt.",
    aufgabe: "Markiere das Wort „Eilmeldung“ und mache es fett.",
    hint: "Strg+Umschalt+F oder der „F“-Button.",
    paragraphs: ["Überschrift: Eilmeldung aus der Redaktion"],
    demo: { vorher: "Überschrift: Eilmeldung aus der Redaktion", nachher: "Überschrift: <b>Eilmeldung</b> aus der Redaktion" },
    check: (ctx) => isBold(ctx.styleOf("Eilmeldung")),
  });

  // ---------------------------------------------------------------
  // D2 — Kursiv
  // ---------------------------------------------------------------
  missions.push({
    id: "d2-1", family: "D2", method: "beides", title: "Ein Wort kursiv setzen",
    keys: ["strg-l", "shift-l", "k"], ribbonDemo: ["btn-kursiv"],
    erklaerung: "Kursiv wird oft für Zitate oder besondere Betonung genutzt — Strg+Umschalt+K oder das „K“ im Menüband.",
    aufgabe: "Markiere das Wort „inspirierend“ und setze es kursiv.",
    hint: "Strg+Umschalt+K oder auf das „K“ klicken.",
    paragraphs: ["Das Zitat war wirklich inspirierend."],
    demo: { vorher: "Das Zitat war wirklich inspirierend.", nachher: "Das Zitat war wirklich <i>inspirierend</i>." },
    check: (ctx) => isItalic(ctx.styleOf("inspirierend")),
  });
  missions.push({
    id: "d2-2", family: "D2", method: "beides", title: "Ein weiteres Wort kursiv setzen",
    keys: ["strg-l", "shift-l", "k"], ribbonDemo: ["btn-kursiv"],
    erklaerung: "Kursiv eignet sich auch, um einen Begriff im Text hervorzuheben.",
    aufgabe: "Markiere das Wort „Mitglieder“ und setze es kursiv.",
    hint: "Markieren, dann Strg+Umschalt+K.",
    paragraphs: ["Wir suchen noch Mitglieder für die Redaktion."],
    demo: { vorher: "Wir suchen noch Mitglieder für die Redaktion.", nachher: "Wir suchen noch <i>Mitglieder</i> für die Redaktion." },
    check: (ctx) => isItalic(ctx.styleOf("Mitglieder")),
  });
  missions.push({
    id: "d2-3", family: "D2", method: "beides", title: "Einen Satzteil kursiv setzen",
    keys: ["strg-l", "shift-l", "k"], ribbonDemo: ["btn-kursiv"],
    erklaerung: "Auch zwei Wörter am Stück lassen sich kursiv setzen.",
    aufgabe: "Markiere „Nächste Woche“ und setze es kursiv.",
    hint: "Beide Wörter zusammen markieren.",
    paragraphs: ["Nächste Woche erscheint die neue Ausgabe."],
    demo: { vorher: "Nächste Woche erscheint die neue Ausgabe.", nachher: "<i>Nächste Woche</i> erscheint die neue Ausgabe." },
    check: (ctx) => isItalic(ctx.styleOf("Nächste Woche")),
  });

  // ---------------------------------------------------------------
  // D3 — Unterstrichen
  // ---------------------------------------------------------------
  missions.push({
    id: "d3-1", family: "D3", method: "beides", title: "Ein Wort unterstreichen",
    keys: ["strg-l", "shift-l", "u"], ribbonDemo: ["btn-unterstrichen"],
    erklaerung: "Unterstreichen funktioniert genauso: Strg+Umschalt+U oder das „U“ im Menüband.",
    aufgabe: "Markiere das Wort „Freitag“ und unterstreiche es.",
    hint: "Strg+Umschalt+U oder auf das „U“ klicken.",
    paragraphs: ["Der Abgabetermin ist Freitag."],
    demo: { vorher: "Der Abgabetermin ist Freitag.", nachher: "Der Abgabetermin ist <u>Freitag</u>." },
    check: (ctx) => isUnderline(ctx.styleOf("Freitag")),
  });
  missions.push({
    id: "d3-2", family: "D3", method: "beides", title: "Ein weiteres Wort unterstreichen",
    keys: ["strg-l", "shift-l", "u"], ribbonDemo: ["btn-unterstrichen"],
    erklaerung: "Unterstreichen lenkt die Aufmerksamkeit gezielt auf ein Wort.",
    aufgabe: "Markiere das Wort „pünktlich“ und unterstreiche es.",
    hint: "Markieren, dann Strg+Umschalt+U.",
    paragraphs: ["Bitte pünktlich erscheinen."],
    demo: { vorher: "Bitte pünktlich erscheinen.", nachher: "Bitte <u>pünktlich</u> erscheinen." },
    check: (ctx) => isUnderline(ctx.styleOf("pünktlich")),
  });
  missions.push({
    id: "d3-3", family: "D3", method: "beides", title: "Einen Satzteil unterstreichen",
    keys: ["strg-l", "shift-l", "u"], ribbonDemo: ["btn-unterstrichen"],
    erklaerung: "Auch mehrere Wörter am Stück lassen sich unterstreichen.",
    aufgabe: "Markiere „Wichtiger Hinweis“ und unterstreiche es.",
    hint: "Beide Wörter zusammen markieren.",
    paragraphs: ["Wichtiger Hinweis für alle Redakteure."],
    demo: { vorher: "Wichtiger Hinweis für alle Redakteure.", nachher: "<u>Wichtiger Hinweis</u> für alle Redakteure." },
    check: (ctx) => isUnderline(ctx.styleOf("Wichtiger Hinweis")),
  });

  // ---------------------------------------------------------------
  // D4 — Schriftfarbe
  // ---------------------------------------------------------------
  missions.push({
    id: "d4-1", family: "D4", method: "maus", title: "Text rot einfärben",
    ribbonDemo: ["farbe-rot"],
    erklaerung: "Im Menüband gibt es vier Farbfelder für die Schriftfarbe. Markieren, dann auf die gewünschte Farbe klicken.",
    aufgabe: "Markiere das Wort „hoch“ und färbe es rot ein.",
    hint: "Erst markieren, dann im Ribbon auf das rote Farbfeld klicken.",
    paragraphs: ["Die Fehlerquote ist diesmal sehr hoch."],
    demo: { vorher: "Die Fehlerquote ist diesmal sehr hoch.", nachher: "Die Fehlerquote ist diesmal sehr <span style='color:#C0392B'>hoch</span>." },
    check: (ctx) => { const s = ctx.styleOf("hoch"); return !!s && s.color === ctx.hexToRgb("#C0392B"); },
  });
  missions.push({
    id: "d4-2", family: "D4", method: "maus", title: "Text grün einfärben",
    ribbonDemo: ["farbe-gruen"],
    erklaerung: "Grün eignet sich zum Beispiel für positive Rückmeldungen.",
    aufgabe: "Markiere das Wort „super“ und färbe es grün ein.",
    hint: "Markieren, dann das grüne Farbfeld anklicken.",
    paragraphs: ["Der Artikel wurde super recherchiert."],
    demo: { vorher: "Der Artikel wurde super recherchiert.", nachher: "Der Artikel wurde <span style='color:#227A4F'>super</span> recherchiert." },
    check: (ctx) => { const s = ctx.styleOf("super"); return !!s && s.color === ctx.hexToRgb("#227A4F"); },
  });
  missions.push({
    id: "d4-3", family: "D4", method: "maus", title: "Text blau einfärben",
    ribbonDemo: ["farbe-blau"],
    erklaerung: "Blau eignet sich gut für Termine und Daten.",
    aufgabe: "Markiere das Wort „Deadline“ und färbe es blau ein.",
    hint: "Markieren, dann das blaue Farbfeld anklicken.",
    paragraphs: ["Die Deadline rückt näher."],
    demo: { vorher: "Die Deadline rückt näher.", nachher: "Die <span style='color:#1F5FA8'>Deadline</span> rückt näher." },
    check: (ctx) => { const s = ctx.styleOf("Deadline"); return !!s && s.color === ctx.hexToRgb("#1F5FA8"); },
  });

  // ---------------------------------------------------------------
  // D5 — Hervorhebung
  // ---------------------------------------------------------------
  missions.push({
    id: "d5-1", family: "D5", method: "maus", title: "Text gelb markieren",
    ribbonDemo: ["marker-gelb"],
    erklaerung: "Die Hervorhebung funktioniert wie ein echter Textmarker — markieren, dann Farbe anklicken.",
    aufgabe: "Markiere „nicht vergessen“ und hebe es gelb hervor.",
    hint: "Beide Wörter markieren, dann das gelbe Feld bei „Hervorhebung“ anklicken.",
    paragraphs: ["Bitte diesen Satz nicht vergessen."],
    demo: { vorher: "Bitte diesen Satz nicht vergessen.", nachher: "Bitte diesen Satz <span style='background:#FCE49A'>nicht vergessen</span>." },
    check: (ctx) => { const s = ctx.styleOf("nicht vergessen"); return !!s && s.backgroundColor === ctx.hexToRgb("#FCE49A"); },
  });
  missions.push({
    id: "d5-2", family: "D5", method: "maus", title: "Text grün markieren",
    ribbonDemo: ["marker-gruen"],
    erklaerung: "Grüne Hervorhebung eignet sich zum Beispiel für erledigte Punkte.",
    aufgabe: "Markiere das Wort „Termin“ und hebe es grün hervor.",
    hint: "Markieren, dann das grüne Hervorhebungsfeld anklicken.",
    paragraphs: ["Der Termin wurde verschoben."],
    demo: { vorher: "Der Termin wurde verschoben.", nachher: "Der <span style='background:#B7E3C4'>Termin</span> wurde verschoben." },
    check: (ctx) => { const s = ctx.styleOf("Termin"); return !!s && s.backgroundColor === ctx.hexToRgb("#B7E3C4"); },
  });
  missions.push({
    id: "d5-3", family: "D5", method: "maus", title: "Text blau markieren",
    ribbonDemo: ["marker-blau"],
    erklaerung: "Blaue Hervorhebung eignet sich zum Beispiel für Quellenangaben.",
    aufgabe: "Markiere das Wort „Quellen“ und hebe es blau hervor.",
    hint: "Markieren, dann das blaue Hervorhebungsfeld anklicken.",
    paragraphs: ["Kontrolliert eure Quellen."],
    demo: { vorher: "Kontrolliert eure Quellen.", nachher: "Kontrolliert eure <span style='background:#BBD8F0'>Quellen</span>." },
    check: (ctx) => { const s = ctx.styleOf("Quellen"); return !!s && s.backgroundColor === ctx.hexToRgb("#BBD8F0"); },
  });

  // ---------------------------------------------------------------
  // D6 — Schriftart
  // ---------------------------------------------------------------
  missions.push({
    id: "d6-1", family: "D6", method: "maus", title: "Eine serifenlose Schriftart wählen",
    ribbonDemo: ["font-serifenlos"],
    erklaerung: "Serifenlose Schriften (ohne kleine Endstriche) wirken modern und klar.",
    aufgabe: "Markiere „modern wirken“ und stelle es auf „Serifenlos“ um.",
    hint: "Markieren, dann im Ribbon auf „Serifenlos“ klicken.",
    paragraphs: ["Diese Überschrift soll modern wirken."],
    demo: { vorher: "Diese Überschrift soll modern wirken.", nachher: "Diese Überschrift soll <span style='font-family:Arial,sans-serif'>modern wirken</span>." },
    check: (ctx) => { const s = ctx.styleOf("modern wirken"); return !!s && s.fontFamily.toLowerCase().includes("arial"); },
  });
  missions.push({
    id: "d6-2", family: "D6", method: "maus", title: "Eine Serifenschrift wählen",
    ribbonDemo: ["font-serifen"],
    erklaerung: "Serifenschriften (mit kleinen Endstrichen) wirken klassisch und seriös.",
    aufgabe: "Markiere das Wort „klassisch“ und stelle es auf „Serifen“ um.",
    hint: "Markieren, dann auf „Serifen“ klicken.",
    paragraphs: ["Dieses Zitat wirkt klassisch."],
    demo: { vorher: "Dieses Zitat wirkt klassisch.", nachher: "Dieses Zitat wirkt <span style='font-family:Georgia,serif'>klassisch</span>." },
    check: (ctx) => { const s = ctx.styleOf("klassisch"); return !!s && s.fontFamily.toLowerCase().includes("georgia"); },
  });
  missions.push({
    id: "d6-3", family: "D6", method: "maus", title: "Eine Schreibmaschinen-Schrift wählen",
    ribbonDemo: ["font-schreibmaschine"],
    erklaerung: "Eine Schreibmaschinen-Schrift eignet sich zum Beispiel für Code oder Zitate aus Dokumenten.",
    aufgabe: "Markiere „getippt aussehen“ und stelle es auf „Schreibmasch.“ um.",
    hint: "Markieren, dann auf „Schreibmasch.“ klicken.",
    paragraphs: ["Dieser Teil soll wie getippt aussehen."],
    demo: { vorher: "Dieser Teil soll wie getippt aussehen.", nachher: "Dieser Teil soll wie <span style='font-family:\"Courier New\",monospace'>getippt aussehen</span>." },
    check: (ctx) => { const s = ctx.styleOf("getippt aussehen"); return !!s && s.fontFamily.toLowerCase().includes("courier"); },
  });

  // ---------------------------------------------------------------
  // D7 — Schriftgröße
  // ---------------------------------------------------------------
  missions.push({
    id: "d7-1", family: "D7", method: "maus", title: "Text verkleinern",
    ribbonDemo: ["groesse-klein"],
    erklaerung: "Für Randbemerkungen eignet sich eine kleinere Schriftgröße.",
    aufgabe: "Markiere das Wort „Randnotiz“ und stelle die Größe auf „Klein“.",
    hint: "Markieren, dann bei „Schriftgröße“ auf „Klein“ klicken.",
    paragraphs: ["Das hier ist nur eine Randnotiz."],
    demo: { vorher: "Das hier ist nur eine Randnotiz.", nachher: "Das hier ist nur eine <span style='font-size:14px'>Randnotiz</span>." },
    check: (ctx) => { const s = ctx.styleOf("Randnotiz"); return !!s && parseFloat(s.fontSize) === 14; },
  });
  missions.push({
    id: "d7-2", family: "D7", method: "maus", title: "Text vergrößern",
    ribbonDemo: ["groesse-gross"],
    erklaerung: "Für Hervorhebungen eignet sich eine größere Schrift.",
    aufgabe: "Markiere „mehr Aufmerksamkeit“ und stelle die Größe auf „Groß“.",
    hint: "Markieren, dann auf „Groß“ klicken.",
    paragraphs: ["Diese Überschrift braucht mehr Aufmerksamkeit."],
    demo: { vorher: "Diese Überschrift braucht mehr Aufmerksamkeit.", nachher: "Diese Überschrift braucht <span style='font-size:24px'>mehr Aufmerksamkeit</span>." },
    check: (ctx) => { const s = ctx.styleOf("mehr Aufmerksamkeit"); return !!s && parseFloat(s.fontSize) === 24; },
  });
  missions.push({
    id: "d7-3", family: "D7", method: "maus", title: "Text sehr groß machen",
    ribbonDemo: ["groesse-sehrgross"],
    erklaerung: "Für Eilmeldungen oder Plakate darf die Schrift auch sehr groß sein.",
    aufgabe: "Markiere „ACHTUNG BITTE LESEN“ und stelle die Größe auf „Sehr groß“.",
    hint: "Den gesamten Text markieren, dann auf „Sehr groß“ klicken.",
    paragraphs: ["ACHTUNG BITTE LESEN"],
    demo: { vorher: "ACHTUNG BITTE LESEN", nachher: "<span style='font-size:32px'>ACHTUNG BITTE LESEN</span>" },
    check: (ctx) => { const s = ctx.styleOf("ACHTUNG BITTE LESEN"); return !!s && parseFloat(s.fontSize) === 32; },
  });

  // ---------------------------------------------------------------
  // D8 — Durchgestrichen (NEU)
  // ---------------------------------------------------------------
  missions.push({
    id: "d8-1", family: "D8", method: "maus", title: "Ein Wort durchstreichen",
    ribbonDemo: ["btn-durchgestrichen"],
    erklaerung: "Durchgestrichener Text zeigt: Das hier gilt nicht mehr, bleibt aber lesbar — nützlich beim Korrigieren.",
    aufgabe: "Markiere das Wort „Montag“ und streiche es durch.",
    hint: "Markieren, dann im Ribbon auf das durchgestrichene „ab“ klicken.",
    paragraphs: ["Der alte Termin war Montag."],
    demo: { vorher: "Der alte Termin war Montag.", nachher: "Der alte Termin war <s>Montag</s>." },
    check: (ctx) => isStrike(ctx.styleOf("Montag")),
  });
  missions.push({
    id: "d8-2", family: "D8", method: "maus", title: "Ein weiteres Wort durchstreichen",
    ribbonDemo: ["btn-durchgestrichen"],
    erklaerung: "So markiert man im Entwurf sichtbar, was gestrichen werden soll.",
    aufgabe: "Markiere das Wort „überholt“ und streiche es durch.",
    hint: "Markieren, dann „Durchgestrichen“ anklicken.",
    paragraphs: ["Diese Idee ist leider überholt."],
    demo: { vorher: "Diese Idee ist leider überholt.", nachher: "Diese Idee ist leider <s>überholt</s>." },
    check: (ctx) => isStrike(ctx.styleOf("überholt")),
  });
  missions.push({
    id: "d8-3", family: "D8", method: "maus", title: "Einen Fehler durchstreichen",
    ribbonDemo: ["btn-durchgestrichen"],
    erklaerung: "Auch kurze Wörter lassen sich so als „gestrichen“ markieren.",
    aufgabe: "Markiere das Wort „falsch“ und streiche es durch.",
    hint: "Markieren, dann „Durchgestrichen“ anklicken.",
    paragraphs: ["Das war falsch."],
    demo: { vorher: "Das war falsch.", nachher: "Das war <s>falsch</s>." },
    check: (ctx) => isStrike(ctx.styleOf("falsch")),
  });

  // ---------------------------------------------------------------
  // D9 — Hochgestellt (NEU)
  // ---------------------------------------------------------------
  missions.push({
    id: "d9-1", family: "D9", method: "maus", title: "Eine Zahl hochstellen",
    ribbonDemo: ["btn-hochgestellt"],
    erklaerung: "Hochgestellt wird zum Beispiel für Quadratmeter (m²) oder Fußnoten gebraucht.",
    aufgabe: "Markiere die „2“ hinter dem „m“ und setze sie hochgestellt, damit „m²“ entsteht.",
    hint: "Nur die „2“ markieren, dann auf „x²“ klicken.",
    paragraphs: ["Die Fläche beträgt 15 m2."],
    demo: { vorher: "Die Fläche beträgt 15 m2.", nachher: "Die Fläche beträgt 15 m<sup>2</sup>." },
    check: (ctx) => { const s = ctx.styleOf("2"); return !!s && s.verticalAlign === "super"; },
  });
  missions.push({
    id: "d9-2", family: "D9", method: "maus", title: "Eine weitere Zahl hochstellen",
    ribbonDemo: ["btn-hochgestellt"],
    erklaerung: "Auch bei Exponenten wird die Zahl hochgestellt.",
    aufgabe: "Markiere die „3“ und setze sie hochgestellt, damit „x³“ entsteht.",
    hint: "Nur die „3“ markieren, dann „x²“ klicken.",
    paragraphs: ["Das Lösungswort lautet x3 im Rätsel."],
    demo: { vorher: "Das Lösungswort lautet x3 im Rätsel.", nachher: "Das Lösungswort lautet x<sup>3</sup> im Rätsel." },
    check: (ctx) => { const s = ctx.styleOf("3"); return !!s && s.verticalAlign === "super"; },
  });
  missions.push({
    id: "d9-3", family: "D9", method: "maus", title: "Eine Fußnotenzahl hochstellen",
    ribbonDemo: ["btn-hochgestellt"],
    erklaerung: "So werden auch Fußnoten-Verweise in echten Texten markiert.",
    aufgabe: "Markiere die „1“ nach „Aussage“ und setze sie hochgestellt.",
    hint: "Nur die „1“ markieren, dann „x²“ klicken.",
    paragraphs: ["Diese Aussage1 ist umstritten."],
    demo: { vorher: "Diese Aussage1 ist umstritten.", nachher: "Diese Aussage<sup>1</sup> ist umstritten." },
    check: (ctx) => { const s = ctx.styleOf("1"); return !!s && s.verticalAlign === "super"; },
  });

  // ---------------------------------------------------------------
  // D10 — Tiefgestellt (NEU)
  // ---------------------------------------------------------------
  missions.push({
    id: "d10-1", family: "D10", method: "maus", title: "Eine Zahl tiefstellen",
    ribbonDemo: ["btn-tiefgestellt"],
    erklaerung: "Tiefgestellt wird zum Beispiel bei chemischen Formeln gebraucht.",
    aufgabe: "Markiere die „2“ in „H2O“ und setze sie tiefgestellt, damit „H₂O“ entsteht.",
    hint: "Nur die „2“ markieren, dann auf „x₂“ klicken.",
    paragraphs: ["Wasser besteht aus H2O."],
    demo: { vorher: "Wasser besteht aus H2O.", nachher: "Wasser besteht aus H<sub>2</sub>O." },
    check: (ctx) => { const s = ctx.styleOf("2"); return !!s && s.verticalAlign === "sub"; },
  });
  missions.push({
    id: "d10-2", family: "D10", method: "maus", title: "Eine weitere Zahl tiefstellen",
    ribbonDemo: ["btn-tiefgestellt"],
    erklaerung: "Auch bei CO2 gehört die Zahl tiefgestellt.",
    aufgabe: "Markiere die „2“ in „CO2“ und setze sie tiefgestellt.",
    hint: "Nur die „2“ markieren, dann „x₂“ klicken.",
    paragraphs: ["Die Formel lautet CO2."],
    demo: { vorher: "Die Formel lautet CO2.", nachher: "Die Formel lautet CO<sub>2</sub>." },
    check: (ctx) => { const s = ctx.styleOf("2"); return !!s && s.verticalAlign === "sub"; },
  });
  missions.push({
    id: "d10-3", family: "D10", method: "maus", title: "Eine dritte Zahl tiefstellen",
    ribbonDemo: ["btn-tiefgestellt"],
    erklaerung: "Stickstoffgas wird als N2 geschrieben.",
    aufgabe: "Markiere die „2“ in „N2“ und setze sie tiefgestellt.",
    hint: "Nur die „2“ markieren, dann „x₂“ klicken.",
    paragraphs: ["Das Gas heißt N2."],
    demo: { vorher: "Das Gas heißt N2.", nachher: "Das Gas heißt N<sub>2</sub>." },
    check: (ctx) => { const s = ctx.styleOf("2"); return !!s && s.verticalAlign === "sub"; },
  });

  // ---------------------------------------------------------------
  // D11 — Großbuchstaben (Effekt, NEU)
  // ---------------------------------------------------------------
  missions.push({
    id: "d11-1", family: "D11", method: "maus", title: "Text als Großbuchstaben anzeigen",
    ribbonDemo: ["btn-grossbuchstaben"],
    erklaerung: "Dieser Effekt zeigt den Text nur optisch in Großbuchstaben — gespeichert bleibt er wie eingetippt. In echtem Word liegt das im Schriftart-Dialogfeld (Strg+D), hier direkt im Ribbon.",
    aufgabe: "Markiere das Wort „auffallen“ und wende den Großbuchstaben-Effekt an.",
    hint: "Markieren, dann auf „AA“ im Ribbon klicken.",
    paragraphs: ["Diese Überschrift soll auffallen."],
    demo: { vorher: "Diese Überschrift soll auffallen.", nachher: "Diese Überschrift soll <span style='text-transform:uppercase'>auffallen</span>." },
    check: (ctx) => { const s = ctx.styleOf("auffallen"); return !!s && s.textTransform === "uppercase"; },
  });
  missions.push({
    id: "d11-2", family: "D11", method: "maus", title: "Einen Titel als Großbuchstaben anzeigen",
    ribbonDemo: ["btn-grossbuchstaben"],
    erklaerung: "Titel wirken in Großbuchstaben oft kräftiger.",
    aufgabe: "Markiere das Wort „Eilmeldung“ und wende den Großbuchstaben-Effekt an.",
    hint: "Markieren, dann „AA“ klicken.",
    paragraphs: ["Der Titel lautet Eilmeldung."],
    demo: { vorher: "Der Titel lautet Eilmeldung.", nachher: "Der Titel lautet <span style='text-transform:uppercase'>Eilmeldung</span>." },
    check: (ctx) => { const s = ctx.styleOf("Eilmeldung"); return !!s && s.textTransform === "uppercase"; },
  });
  missions.push({
    id: "d11-3", family: "D11", method: "maus", title: "Einen Satzteil als Großbuchstaben anzeigen",
    ribbonDemo: ["btn-grossbuchstaben"],
    erklaerung: "Auch mehrere Wörter am Stück lassen sich so hervorheben.",
    aufgabe: "Markiere „besonders laut“ und wende den Großbuchstaben-Effekt an.",
    hint: "Beide Wörter markieren, dann „AA“ klicken.",
    paragraphs: ["Bitte besonders laut lesen."],
    demo: { vorher: "Bitte besonders laut lesen.", nachher: "Bitte <span style='text-transform:uppercase'>besonders laut</span> lesen." },
    check: (ctx) => { const s = ctx.styleOf("besonders laut"); return !!s && s.textTransform === "uppercase"; },
  });

  // ---------------------------------------------------------------
  // D12 — Kapitälchen (NEU)
  // ---------------------------------------------------------------
  missions.push({
    id: "d12-1", family: "D12", method: "maus", title: "Einen Namen in Kapitälchen setzen",
    ribbonDemo: ["btn-kapitaelchen"],
    erklaerung: "Kapitälchen sehen aus wie kleine Großbuchstaben — oft bei Autorennamen verwendet.",
    aufgabe: "Markiere „Max Mustermann“ und setze es in Kapitälchen.",
    hint: "Beide Wörter markieren, dann auf „Ab“ im Ribbon klicken.",
    paragraphs: ["Der Autor heißt Max Mustermann."],
    demo: { vorher: "Der Autor heißt Max Mustermann.", nachher: "Der Autor heißt <span style='font-variant:small-caps'>Max Mustermann</span>." },
    check: (ctx) => { const s = ctx.styleOf("Max Mustermann"); return !!s && (s.fontVariant || "").includes("small-caps"); },
  });
  missions.push({
    id: "d12-2", family: "D12", method: "maus", title: "Ein Wort in Kapitälchen setzen",
    ribbonDemo: ["btn-kapitaelchen"],
    erklaerung: "Kapitälchen eignen sich auch, um ein einzelnes Wort elegant hervorzuheben.",
    aufgabe: "Markiere das Wort „immer“ und setze es in Kapitälchen.",
    hint: "Markieren, dann „Ab“ klicken.",
    paragraphs: ["Diese Regel gilt immer."],
    demo: { vorher: "Diese Regel gilt immer.", nachher: "Diese Regel gilt <span style='font-variant:small-caps'>immer</span>." },
    check: (ctx) => { const s = ctx.styleOf("immer"); return !!s && (s.fontVariant || "").includes("small-caps"); },
  });
  missions.push({
    id: "d12-3", family: "D12", method: "maus", title: "Einen Verlagsnamen in Kapitälchen setzen",
    ribbonDemo: ["btn-kapitaelchen"],
    erklaerung: "Verlagsnamen werden in Impressen oft als Kapitälchen gesetzt.",
    aufgabe: "Markiere das Wort „Musterverlag“ und setze es in Kapitälchen.",
    hint: "Markieren, dann „Ab“ klicken.",
    paragraphs: ["Der Verlag heißt Musterverlag."],
    demo: { vorher: "Der Verlag heißt Musterverlag.", nachher: "Der Verlag heißt <span style='font-variant:small-caps'>Musterverlag</span>." },
    check: (ctx) => { const s = ctx.styleOf("Musterverlag"); return !!s && (s.fontVariant || "").includes("small-caps"); },
  });

  // ---------------------------------------------------------------
  // D13 — Doppelt durchgestrichen (NEU)
  // ---------------------------------------------------------------
  missions.push({
    id: "d13-1", family: "D13", method: "maus", title: "Ein Wort doppelt durchstreichen",
    ribbonDemo: ["btn-doppelt-durchgestrichen"],
    erklaerung: "Doppelt durchgestrichen signalisiert: endgültig gestrichen — stärker als einfach durchgestrichen.",
    aufgabe: "Markiere das Wort „veraltet“ und streiche es doppelt durch.",
    hint: "Markieren, dann im Ribbon auf „ab“ (doppelt durchgestrichen) klicken.",
    paragraphs: ["Der Entwurf ist komplett veraltet."],
    demo: { vorher: "Der Entwurf ist komplett veraltet.", nachher: "Der Entwurf ist komplett <span style='text-decoration:line-through double'>veraltet</span>." },
    check: (ctx) => isDoubleStrike(ctx.styleOf("veraltet")),
  });
  missions.push({
    id: "d13-2", family: "D13", method: "maus", title: "Ein weiteres Wort doppelt durchstreichen",
    ribbonDemo: ["btn-doppelt-durchgestrichen"],
    erklaerung: "So markiert man im Entwurf unmissverständlich: Das wurde verworfen.",
    aufgabe: "Markiere das Wort „verworfen“ und streiche es doppelt durch.",
    hint: "Markieren, dann „Doppelt durchgestrichen“ anklicken.",
    paragraphs: ["Diese Variante wurde verworfen."],
    demo: { vorher: "Diese Variante wurde verworfen.", nachher: "Diese Variante wurde <span style='text-decoration:line-through double'>verworfen</span>." },
    check: (ctx) => isDoubleStrike(ctx.styleOf("verworfen")),
  });
  missions.push({
    id: "d13-3", family: "D13", method: "maus", title: "Einen Irrtum doppelt durchstreichen",
    ribbonDemo: ["btn-doppelt-durchgestrichen"],
    erklaerung: "Auch kurze Wörter lassen sich so eindeutig als Irrtum markieren.",
    aufgabe: "Markiere das Wort „Irrtum“ und streiche es doppelt durch.",
    hint: "Markieren, dann „Doppelt durchgestrichen“ anklicken.",
    paragraphs: ["Das war ein Irrtum."],
    demo: { vorher: "Das war ein Irrtum.", nachher: "Das war ein <span style='text-decoration:line-through double'>Irrtum</span>." },
    check: (ctx) => isDoubleStrike(ctx.styleOf("Irrtum")),
  });

  // ---------------------------------------------------------------
  // Labels je Familie (per Family-Code, unabhängig von der Reihenfolge)
  // ---------------------------------------------------------------
  const familyLabels = {
    D1: "Fett", D2: "Kursiv", D3: "Unterstrichen", D4: "Schriftfarbe", D5: "Hervorhebung",
    D6: "Schriftart", D7: "Schriftgröße", D8: "Durchgestrichen", D9: "Hochgestellt",
    D10: "Tiefgestellt", D11: "Großbuchstaben", D12: "Kapitälchen", D13: "Doppelt durchgestrichen",
  };
  missions.forEach(m => { m.baustein = "D"; m.bausteinLabel = "Zeichenformatierung – " + familyLabels[m.family]; });

  // ---------------------------------------------------------------
  // Durchmischen: Round-Robin über alle 13 Familien (je 3 Wiederholungen)
  // ---------------------------------------------------------------
  function chunk3(arr) {
    const out = [];
    for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
    return out;
  }
  function roundRobin(groups) {
    const out = [];
    const maxLen = Math.max(...groups.map(g => g.length));
    for (let round = 0; round < maxLen; round++) {
      groups.forEach(g => { if (g[round]) out.push(g[round]); });
    }
    return out;
  }
  const interleaved = roundRobin(chunk3(missions));

  window.FormatEngine.start(interleaved, {
    familyLabel: "Zeichenformatierung",
    startNumber: 1,
    totalCount: 39,
    onComplete: {
      title: "Baustein D abgeschlossen! 🎉",
      text: "Du hast alle 39 Missionen zur Zeichenformatierung gemeistert — Fett, Kursiv, Unterstrichen, Durchgestrichen, Hochgestellt, Tiefgestellt, Schriftfarbe, Hervorhebung, Schriftart, Schriftgröße, Großbuchstaben, Kapitälchen und Doppelt durchgestrichen.",
    },
  });
})();
