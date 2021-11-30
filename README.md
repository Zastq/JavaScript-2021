# JavaScript
## Inlämmnigs Uppgifter

### Del 1 - Gästbok/forum

Du ska ha versionshantering med publikt GitHub-repo och att du ska kunna redovisa
regelbundna uppdateringar (minst fem under en tvåveckorsperiod) med kommentarer om
vad du har arbetat med. Detta dels för att redovisa hur du har jobbat med felsökning och
dels för att styrka att det är du själv som står bakom arbetet. Bifoga länk till ditt repo i
inlämningen

 - [ ] För betyget G krävs att den grundläggande funktionaliteten finns, dvs. att användare ska kunna skriva inlägg och se tidigare inlägg på sidan. 
 
 För VG krävs dessutom att

- [ ] Data ska sparas i JSON-format i textfil
- [ ] Formulären ska valideras på något sätt (t.ex. giltig e-postadress) med lämplig återkoppling till användare som gjort något fel.
- [ ] Ondskefull input ska hanteras, t.ex. genom att krokodilkäft < ska göras om till escape-sekvensen ”&lt;” för att förhindra att någon skriver in HTML-element eller skript på sidan.
- [ ]  Någon form av individuell prägel med kreativ funktionalitet ska finnas, t.ex. inloggningsfunktion eller upvotes/downvotes.
- [ ] Du bifogar en kort skriftlig rapport (pdf - helst inte Word) där du beskriver vad du har gjort för att hantera ovanstående punkter.

### Del 2 - Sockets

Bygg en chattapplikation med Node.js genom att gå igenom den tutorial
(https://socket.io/get-started/chat/) som finns på socket.io:s webbsida.
För G krävs att du har fått applikationen att fungera och att du har gjort någon av uppgifterna under rubriken ”Homework”.

För VG krävs att du har gjort minst fem (dvs. ytterligare fyra) av uppgifterna under rubriken ”Homework”;
- [ ] För VG behöver du dessutom bifoga en kort skriftlig rapport (pdf helst inte Word) där du förtydligar vilka av dessa uppgifter du har utfört.

Homework

- [ ] Broadcast a message to connected users when someone connects or disconnects.
- [ ] Add support for nicknames.
- [ ] Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
- [ ] Add “{user} is typing” functionality.
- [ ] Show who’s online.
- [ ] Add private messaging.
