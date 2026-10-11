/**
 * Fancy LOGA — manuell aktivierbares Erscheinungsbild für LOGA3
 * -----------------------------------------------------------
 * Nur CSS. Keine Datenübertragung, kein Zugriff auf fachliche Daten
 * und keine Änderungen an LOGA3-Funktionen.
 * Erneuter Aufruf schaltet das Design wieder aus; Neuladen entfernt es.
 */
(() => {
  "use strict";

  const ROOT_CLASS = "loga-manual-modern";
  const STATE_KEY = "__LOGA3_MANUAL_MODERN_V1__";
  const STYLE_ID = "fancy-loga-modern-style";

  // Immer zuerst prüfen, auf welcher Seite das Skript ausgeführt wird.
  if (location.hostname !== "tp.pi-asp.de" ||
      !/^\/loga3(?:\/|$)/i.test(location.pathname)) {
    console.warn("Fancy LOGA: Dieses Skript ist nur für tp.pi-asp.de/loga3 gedacht.");
    return;
  }

  // Zweiter Klick = ausschalten.
  if (window[STATE_KEY] && typeof window[STATE_KEY].stop === "function") {
    window[STATE_KEY].stop();
    delete window[STATE_KEY];
    console.info("Fancy LOGA: Design ausgeschaltet.");
    return;
  }

  // Keine Positions-, Größen- oder Funktionsänderungen.
  const css = String.raw`
html.loga-manual-modern {
  --loga-modern-accent: #176f59;
  --loga-modern-accent-hover: #105743;
  --loga-modern-ink: #243b35;
  --loga-modern-muted: #526a62;
  --loga-modern-tint: #eef5f1;
  --loga-modern-line: #dae6e0;
  --loga-modern-header: #174a3d;

  /* Theme-Variablen, die bereits von der Webanwendung genutzt werden. */
  --main-green-color: #176f59;
  --test-main-color: #176f59;
  --main-green-lighten-color: #398a72;
  --lg-button-primary-bgndc: #176f59;
  --lg-button-primary-hover-color: #105743;
  --lg-heading-text-color: #234e40;
  --lg-spanned-tab-header-sel-color: #176f59;
  --l3-dashboard-toolbar-passive-color: #285c4d;
  --l3-dashboard-toolbar-active-color: #174a3d;
  --lwmain-background-color: #17523f;
  --lwtoolbar-background-color: #133d32;
  --lwmain-search-background-color: #1d453b;
}

html.loga-manual-modern body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Hauptnavigation und Suche */
html.loga-manual-modern .LGMainToolbar,
html.loga-manual-modern .LGMainToolbar.isNewDesign {
  background: var(--loga-modern-header) !important;
  box-shadow: 0 2px 12px rgba(8,47,34,.16) !important;
}
html.loga-manual-modern .LGMainSearchHeader {
  background-color: #1c5244 !important;
}
html.loga-manual-modern .MenuWrapper .LWMenuItemFirst .FirstLevelLabel {
  border-radius: 7px;
  transition: background-color 150ms ease, color 150ms ease;
}
html.loga-manual-modern .MenuWrapper .LWMenuItemFirst .FirstLevelLabel:hover {
  background-color: var(--loga-modern-tint);
  color: var(--loga-modern-accent-hover);
}

/* Buttons: bewusst keine Höhe, Breite oder Innenabstände verändern */
html.loga-manual-modern .LG-Button {
  border-radius: 8px !important;
  letter-spacing: .1px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  transition: background-color 150ms ease, border-color 150ms ease,
              box-shadow 150ms ease, color 150ms ease !important;
}
html.loga-manual-modern .LG-Button.primary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled) {
  background-color: var(--loga-modern-accent) !important;
  color: #fff !important;
  border-color: transparent !important;
  box-shadow: 0 2px 5px rgba(13,76,57,.16) !important;
}
html.loga-manual-modern .LG-Button.primary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled):hover,
html.loga-manual-modern .LG-Button.primary.LG-Button-up-hovering:not(.LG-Button-up-disabled),
html.loga-manual-modern .LG-Button.primary.LG-Button-down-hovering:not(.LG-Button-down-disabled) {
  background-color: var(--loga-modern-accent-hover) !important;
  box-shadow: 0 3px 9px rgba(13,76,57,.20) !important;
}
html.loga-manual-modern .LG-Button.secondary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled),
html.loga-manual-modern .LG-Button.tertiary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled) {
  background-color: #f2f6f3 !important;
  border-color: var(--loga-modern-line) !important;
  color: var(--loga-modern-ink) !important;
}
html.loga-manual-modern .LG-Button.secondary:not(.LG-Button-up-disabled):hover,
html.loga-manual-modern .LG-Button.tertiary:not(.LG-Button-up-disabled):hover,
html.loga-manual-modern .LG-Button.secondary.LG-Button-up-hovering,
html.loga-manual-modern .LG-Button.tertiary.LG-Button-up-hovering {
  background-color: #e2eee8 !important;
}
html.loga-manual-modern .LG-Button.LG-Button-up-disabled,
html.loga-manual-modern .LG-Button.LG-Button-down-disabled {
  box-shadow: none !important;
}

/* Eingabefelder und Fokus */
html.loga-manual-modern input[type="text"],
html.loga-manual-modern input[type="search"],
html.loga-manual-modern input[type="number"],
html.loga-manual-modern input[type="date"],
html.loga-manual-modern input[type="password"],
html.loga-manual-modern textarea,
html.loga-manual-modern select {
  border-radius: 7px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
html.loga-manual-modern input:not([type="checkbox"]):not([type="radio"]):focus-visible,
html.loga-manual-modern textarea:focus-visible,
html.loga-manual-modern select:focus-visible,
html.loga-manual-modern button:focus-visible,
html.loga-manual-modern .LG-Button:focus-visible {
  outline: 2px solid #23876c !important;
  outline-offset: 2px !important;
}

/* Tabellen: Lesbarkeit verbessern, Statusfarben unberührt lassen */
html.loga-manual-modern .LG-DataTableWidget .LG-DataTableHeader,
html.loga-manual-modern .LG-DataTableWidget .LG-DataTableFooter {
  background-color: #e9f1ed !important;
  color: #34574c !important;
  border-color: #dbe7e1 !important;
  font-weight: 600;
}
html.loga-manual-modern .LG-DataTableWidget .LG-DataTableCell {
  border-bottom-color: #e9efeb;
}

/* Überschriften und Bereiche */
html.loga-manual-modern .LG-Section .LG-Section-Header,
html.loga-manual-modern .LG-Heading .LG-Heading-Text {
  color: var(--loga-modern-accent-hover);
}
html.loga-manual-modern .LG-Heading {
  border-bottom-color: #c7ded2;
}

/* Dialoge */
html.loga-manual-modern .LG-DialogBox,
html.loga-manual-modern .LG-ChangePassword-Dialog {
  border: 1px solid var(--loga-modern-line) !important;
  border-radius: 14px !important;
  box-shadow: 0 20px 48px rgba(15,39,30,.20) !important;
}
html.loga-manual-modern .LG-DialogLayoutHeader {
  border-bottom-color: var(--loga-modern-line);
}
html.loga-manual-modern .LG-DialogLayoutHeaderLabel {
  color: var(--loga-modern-accent-hover) !important;
}

@media (prefers-reduced-motion: reduce) {
  html.loga-manual-modern .LG-Button,
  html.loga-manual-modern input,
  html.loga-manual-modern textarea,
  html.loga-manual-modern select {
    transition: none !important;
  }
}
`;

  const root = document.documentElement;
  let sheet = null;
  let styleTag = null;

  try {
    // Constructable Stylesheets unterstützen manche restriktiven CSPs besser.
    if (typeof CSSStyleSheet !== "undefined" && "adoptedStyleSheets" in document) {
      try {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      } catch (_) {
        sheet = null;
      }
    }
    if (!sheet) {
      styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      styleTag.textContent = css;
      (document.head || root).appendChild(styleTag);
    }

    root.classList.add(ROOT_CLASS);
    window[STATE_KEY] = {
      stop() {
        root.classList.remove(ROOT_CLASS);
        if (sheet) {
          document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== sheet);
        }
        if (styleTag) styleTag.remove();
      }
    };
    console.info("Fancy LOGA: Design aktiviert. Nochmals ausführen = ausschalten.");
  } catch (error) {
    root.classList.remove(ROOT_CLASS);
    if (sheet && "adoptedStyleSheets" in document) {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== sheet);
    }
    if (styleTag) styleTag.remove();
    console.error("Fancy LOGA: Das Design konnte nicht angewendet werden:", error);
  }
})();
