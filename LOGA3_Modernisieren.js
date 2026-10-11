/**
 * Fancy LOGA — Midnight Emerald
 * Rein optisches, manuell aktivierbares Dark Theme für LOGA3.
 * Kein automatischer Start, keine Datenzugriffe, keine Netzwerkrequests.
 * Zweiter Klick schaltet es aus. Neuladen stellt das Original wieder her.
 */
(() => {
  "use strict";

  // Kompatibel mit dem bisherigen Bookmarklet und seinem An/Aus-Schalter.
  const ROOT_CLASS = "loga-manual-modern";
  const STATE_KEY = "__LOGA3_MANUAL_MODERN_V1__";
  const STYLE_ID = "fancy-loga-modern-style";

  if (location.hostname !== "tp.pi-asp.de" ||
      !/^\/loga3(?:\/|$)/i.test(location.pathname)) {
    console.warn("Fancy LOGA: nur für tp.pi-asp.de/loga3.");
    return;
  }

  if (window[STATE_KEY] && typeof window[STATE_KEY].stop === "function") {
    window[STATE_KEY].stop();
    delete window[STATE_KEY];
    console.info("Fancy LOGA: Dark Theme ausgeschaltet.");
    return;
  }

  const css = String.raw`
/*
 * MIDNIGHT EMERALD
 * Die Klasse am HTML-Element begrenzt ALLE Regeln auf die aktive Sitzung.
 * Status-/Fehlerfarben, Diagramme und Personalplanungs-Raster werden nicht
 * pauschal per Farbfilter verfälscht.
 */
html.loga-manual-modern {
  color-scheme: dark;
  --fl-bg: #0e141d;
  --fl-surface: #171f2b;
  --fl-raised: #202b39;
  --fl-overlay: #253243;
  --fl-header: #121e2b;
  --fl-line: #314052;
  --fl-text: #e9f0f7;
  --fl-muted: #b1c0cf;
  --fl-faint: #899bab;
  --fl-green: #49cfa2;
  --fl-green-soft: #20473d;
  --fl-green-strong: #166c58;
  --fl-green-hover: #218268;
  --fl-shadow: rgba(0, 0, 0, .42);
  --main-green-color: var(--fl-green);
  --main-green-lighten-color: #69deba;
  --test-main-color: var(--fl-green);
  --lg-button-primary-bgndc: var(--fl-green-strong);
  --lg-button-primary-hover-color: var(--fl-green-hover);
  --lg-heading-text-color: var(--fl-text);
  --lg-spanned-tab-header-sel-color: var(--fl-green);
  --l3-dashboard-toolbar-passive-color: #172b33;
  --l3-dashboard-toolbar-active-color: #13242c;
  --l3-old-dashboard-widget-background-color: var(--fl-surface);
  --l3-old-dashboard-widget-background-lighten-color: var(--fl-raised);
  --l3-dashboard-background-gradient-start-color: #101a25;
  --l3-dashboard-background-gradient-end-color: #0e141d;
  --lwmain-background-color: #13242c;
  --lwtoolbar-background-color: #111b27;
  --lwmain-search-background-color: #192b36;
  --lg-combobox-popup-bgnd: var(--fl-raised);
  --lg-scrollbar: #4a6a73;
  --lg-inputs-required-bgnd: #252f32;
  --lg-inputs-required-border: #52ad8a;
  background: var(--fl-bg);
}

html.loga-manual-modern,
html.loga-manual-modern body {
  background: var(--fl-bg) !important;
  color: var(--fl-text);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
html.loga-manual-modern body {
  scrollbar-color: #475b69 #141c26;
}
html.loga-manual-modern ::selection {
  background: #276c5c;
  color: #fff;
}

/* Hauptleiste: dunkler Verlauf, minimaler grüner Schimmer */
html.loga-manual-modern .LGMainToolbar,
html.loga-manual-modern .LGMainToolbar.isNewDesign {
  background: linear-gradient(108deg, #152033 0%, #152734 50%, #153d35 100%) !important;
  border-bottom: 1px solid #315346 !important;
  box-shadow: 0 4px 22px rgba(0, 0, 0, .28) !important;
}
html.loga-manual-modern .LGMainToolbar-ItemWrapper.active:not(.LGMainToolbarLogoItem),
html.loga-manual-modern .LGMainToolbar-ItemWrapper:not(.active):hover {
  background-color: rgba(73, 207, 162, .14) !important;
}
html.loga-manual-modern .LGMainToolbar-Text {
  color: #eaf6f2 !important;
}
html.loga-manual-modern .LGMainSearchHeader {
  background: linear-gradient(120deg, #1a2935, #1c3939) !important;
  color: var(--fl-text) !important;
}
html.loga-manual-modern .LGMainSearchHeader.isInEditMode {
  background: #202d39 !important;
}
html.loga-manual-modern .LGMainSearchResultsWrapper,
html.loga-manual-modern .LGMainSearchResultsWrapper .LGSearchResultsCategoryHeader {
  background: var(--fl-surface) !important;
  color: var(--fl-text) !important;
}
html.loga-manual-modern .LGMainSearchResultsWrapper .LGSearchResultsCategoryHeader.collapsed,
html.loga-manual-modern .LGMainSearchResultsWrapper .LGSearchResultElement:hover,
html.loga-manual-modern .LGMainSearchResultsWrapper .LGSearchResultElement.selected {
  background: var(--fl-raised) !important;
}
html.loga-manual-modern .LGMainSearchResultsWrapper .LGSearchResultsCategoryHeader-Button,
html.loga-manual-modern .LGMainSearchResultsWrapper .LGSearchResultsCategoryHeader-Label,
html.loga-manual-modern .LGMainSearchResultsWrapper .LGSearchResultsCategoryItems {
  color: var(--fl-text) !important;
}

/* Grundflächen / GWT-Panels: keine Struktur- oder Größenänderungen */
html.loga-manual-modern .LG-ScrollDecoratedPanel,
html.loga-manual-modern .LG-InfoPanel-Scroll,
html.loga-manual-modern .LG-InfoPanel-Section-Frame,
html.loga-manual-modern .LG-DataTableDetail,
html.loga-manual-modern .LG-ScrollDataTable,
html.loga-manual-modern .gwt-TabLayoutPanelContentContainer {
  background-color: var(--fl-surface) !important;
  color: var(--fl-text) !important;
}
html.loga-manual-modern .LG-DecoratedPanel:not(.color-green):not(.color-orange) > .LG-DecoratedPanel-content,
html.loga-manual-modern .LG-PanelControls:not(.color-green):not(.color-orange) {
  background-color: var(--fl-surface) !important;
  color: var(--fl-text) !important;
}
html.loga-manual-modern .LG-InfoPanel-SectionTitle {
  color: var(--fl-green) !important;
}
html.loga-manual-modern .LG-InputLabel,
html.loga-manual-modern .LG-ComponentsTable-HeaderCell,
html.loga-manual-modern .LG-FormField-Semicolon {
  color: var(--fl-muted) !important;
}
html.loga-manual-modern .LG-InputLabel .requiredSuffix,
html.loga-manual-modern .LG-ComponentsTable-HeaderCell .requiredSuffix {
  color: #7be8be !important;
}
html.loga-manual-modern a:not(.LG-Button):not([class*="error"]):not([class*="Error"]) {
  color: var(--fl-green);
}
html.loga-manual-modern a:not(.LG-Button):hover {
  text-decoration-color: var(--fl-green);
}

/* Buttons: runde Kanten, matte Oberflächen, klare Fokusringe */
html.loga-manual-modern .LG-Button {
  border-radius: 9px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: .1px;
  transition: background-color .16s ease, box-shadow .16s ease,
              border-color .16s ease, color .16s ease !important;
}
html.loga-manual-modern .LG-Button.primary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled) {
  background: linear-gradient(140deg, #218568, #176c59) !important;
  border-color: #339578 !important;
  color: #f9fffc !important;
  box-shadow: 0 3px 11px rgba(0, 0, 0, .23) !important;
}
html.loga-manual-modern .LG-Button.primary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled):hover,
html.loga-manual-modern .LG-Button.primary.LG-Button-up-hovering:not(.LG-Button-up-disabled),
html.loga-manual-modern .LG-Button.primary.LG-Button-down-hovering:not(.LG-Button-down-disabled) {
  background: linear-gradient(140deg, #2a9c7a, #1c8269) !important;
  box-shadow: 0 3px 14px rgba(38, 169, 129, .23) !important;
}
html.loga-manual-modern .LG-Button.secondary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled),
html.loga-manual-modern .LG-Button.tertiary:not(.LG-Button-up-disabled):not(.LG-Button-down-disabled) {
  background: #273545 !important;
  border-color: #405264 !important;
  color: #e6eff5 !important;
  box-shadow: none !important;
}
html.loga-manual-modern .LG-Button.secondary:not(.LG-Button-up-disabled):hover,
html.loga-manual-modern .LG-Button.tertiary:not(.LG-Button-up-disabled):hover,
html.loga-manual-modern .LG-Button.secondary.LG-Button-up-hovering,
html.loga-manual-modern .LG-Button.tertiary.LG-Button-up-hovering {
  background: #334657 !important;
  color: #fff !important;
}
html.loga-manual-modern .LG-Button.LG-Button-up-disabled,
html.loga-manual-modern .LG-Button.LG-Button-down-disabled {
  background: #26303b !important;
  border-color: #344050 !important;
  color: #8796a6 !important;
  box-shadow: none !important;
}

/* Eingabe-Widgets: natives und GWT-Markup */
html.loga-manual-modern input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="hidden"]),
html.loga-manual-modern textarea,
html.loga-manual-modern select,
html.loga-manual-modern .gwt-TextBox,
html.loga-manual-modern .gwt-combo-box,
html.loga-manual-modern .gwt-combo-box-input,
html.loga-manual-modern .LG-TextBox,
html.loga-manual-modern .LG-NumberBox {
  background-color: #202b39 !important;
  color: #e9f0f7 !important;
  border-color: #445668 !important;
  border-radius: 8px !important;
  caret-color: #74e6be !important;
  transition: border-color .16s ease, box-shadow .16s ease;
}
html.loga-manual-modern input::placeholder,
html.loga-manual-modern textarea::placeholder,
html.loga-manual-modern .gwt-TextBox::placeholder {
  color: #9cafbd !important;
  opacity: 1;
}
html.loga-manual-modern input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):focus-visible,
html.loga-manual-modern textarea:focus-visible,
html.loga-manual-modern select:focus-visible,
html.loga-manual-modern .LG-Button:focus-visible,
html.loga-manual-modern button:focus-visible {
  outline: 2px solid var(--fl-green) !important;
  outline-offset: 2px !important;
}
html.loga-manual-modern input:disabled:not([type="checkbox"]):not([type="radio"]),
html.loga-manual-modern textarea:disabled,
html.loga-manual-modern select:disabled {
  background: #1b242f !important;
  color: #8495a4 !important;
  border-color: #334251 !important;
}
html.loga-manual-modern input[type="checkbox"],
html.loga-manual-modern input[type="radio"] {
  accent-color: #3bbb92;
}

/* Tabellen: Zeilen und Kopfzeilen, ohne fachliche Statuszellen zu übermalen */
html.loga-manual-modern .LG-DataTableWidget {
  background: var(--fl-surface) !important;
  color: var(--fl-text) !important;
  border-color: var(--fl-line) !important;
}
html.loga-manual-modern .LG-DataTableHeader,
html.loga-manual-modern .LG-DataTableFooter,
html.loga-manual-modern .LG-DataTable-Header,
html.loga-manual-modern .LG-DataTable-Filter,
html.loga-manual-modern .LG-DataTable-SpanHeader {
  background: #283545 !important;
  color: #d5e2ec !important;
  border-color: var(--fl-line) !important;
}
html.loga-manual-modern .LG-DataTableEvenRow .LG-DataTableCell:not(.InBearbeitung):not([class*="Status"]):not([style*="background"]),
html.loga-manual-modern .LG-DataTableOddRow .LG-DataTableCell:not(.InBearbeitung):not([class*="Status"]):not([style*="background"]) {
  background-color: #192330 !important;
  color: var(--fl-text);
  border-bottom-color: #293747 !important;
}
html.loga-manual-modern .LG-DataTableOddRow .LG-DataTableCell:not(.InBearbeitung):not([class*="Status"]):not([style*="background"]) {
  background-color: #1c2835 !important;
}
html.loga-manual-modern .LG-DataTableHoveredRow:not(.LG-DataTableSelectedRow) .LG-DataTableCell:not([style*="background"]):not(.InBearbeitung) {
  background-color: #2b3b49 !important;
}
html.loga-manual-modern .LG-DataTableSelectedRow .LG-DataTableCell:not([style*="background"]):not(.InBearbeitung),
html.loga-manual-modern .LG-DataTableKeyboardSelectedRow .LG-DataTableCell:not([style*="background"]):not(.InBearbeitung) {
  background-color: #244a43 !important;
  color: #f0faf6 !important;
}
html.loga-manual-modern .LG-DataTable-HighlightSelection .LG-DataTableHeader-Selected,
html.loga-manual-modern .LG-DataTable-HighlightSelection .LG-DataTableHeader-Selected.LG-DataTable-SpanHeader {
  background: #286052 !important;
  color: #fff !important;
}
html.loga-manual-modern .LG-DataTablePreview .LG-DataTablePreviewCell,
html.loga-manual-modern .LG-DataTablePreview .LG-DataTablePreviewCell > div span:not(:first-child) {
  color: var(--fl-muted) !important;
}
html.loga-manual-modern .LG-DataTablePreviewDetail .LG-DataTablePreviewDetailCell:not(.LG-DataTableDetail) .LGDataTableDetailPanel,
html.loga-manual-modern .LG-DataTableDetail > .LGDataTableDetailPanel {
  background: #1d2a37 !important;
  color: var(--fl-text) !important;
}
html.loga-manual-modern .LG-TableHeadSettingsButtonWrapper {
  background: var(--fl-overlay) !important;
  color: var(--fl-text) !important;
  border: 1px solid var(--fl-line);
}

/* Abschnitte, Tabs und Listen */
html.loga-manual-modern .LG-Section .LG-Section-Header,
html.loga-manual-modern .LG-Section:nth-child(even) .LG-Section-Header,
html.loga-manual-modern .LG-Section.LG-Section-open > tbody > tr > td > a > .LG-Section-Header {
  background: #222e3c !important;
  border-color: #3a4e5c !important;
  color: #c6e8df !important;
}
html.loga-manual-modern .LG-Section .LG-Section-Header .LG-Section-Header-SubText {
  color: var(--fl-muted) !important;
}
html.loga-manual-modern .LG-Section.LG-BlockDesign.LG-Section-open .LG-Section-Header {
  background: #1c6d59 !important;
  color: #fff !important;
}
html.loga-manual-modern .LG-Section.LG-BlockDesign.LG-Section-closed .LG-Section-Header {
  background: #263342 !important;
  color: var(--fl-text) !important;
}
html.loga-manual-modern .gwt-TabLayoutPanel .gwt-TabLayoutPanelTabs {
  background-color: #161f2a !important;
  border-bottom: 1px solid var(--fl-line);
}
html.loga-manual-modern .gwt-TabLayoutPanel .gwt-TabLayoutPanelTabs .gwt-TabLayoutPanelTab {
  color: var(--fl-muted) !important;
  background: transparent !important;
  border-radius: 8px 8px 0 0;
}
html.loga-manual-modern .gwt-TabLayoutPanel .gwt-TabLayoutPanelTabs .gwt-TabLayoutPanelTab-selected {
  color: var(--fl-green) !important;
  background: #273a43 !important;
}
html.loga-manual-modern .MenuWrapper .LWMenuItemFirst .FirstLevelLabel {
  border-radius: 7px;
  transition: background-color .15s ease, color .15s ease;
}
html.loga-manual-modern .MenuWrapper .LWMenuItemFirst .FirstLevelLabel:hover {
  background: #294239 !important;
  color: #b6f3d9 !important;
}

/* Dialoge / Popups */
html.loga-manual-modern .LG-DialogBox,
html.loga-manual-modern .LG-ChangePassword-Dialog,
html.loga-manual-modern .LG-DialogLayout {
  background: #19232f !important;
  color: var(--fl-text) !important;
  border: 1px solid #455766 !important;
  border-radius: 14px !important;
  box-shadow: 0 22px 62px var(--fl-shadow) !important;
}
html.loga-manual-modern .LG-DialogBox .LG-DecoratedPanel-content,
html.loga-manual-modern .LG-DialogLayoutContent {
  background: #19232f !important;
  color: var(--fl-text) !important;
}
html.loga-manual-modern .LG-DialogLayoutHeader,
html.loga-manual-modern .LG-Dialog-Caption {
  background: #222f3d !important;
  color: var(--fl-text) !important;
  border-bottom: 1px solid var(--fl-line) !important;
}
html.loga-manual-modern .LG-DialogLayoutHeaderLabel,
html.loga-manual-modern .LG-DialogLayoutFooter-linkButton {
  color: var(--fl-green) !important;
}
html.loga-manual-modern .LG-DialogLayoutFooter,
html.loga-manual-modern .LG-PanelControls {
  border-top-color: var(--fl-line) !important;
}
html.loga-manual-modern .LG-PopupSection,
html.loga-manual-modern .LG-PopupSection-Header,
html.loga-manual-modern .gwt-PopupPanel:not(.LG-Tooltip) {
  background-color: var(--fl-surface);
  color: var(--fl-text);
  border-color: var(--fl-line);
}

/* Dezente Scrollbars (Chrome/Edge) */
html.loga-manual-modern ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
html.loga-manual-modern ::-webkit-scrollbar-track {
  background: #151e28;
}
html.loga-manual-modern ::-webkit-scrollbar-thumb {
  background: #3d5362;
  border: 2px solid #151e28;
  border-radius: 12px;
}
html.loga-manual-modern ::-webkit-scrollbar-thumb:hover {
  background: #5b7c85;
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
    console.info("Fancy LOGA: Midnight Emerald aktiviert. Nochmals anklicken = ausschalten.");
  } catch (error) {
    root.classList.remove(ROOT_CLASS);
    if (sheet && "adoptedStyleSheets" in document) {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== sheet);
    }
    if (styleTag) styleTag.remove();
    console.error("Fancy LOGA konnte das Theme nicht aktivieren:", error);
  }
})();
