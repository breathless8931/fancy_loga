# Fancy LOGA — Midnight Emerald

Ein **manuell aktivierbares Dark Theme** für die Oberfläche von LOGA3 auf tp.pi-asp.de.

## Was wird verändert?

- Dunkle Anthrazit- und Blautöne für Flächen, Tabellen, Abschnitte und Dialoge
- Grüne Akzente für Navigation, Buttons und aktive Elemente
- Verbesserter Kontrast für Eingabefelder, Beschriftungen und Text
- Optische Details: Schatten, abgerundete Ecken und Hover-Effekte

**Nur CSS:** keine Änderungen an Funktionen, Serverdaten, Formularwerten oder Positionen. Spezialansichten (z. B. komplexe Dienstplanraster oder Diagramme) können noch helle Bereiche enthalten und benötigen eventuell gezielte Anpassungen.

## Lesezeichen installieren

1. Öffne [bookmarklet.txt](bookmarklet.txt) und kopiere den **gesamten** Inhalt ab \`javascript:\`.
2. Erstelle in Chrome/Edge ein Lesezeichen mit dem Namen \`Fancy LOGA\`.
3. Füge den Code in das **URL-Feld** des Lesezeichens ein.
4. Melde dich auf \`https://tp.pi-asp.de/loga3/\` an und klicke auf das Lesezeichen.

**Ein Klick:** Dark Theme an. **Noch ein Klick:** aus. **Browser neu laden:** normales LOGA3-Design.

### Updates

Das Bookmarklet verweist auf die Datei [LOGA3_Modernisieren.js](LOGA3_Modernisieren.js), die über [jsDelivr](https://www.jsdelivr.com/) von GitHub geladen wird. Du musst das Lesezeichen nach Designanpassungen normalerweise nicht ändern. Wegen CDN-Caching kann eine neue Version zeitverzögert erscheinen.

### Wenn nichts passiert

Die Website kann externe Skripte über eine **Content Security Policy (CSP)** blockieren. CSP nicht deaktivieren oder umgehen. Alternativ den Inhalt von \`LOGA3_Modernisieren.js\` in **F12 → Sources/Quellen → Snippets** einfügen und manuell ausführen.

## Datenschutz und Sicherheit

Das Repo ist **öffentlich**. Die gespeicherten LOGA3-Originaldateien, Screenshots, Personalinformationen oder Tokens dürfen nicht mit hochgeladen werden.

Das Script selbst lädt nichts nach und versendet keine Daten. **Das Bookmarklet lädt allerdings externen ausführbaren Code**, der beim Ausführen theoretisch vollständigen Zugriff auf die angemeldete Webseite hätte. Deshalb Änderungen am Repository prüfen und das GitHub-Konto absichern.

Nicht in der produktiven Bedienung als garantiert fehlerfrei getestet. Bei schlecht lesbaren Feldern oder Sonderansichten bitte Screenshot **ohne personenbezogene Daten** verwenden.
