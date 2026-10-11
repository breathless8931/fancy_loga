# Fancy LOGA – Midnight Emerald

Ein manuell aktivierbares Dark Theme für die LOGA3-Oberfläche auf `tp.pi-asp.de`.

## Technik

- **DarkReader 4.9.58** als Basis für die automatische Dunkelfärbung dynamischer LOGA3-Komponenten.
- Ergänzende, gezielte CSS-Regeln für Dashboard-Hintergrund, Kacheln, Kalender, Schnellzugriffsleiste, Buttons und Tabellen.
- Die Selektoren `.dashboard-view .dashboard-layout`, `.dashboard-widget` und `.quick-add-sd-wrapper` sowie die DarkReader-Idee stammen aus der älteren, vom Nutzer bereitgestellten Datei [fancy_loga.js](fancy_loga.js).
- Kein Einstellungsmenü, keine Bild-/GIF-Hintergründe, kein Speichern von Konfigurationen im Browser.
- Die Anwendung selbst und alle fachlichen Daten bleiben unverändert; es werden nur Darstellungsregeln im Browser verändert.

## Bookmarklet nutzen

1. Den gesamten Inhalt von [bookmarklet.txt](bookmarklet.txt) kopieren (beginnt mit `javascript:`).
2. In Chrome/Edge ein Lesezeichen namens **Fancy LOGA** erstellen und den Code als URL einfügen.
3. LOGA3 unter `https://tp.pi-asp.de/loga3/` öffnen und anmelden.
4. Bookmarklet anklicken: Design ein. Nochmals anklicken: Design aus. Nach einem Neuladen: ursprüngliches Design.

Das Lesezeichen lädt die aktuelle Datei [LOGA3_Modernisieren.js](LOGA3_Modernisieren.js) über jsDelivr von GitHub. **Der Bookmarklet-Code muss für dieses Update nicht geändert werden.** CDN-Caches können Aktualisierungen verzögern.

## Externe Abhängigkeit

Das Design-Script lädt die JavaScript-Bibliothek [DarkReader 4.9.58](https://unpkg.com/darkreader@4.9.58/darkreader.js) von **unpkg.com**, falls sie nicht bereits geladen ist. Das entspricht dem bewährten Ansatz aus der älteren Datei `fancy_loga.js`. DarkReader manipuliert Styles im Browser und überwacht Änderungen an der Seite. Sollte DarkReader nicht ladbar sein (z. B. CSP/Netzwerk), bleiben die eigenen CSS-Anpassungen aktiv, allerdings können dann weiterhin helle Bereiche zu sehen sein.

**Sicherheit:** Das GitHub-Repository ist öffentlich, und mit dem Bookmarklet wird fremd gehosteter JavaScript-Code im Kontext einer angemeldeten Anwendung ausgeführt. Prüfe Änderungen vor der Verwendung, sichere das GitHub-Konto ab und nutze ausschließlich vertrauenswürdige Abhängigkeiten. Der Bookmarklet-Loader fordert den Code vom GitHub-CDN an, das Theme fordert DarkReader von unpkg an. Das Theme enthält keine fachlichen Datenzugriffe, keine eigene Datenerfassung und keine Übertragung von LOGA3-Daten an andere Dienste. Externe Bibliotheken haben technisch trotzdem Zugriff auf den Seitenkontext, sobald sie ausgeführt werden.

## Falls etwas nicht richtig aussieht

- Seite neu laden und das Bookmarklet erneut anklicken.
- **F12 → Konsole** öffnen: „Fancy LOGA: Dark Theme inkl. DarkReader aktiv“ zeigt die erfolgreiche Initialisierung. Warnungen zeigen Ladefehler.
- Bei einem Kontrastfehler einen Screenshot ohne personenbezogene Daten machen. Die Feinabstimmung erfolgt pro betroffener Ansicht.
- Wenn LOGA3 das Nachladen von Skripten per CSP verhindert, Sicherheitsrichtlinien **nicht umgehen oder deaktivieren**.

Die Darstellung ist noch nicht in der angemeldeten produktiven Oberfläche getestet. Insbesondere Statusfarben, Kalender und komplexe Tabellen vor der alltäglichen Nutzung prüfen.