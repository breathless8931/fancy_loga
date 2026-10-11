# Fancy LOGA – Midnight Emerald v4 (Diagnose)

Manuell aktivierbares dunkles Design für LOGA3 auf `tp.pi-asp.de`. Es verändert nur die Darstellung der Browserseite, nicht die LOGA3-Daten.

## Das Problem: ältere Version aus jsDelivr

jsDelivr cached GitHub-Branch-Verweise wie `@main` bis zu 12 Stunden. Die vorherige Bookmarklet-Version konnte dadurch noch ältere Theme-Dateien laden, obwohl das Repository längst aktualisiert wurde.

**Diagnoseversion v4:** Das Lesezeichen verwendet nun einen festen GitHub-Commit:

`a0c56707cc530c83458f3dda0b31ec8e24c457e3`

Damit ist eindeutig, welche Version geladen wird. Bei **zukünftigen Script-Updates** muss dieses Lesezeichen erneut aus der jeweils aktuellen [bookmarklet.txt](bookmarklet.txt) kopiert werden. Eine Alternative für später ist die `@main`-URL mit zeitverzögerten Updates.

## Installation und Diagnose

1. [bookmarklet.txt](bookmarklet.txt) öffnen, den **gesamten** Inhalt (ab `javascript:`) kopieren.
2. Das **bestehende** Lesezeichen `Fancy LOGA` bearbeiten und die **URL komplett ersetzen**.
3. LOGA3 vollständig neu laden, anmelden, dann das Lesezeichen anklicken.
4. Oben rechts erscheint ein kleines Feld, wenn tatsächlich **Fancy LOGA v4** ausgeführt wurde.
5. Die Meldung zeigt danach `DarkReader aktiv` oder eine Ladefehlermeldung.

- **Kein Versionsfeld:** Das neue Script wird nicht ausgeführt; Lesezeichen-URL und die Browserkonsole (F12) prüfen.
- **Versionsfeld, aber „DarkReader blockiert“:** Browser/CSP blockiert das externe Laden von `unpkg.com`.
- **Versionsfeld und „DarkReader aktiv“, aber noch grün:** Dann müssen wir direkt die betroffenen CSS-Elemente präziser überschreiben. Screenshot ohne Personen-/Personaldaten erstellen.

Ein weiterer Klick deaktiviert das Design, neu laden stellt den Originalzustand wieder her.

## Technik

- **DarkReader v4.9.58** wird zur flächendeckenden Farbumwandlung von `https://unpkg.com/darkreader@4.9.58/darkreader.js` geladen.
- Eigene CSS-Regeln kümmern sich um Dashboard, Tabellen, Buttons, Karten und Navigation.
- Dashboard-Variablen wie `--l3-dashboard-green-light` werden analog zur älteren [fancy_loga.js](fancy_loga.js) nun gezielt am `:root` mit hoher Priorität gesetzt und beim Deaktivieren wiederhergestellt.
- Keine Speicherung von persönlichen Einstellungen, kein Einstellungsmenü und keine GIF-/Bild-Hintergründe.

## Sicherheit

Das Repository ist öffentlich. Das Script lädt zusätzlich eine externe Bibliothek nach. Beide Skripte laufen im Browserkontext einer angemeldeten Anwendung und haben technisch Zugriff auf den Seiteninhalt. Daher keine unbekannten Updates blind ausführen, den GitHub-Account absichern und keine Screenshots mit personenbezogenen Daten veröffentlichen. Das Theme enthält keine eigene Logik zur Datenerfassung oder -übertragung, aber externe Requests zum Laden der Bibliotheken finden statt.

Nicht auf der realen angemeldeten Oberfläche getestet. Funktionen, Kalender, Statusfarben und Eingaben sorgfältig prüfen. Sicherheitsregeln der Seite (CSP) niemals umgehen.
