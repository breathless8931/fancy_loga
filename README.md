# Fancy LOGA

Manuell aktivierbares, rein optisches Design für **LOGA3**.

- Farben, Navigation, Buttons, Tabellen, Felder und Dialoge werden per CSS angepasst.
- Kein Umbau der Anwendung, keine fachlichen Datenänderungen.
- Kein automatischer Start. Ein Klick aktiviert, ein weiterer Klick deaktiviert das Design.
- Ein Neuladen der Seite stellt die normale Ansicht wieder her.
- Die Originalressourcen aus „Save all resources“ werden **nicht** veröffentlicht.

## Lesezeichen (Chrome / Edge)

1. In Chrome/Edge ein neues Lesezeichen anlegen (z. B. `Fancy LOGA`).
2. Als **URL** den vollständigen Inhalt von [bookmarklet.txt](bookmarklet.txt) einfügen (er beginnt mit `javascript:`).
3. In LOGA3 unter `https://tp.pi-asp.de/loga3/` anmelden.
4. Das Lesezeichen anklicken. Nochmals anklicken = Design ausschalten.

Das Lesezeichen lädt die JavaScript-Datei von [jsDelivr](https://cdn.jsdelivr.net/gh/breathless8931/fancy_loga@main/LOGA3_Modernisieren.js), das die Datei aus dem öffentlichen GitHub-Repository auf `main` bereitstellt. Anpassungen an `LOGA3_Modernisieren.js` können nach dem CDN-Cache-Refresh über dasselbe Lesezeichen verteilt werden.

## Falls das Lesezeichen nicht funktioniert

Manche Seiten erlauben durch ihre **Content Security Policy (CSP)** keine externen Skripte. Dann kann das Bookmarklet das Script nicht nachladen. Das ist keine Fehlfunktion von LOGA3; die CSP sollte nicht umgangen oder deaktiviert werden.

Als Alternative in Chrome/Edge: **F12 → Quellen/Sources → Snippets** öffnen, ein Snippet mit dem Inhalt von `LOGA3_Modernisieren.js` erstellen und es mit **Strg+Enter** manuell ausführen. Das Bookmarklet wurde noch nicht auf einer echten angemeldeten LOGA3-Seite getestet.

## Sicherheit

⚠️ **Wichtig:** Dieses öffentliche Repository enthält ausführbaren JavaScript-Code. Wer einen externen Script-Loader auf einer angemeldeten Webseite benutzt, gibt dem jeweils geladenen Code Zugriff auf die Webseite. Daher Codeänderungen vor der Nutzung prüfen und GitHub-Konto absichern. Das Script selbst macht **keine** Netzwerkaufrufe, liest keine Personaldaten und speichert nichts.

Es werden absichtlich keine lokalen LOGA3-Ressourcen, HTML-Kopien, Cookies, Screenshots, Tokens oder vertraulichen Daten in dieses Repository hochgeladen.
