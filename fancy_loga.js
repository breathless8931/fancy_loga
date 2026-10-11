javascript:(async function(){
  // === Konfiguration / IDs / Keys ===
  const PANEL_ID = 'my-dashboard-panel-v3';
  const RESTORE_BTN_ID = 'my-dashboard-restore-v3';
  const DARKREADER_SCRIPT_ID = 'darkreader-script-v3';
  const STORAGE_KEY = 'my_dashboard_settings_v3';

  // === Hilfsfunktionen ===
  const log = (...a)=>console.log('dashboard-enhancer:',...a);
  const warn = (...a)=>console.warn('dashboard-enhancer:',...a);

  function parseColorToRgba(color, alpha = 1){
    if(!color) return `rgba(255,255,255,${alpha})`;
    color = color.trim();
    if(color[0] === '#'){
      let hex = color.slice(1);
      if(hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
      if(hex.length !== 6) return `rgba(255,255,255,${alpha})`;
      const bigint = parseInt(hex,16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r},${g},${b},${alpha})`;
    }
    const m = color.match(/rgba?\(\s*([0-9.]+)[^\d.]+([0-9.]+)[^\d.]+([0-9.]+)(?:[^\d.]+([0-9.]+))?\s*\)/i);
    if(m){
      const r = Math.round(parseFloat(m[1]));
      const g = Math.round(parseFloat(m[2]));
      const b = Math.round(parseFloat(m[3]));
      const a = (typeof m[4] !== 'undefined') ? parseFloat(m[4]) * alpha : alpha;
      return `rgba(${r},${g},${b},${Math.max(0,Math.min(1,a))})`;
    }
    try{
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.fillStyle = color;
      const computed = ctx.fillStyle;
      return parseColorToRgba(computed, alpha);
    }catch(e){}
    return `rgba(255,255,255,${alpha})`;
  }

  // === Selektoren ===
  const selectors = {
    primary: [".dashboard-widget",".newDATasks-container",".arrow",".icon-button",".quick-add-sd-wrapper"],
    secondary: [".dashboard-widget-footer",".timeproject-widget-footer",".delimiter-line",".terminal .online-terminal .online-terminal-container .terminal-delimiter",".smart-thing-container"],
    zero: [".PhotoWithtitlesStyle",".terminal-timer",".online-terminal .scroll-content svg",".calendar .DayPicker-Day--outside",".calendar .DayPicker-NavButton",".calendar .DayPicker-Weekday",".DayPicker-Day--today"],
    time: ["#dashboardPageRight > div > div:nth-child(6) > div.dashboard-widget-content > span > div > div.zeiten-container > section > div.scroll-content > div > div > div:nth-child(1)","#dashboardPageRight > div > div:nth-child(6) > div.dashboard-widget-content > span > div > div.zeiten-container > section > div.scroll-content > div > div > div:nth-child(3)"]
  };

  // === State & Storage ===
  let currentAlpha = 0.7;
  let transparencyActive = false;
  let darkActive = false;
  const originalMap = new WeakMap(); // stores {inlineBg, inlineBorderBottom, inlineBorderRight, inlineFill, computedBg}

  const STORAGE_KEY_LOCAL = STORAGE_KEY;
  function loadSettings(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY_LOCAL)) || {}; }catch(e){ return {}; }
  }
  function saveSettings(s){ try{ localStorage.setItem(STORAGE_KEY_LOCAL, JSON.stringify(s||{})); }catch(e){ warn('save failed',e); } }

  // === Capture / Restore helpers ===
  function captureElementOriginals(el){
    if(!el || originalMap.has(el)) return;
    const cs = getComputedStyle(el);
    const record = {
      inlineBg: el.style.backgroundColor || '',
      inlineBorderBottom: el.style.borderBottom || '',
      inlineBorderRight: el.style.borderRight || '',
      inlineFill: el.style.fill || '',
      computedBg: cs ? (cs.backgroundColor || '') : ''
    };
    originalMap.set(el, record);
  }

  function ensureCapturedForSelector(sel){
    document.querySelectorAll(sel).forEach(el => {
      try{ captureElementOriginals(el); }catch(e){}
    });
  }

  function captureAllKnown(){
    Object.values(selectors).flat().forEach(sel => ensureCapturedForSelector(sel));
  }

  function restoreElementOriginals(el){
    if(!el) return;
    const rec = originalMap.get(el);
    if(!rec){
      // if we never captured, just clear inline styles to let CSS decide
      el.style.backgroundColor = '';
      el.style.borderBottom = '';
      el.style.borderRight = '';
      el.style.fill = '';
      el.style.overflow = '';
      return;
    }
    // restore inline values (may be empty string)
    el.style.backgroundColor = rec.inlineBg || '';
    el.style.borderBottom = rec.inlineBorderBottom || '';
    el.style.borderRight = rec.inlineBorderRight || '';
    el.style.fill = rec.inlineFill || '';
    el.style.overflow = '';
  }

  // === Transparenzfunktionen (verwenden gespeicherte computedBg als Basis) ===
  function applyTransparency(alpha = 0.7){
    const a = Math.max(0, Math.min(1, +alpha));
    const b = Math.max(0, +(a - 0.2).toFixed(2));
    // primary
    selectors.primary.forEach(sel => {
      document.querySelectorAll(sel).forEach(e => {
        try{
          if(!originalMap.has(e)) captureElementOriginals(e);
          const rec = originalMap.get(e);
          const base = rec && rec.computedBg ? rec.computedBg : 'rgb(255,255,255)';
          e.style.backgroundColor = parseColorToRgba(base, a);
        }catch(err){}
      });
    });
    // secondary
    selectors.secondary.forEach(sel => {
      document.querySelectorAll(sel).forEach(e => {
        try{
          if(!originalMap.has(e)) captureElementOriginals(e);
          const rec = originalMap.get(e);
          const base = rec && rec.computedBg ? rec.computedBg : 'rgb(255,255,255)';
          e.style.backgroundColor = parseColorToRgba(base, b);
          if(sel.includes("terminal-delimiter")) e.style.borderBottom = `3px solid ${parseColorToRgba(getComputedStyle(e).color || 'rgb(255,255,255)', b)}`;
          if(sel.includes("delimiter-line")) e.style.overflow = "visible";
        }catch(err){}
      });
    });
    // zero
    selectors.zero.forEach(sel => {
      document.querySelectorAll(sel).forEach(e => {
        try{
          if(!originalMap.has(e)) captureElementOriginals(e);
          e.style.backgroundColor = "rgba(0,0,0,0)";
          if(e.tagName === "svg" || e.tagName === "SVG") e.style.fill = "none";
        }catch(err){}
      });
    });
    // time
    selectors.time.forEach(sel => {
      document.querySelectorAll(sel).forEach(e => {
        try{
          if(!originalMap.has(e)) captureElementOriginals(e);
          e.style.backgroundColor = "rgba(0,0,0,0)";
          e.style.borderRight = `2px solid ${parseColorToRgba('rgb(239,239,239)', a)}`;
        }catch(err){}
      });
    });
  }

  function resetTransparency(){
    // restore using stored inline originals (not computed ones)
    Object.entries(selectors).forEach(([key,list])=>{
      if(key === "zero") {
        list.forEach(sel => document.querySelectorAll(sel).forEach(e => {
          try{ restoreElementOriginals(e); }catch(e){}
        }));
        return;
      }
      list.forEach(sel => {
        document.querySelectorAll(sel).forEach(e => {
          try{ restoreElementOriginals(e); }catch(err){}
        });
      });
    });
  }

  // === DarkReader loader (idempotent) ===
  async function ensureDarkReader(){
    if(window.DarkReader) return true;
    if(document.getElementById(DARKREADER_SCRIPT_ID)){
      for(let i=0;i<20;i++){
        if(window.DarkReader) return true;
        await new Promise(r=>setTimeout(r,150));
      }
      return !!window.DarkReader;
    }
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.id = DARKREADER_SCRIPT_ID;
      script.src = "https://unpkg.com/darkreader@4.9.58/darkreader.js";
      script.onload = () => { log('DarkReader geladen'); resolve(true); };
      script.onerror = () => { warn('DarkReader konnte nicht geladen werden'); resolve(false); };
      document.head.appendChild(script);
    });
  }

  // === Dashboard reference & original CSS var ===
  const dashboard = document.querySelector(".dashboard-view .dashboard-layout");
  if(!dashboard){ warn(".dashboard-layout nicht gefunden. Abbruch."); return; }
  const root = document.documentElement;
  const originalBottomColor = (() => { try{ return getComputedStyle(root).getPropertyValue("--l3-dashboard-green-light").trim(); }catch(e){ return ''; } })();

  // === Background helper ===
  const backgrounds = [
    {name:"🌀 Original", url:"https://i.pinimg.com/originals/1b/45/63/1b456377a9dce67a7dc3630260aa7572.gif"},
    {name:"🏙 Urban", url:"https://c.tenor.com/_zbsJOBoVOEAAAAd/tenor.gif"}
  ];
  function setBackground(url){
    if(!url) return;
    dashboard.style.backgroundImage = `url("${url}")`;
    dashboard.style.backgroundSize = "cover";
    dashboard.style.backgroundPosition = "center center";
    dashboard.style.backgroundRepeat = "no-repeat";
    dashboard.style.backgroundBlendMode = "normal";
    dashboard.style.backgroundColor = "#000";
    dashboard.style.position = "relative";
    log("Hintergrund gesetzt:", url);
  }

  // === Persistenz helpers ===
  function loadSettingsLocal(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }catch(e){ return {}; } }
  function saveSettingsLocal(s){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(s||{})); }catch(e){ warn('save failed',e); } }

  // === UI creation (idempotent) ===
  function createPanel(){
    if(document.getElementById(PANEL_ID)) return document.getElementById(PANEL_ID);
    const panel = document.createElement('div');
    panel.id = PANEL_ID;
    Object.assign(panel.style, {
      position: "fixed", top: "20px", right: "20px", zIndex: "9999",
      background: "#1e1e1e", padding: "16px", borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.6)", fontFamily: "Segoe UI, sans-serif",
      color: "#eee", width: "340px", lineHeight: "1.4"
    });

    function sectionTitle(text){
      const el = document.createElement('div');
      el.textContent = text;
      el.style.fontWeight = "bold";
      el.style.margin = "12px 0 6px";
      el.style.borderBottom = "1px solid #444";
      el.style.paddingBottom = "4px";
      return el;
    }

    function colorPicker(label, cssVar){
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = "10px";
      const lbl = document.createElement('label');
      lbl.textContent = label;
      lbl.style.display = "block";
      lbl.style.marginBottom = "4px";
      const input = document.createElement('input');
      input.type = "color";
      try{ input.value = getComputedStyle(root).getPropertyValue(cssVar).trim() || "#00ff00"; }catch(e){ input.value = "#00ff00"; }
      input.style.width = "100%"; input.style.height = "32px"; input.style.border = "none"; input.style.borderRadius = "6px"; input.style.cursor = "pointer";
      input.oninput = () => { root.style.setProperty(cssVar, input.value); const s = loadSettingsLocal() || {}; s.mainColor = input.value; saveSettingsLocal(s); };
      wrapper.appendChild(lbl); wrapper.appendChild(input); return {wrapper, input};
    }

    panel.appendChild(sectionTitle("🎞 Hintergrund wählen"));
    backgrounds.forEach(bg => {
      const btn = document.createElement('button');
      btn.textContent = bg.name;
      Object.assign(btn.style, {margin:"4px 0", padding:"8px 12px", border:"none", borderRadius:"6px", cursor:"pointer", background:"#2e2e2e", color:"#fff", width:"100%", textAlign:"left"});
      btn.onmouseover = () => btn.style.background = "#444";
      btn.onmouseout = () => btn.style.background = "#2e2e2e";
      btn.onclick = () => { setBackground(bg.url); const s = loadSettingsLocal() || {}; s.background = bg.url; saveSettingsLocal(s); };
      panel.appendChild(btn);
    });

    const customBtn = document.createElement('button');
    customBtn.textContent = "🔗 Manuelle URL eingeben";
    Object.assign(customBtn.style, {margin:"6px 0", padding:"8px 12px", border:"none", borderRadius:"6px", cursor:"pointer", background:"#007acc", color:"#fff", width:"100%", fontWeight:"bold"});
    customBtn.onclick = () => {
      const url = prompt("Bitte gib die Bild- oder GIF-URL ein:");
      if(url){ setBackground(url); const s = loadSettingsLocal() || {}; s.background = url; saveSettingsLocal(s); }
      else log("Keine URL eingegeben.");
    };
    panel.appendChild(customBtn);

    panel.appendChild(sectionTitle("🎨 Farben ändern"));
    const cp = colorPicker("Main Color","--main-green-color");
    panel.appendChild(cp.wrapper);

    panel.appendChild(sectionTitle("🌓 Dark Mode"));
    const darkToggle = document.createElement('button');
    darkToggle.textContent = "🌙 Dark Mode aktivieren";
    Object.assign(darkToggle.style, {margin:"6px 0", padding:"8px 12px", border:"none", borderRadius:"6px", cursor:"pointer", background:"#444", color:"#fff", width:"100%", fontWeight:"bold"});
    darkToggle.onclick = async () => {
      darkActive = !darkActive;
      const s = loadSettingsLocal() || {};
      s.darkActive = darkActive;
      saveSettingsLocal(s);
      if(darkActive){
        // capture originals before enabling dark mode so we have pre-dark values
        captureAllKnown();
        const ok = await ensureDarkReader();
        try{ if(ok && window.DarkReader) DarkReader.enable({brightness:100,contrast:90,sepia:10}); }catch(e){ warn('DarkReader.enable() failed', e); }
        root.style.setProperty("--l3-dashboard-green-light","#242525");
        darkToggle.textContent = "☀️ Dark Mode deaktivieren";
        if(transparencyActive){ resetTransparency(); applyTransparency(currentAlpha); }
      } else {
        try{ if(window.DarkReader) DarkReader.disable(); }catch(e){ warn('DarkReader.disable() failed', e); }
        // wait a short moment for DarkReader to revert styles, then restore originals
        setTimeout(()=>{
          if(originalBottomColor) root.style.setProperty("--l3-dashboard-green-light", originalBottomColor);
          // restore inline originals for all captured elements
          originalMapCleanupAndRestore();
          // if transparency was active before, reapply using stored computed bases (which were captured pre-dark)
          if(transparencyActive) applyTransparency(currentAlpha);
        }, 250);
        darkToggle.textContent = "🌙 Dark Mode aktivieren";
      }
    };
    panel.appendChild(darkToggle);

    panel.appendChild(sectionTitle("🌫 Transparenz"));
    const transparencyToggle = document.createElement('button');
    transparencyToggle.textContent = "✨ Transparenz aktivieren";
    Object.assign(transparencyToggle.style, {margin:"6px 0", padding:"8px 12px", border:"none", borderRadius:"6px", cursor:"pointer", background:"#444", color:"#fff", width:"100%", fontWeight:"bold"});
    transparencyToggle.onclick = () => {
      transparencyActive = !transparencyActive;
      const s = loadSettingsLocal() || {};
      s.transparencyActive = transparencyActive;
      saveSettingsLocal(s);
      if(transparencyActive){
        // ensure we captured originals BEFORE changing anything
        captureAllKnown();
        applyTransparency(currentAlpha);
        transparencyToggle.textContent = "❌ Transparenz deaktivieren";
      } else {
        resetTransparency();
        transparencyToggle.textContent = "✨ Transparenz aktivieren";
      }
    };
    panel.appendChild(transparencyToggle);

    // Opacity slider
    const sliderWrapper = document.createElement('div');
    sliderWrapper.style.marginTop = "8px";
    const sliderLabel = document.createElement('div');
    sliderLabel.textContent = `Opacity: ${Math.round(currentAlpha*100)}%`;
    sliderLabel.style.marginBottom = "6px";
    const slider = document.createElement('input');
    slider.type = "range"; slider.min = "0"; slider.max = "100"; slider.value = String(Math.round(currentAlpha*100)); slider.style.width = "100%";
    slider.oninput = () => {
      const val = Number(slider.value)/100;
      currentAlpha = val;
      sliderLabel.textContent = `Opacity: ${Math.round(currentAlpha*100)}%`;
      const s = loadSettingsLocal() || {}; s.currentAlpha = currentAlpha; saveSettingsLocal(s);
      if(transparencyActive) applyTransparency(currentAlpha);
    };
    sliderWrapper.appendChild(sliderLabel); sliderWrapper.appendChild(slider); panel.appendChild(sliderWrapper);

    // Buttons row
    const btnRow = document.createElement('div'); btnRow.style.display = "flex"; btnRow.style.gap = "8px"; btnRow.style.marginTop = "12px";
    const minimizeBtn = document.createElement('button'); minimizeBtn.textContent = "🔽 Minimieren"; Object.assign(minimizeBtn.style, {flex:"1", background:"transparent", color:"#aaa", border:"none", fontSize:"14px", cursor:"pointer", textDecoration:"underline"});
    minimizeBtn.onclick = ()=>{ panel.style.display = "none"; const rb = document.getElementById(RESTORE_BTN_ID); if(rb) rb.style.display = "block"; };
    const clearBtn = document.createElement('button'); clearBtn.textContent = "🧹 Reset Einstellungen"; Object.assign(clearBtn.style, {flex:"1", padding:"8px", border:"none", borderRadius:"6px", cursor:"pointer", background:"#6b6b6b", color:"#fff"});
    clearBtn.onclick = ()=>{ if(confirm("Einstellungen zurücksetzen?")){ localStorage.removeItem(STORAGE_KEY); location.reload(); } };
    const destroyBtn = document.createElement('button'); destroyBtn.textContent = "❌ Entfernen"; Object.assign(destroyBtn.style, {flex:"1", padding:"8px", border:"none", borderRadius:"6px", cursor:"pointer", background:"#a33", color:"#fff"});
    destroyBtn.onclick = ()=>{ if(confirm("Panel entfernen und Änderungen zurücksetzen?")) window.__my_dashboard_destroy_v3 && window.__my_dashboard_destroy_v3(); };
    btnRow.appendChild(minimizeBtn); btnRow.appendChild(clearBtn); btnRow.appendChild(destroyBtn); panel.appendChild(btnRow);

    document.body.appendChild(panel);
    return {panel, darkToggle, transparencyToggle, slider, sliderLabel, colorInput: cp.input};
  }

  function ensureRestoreButton(){
    if(document.getElementById(RESTORE_BTN_ID)) return document.getElementById(RESTORE_BTN_ID);
    const restoreBtn = document.createElement('button');
    restoreBtn.id = RESTORE_BTN_ID;
    restoreBtn.textContent = "⚙️ Menü öffnen";
    Object.assign(restoreBtn.style, {position:"fixed", top:"20px", right:"20px", zIndex:"9998", padding:"8px 12px", borderRadius:"8px", border:"none", background:"#007acc", color:"#fff", fontWeight:"bold", cursor:"pointer", display:"none"});
    restoreBtn.onclick = ()=>{ const panel = document.getElementById(PANEL_ID); if(panel){ panel.style.display = "block"; restoreBtn.style.display = "none"; } };
    document.body.appendChild(restoreBtn);
    return restoreBtn;
  }

  // helper to restore all captured elements (used after disabling DarkReader)
  function originalMapCleanupAndRestore(){
    // iterate over captured elements and restore inline originals
    // WeakMap doesn't allow iteration; we will re-query selectors and restore each element individually
    Object.values(selectors).flat().forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        try{ restoreElementOriginals(el); }catch(e){}
      });
    });
  }

  // === MutationObserver mit Debounce (erfasst neue Elemente on-demand) ===
  if(!window.__my_dashboard_observer_installed_v3){
    const observer = new MutationObserver(() => {
      if(window.__my_dashboard_observer_timer_v3) clearTimeout(window.__my_dashboard_observer_timer_v3);
      window.__my_dashboard_observer_timer_v3 = setTimeout(() => {
        try{
          // capture newly added elements if transparency active so we can apply consistent transparency
          if(transparencyActive){
            captureAllKnown();
            applyTransparency(currentAlpha);
          }
        }catch(e){}
      }, 250);
    });
    observer.observe(document.body, {childList:true, subtree:true});
    window.__my_dashboard_observer_ref_v3 = observer;
    window.__my_dashboard_observer_installed_v3 = true;
  }

  // === Aufräumfunktion ===
  window.__my_dashboard_destroy_v3 = function(){
    try{
      if(window.__my_dashboard_observer_ref_v3){
        try{ window.__my_dashboard_observer_ref_v3.disconnect(); }catch(e){}
        window.__my_dashboard_observer_ref_v3 = null;
        window.__my_dashboard_observer_installed_v3 = false;
      }
      const panel = document.getElementById(PANEL_ID); if(panel) panel.remove();
      const restore = document.getElementById(RESTORE_BTN_ID); if(restore) restore.remove();
      try{ if(window.DarkReader) DarkReader.disable(); }catch(e){}
      if(originalBottomColor) root.style.setProperty("--l3-dashboard-green-light", originalBottomColor);
      // restore captured originals
      originalMapCleanupAndRestore();
      resetTransparency();
      const s = document.getElementById(DARKREADER_SCRIPT_ID); if(s) s.remove();
      log("Aufgeräumt: Panel entfernt, DarkReader deaktiviert (falls aktiv).");
    }catch(e){ warn("Fehler beim Aufräumen", e); }
  };

  // === Initialisierung: Panel erstellen, Einstellungen laden und anwenden ===
  const uiRefs = createPanel();
  ensureRestoreButton();

  const saved = loadSettingsLocal() || {};
  if(saved.background) setBackground(saved.background);
  if(saved.mainColor) try{ root.style.setProperty("--main-green-color", saved.mainColor); if(uiRefs && uiRefs.colorInput) uiRefs.colorInput.value = saved.mainColor; }catch(e){}
  if(typeof saved.currentAlpha === 'number') { currentAlpha = saved.currentAlpha; if(uiRefs && uiRefs.slider){ uiRefs.slider.value = String(Math.round(currentAlpha*100)); if(uiRefs.slider.previousSibling) uiRefs.slider.previousSibling.textContent = `Opacity: ${Math.round(currentAlpha*100)}%`; } }
  if(saved.transparencyActive){ transparencyActive = true; if(uiRefs && uiRefs.transparencyToggle) uiRefs.transparencyToggle.textContent = "❌ Transparenz deaktivieren"; captureAllKnown(); applyTransparency(currentAlpha); }
  if(saved.darkActive){ darkActive = true; if(uiRefs && uiRefs.darkToggle) uiRefs.darkToggle.textContent = "☀️ Dark Mode deaktivieren"; (async()=>{ captureAllKnown(); const ok = await ensureDarkReader(); try{ if(ok && window.DarkReader) DarkReader.enable({brightness:100,contrast:90,sepia:10}); }catch(e){ warn('DarkReader.enable() fehlgeschlagen', e); } root.style.setProperty("--l3-dashboard-green-light","#242525"); })(); }

  log("Bookmarklet initialisiert (Fix für DarkMode/Transparenz Reihenfolge).");
})();
