# UEK-223-Group-6-Frontend

## How to Setup Project

### Preconditions
Please make sure that you **restart the backend** before executing the tests.

### Running the Postman Collection
You will find the Postman collection in the backend repository.

1. Open Postman.
2. Click on Import and select the entire "postman" directory (not to be confused with the ".postman" one).
3. Postman will automatically import the collection and the environment configuration.

If either the collection or the environment is not visible, you most likely selected the wrong directory.
![postman.png](frontend_react/public/postman.png)

4. In the top right corner, select the imported environment.  
   The run will not work if no environment is selected.
5. Click on the three dots next to the collection and choose Run.
![postman2.png](frontend_react/public/postman2.png)

6. Do not change any settings and click the orange button “Run UEK-223-Group_6”.
7. After the run is finished, you will see the success rate of the tests.

## Checkliste

### Punkte (Frontend-relevant)
- Dokumentation: ___ / 4
- Testing: ___ / 5
- Umsetzung / Code: ___ / 8

### Frontend - Setup
- [ ] React startet ohne Fehler
- [ ] TypeScript ohne Compile-Errors
- [ ] API Base URL konfiguriert
- [ ] Login funktioniert (JWT gespeichert)

### Routing & Views
- [ ] Route fuer Custom List vorhanden
- [ ] User View (eigene Eintraege)
- [ ] Admin View (alle Eintraege)

### Custom List - Use-Cases (Frontend)

#### UC1 Create Listeneintrag
- [ ] Formular mit Titel, Text, Wichtigkeit
- [ ] Client-Validation (Titel min 3, Text max 500)
- [ ] Submit Button disabled bei Fehlern
- [ ] Erfolgsmeldung sichtbar

#### UC2 Update Listeneintrag
- [ ] Edit View oder Modal vorhanden
- [ ] Felder vorbefuellt
- [ ] Client-Validation greift
- [ ] Erfolgsmeldung sichtbar

#### UC3 Delete Listeneintrag
- [ ] Delete Button vorhanden
- [ ] Bestätigungsdialog
- [ ] Erfolgsmeldung nach Loeschung

#### UC4 User sieht eigene Eintraege
- [ ] Liste nur eigene Eintraege
- [ ] Pagination 10
- [ ] Sortierung Wichtigkeit Datum Titel
- [ ] Filter Wichtigkeit

#### UC5 Admin sieht alle Eintraege
- [ ] Admin erkennt Admin View
- [ ] Liste aller User-Eintraege
- [ ] Pagination 10
- [ ] Sortierung User Wichtigkeit Datum
- [ ] Filter User oder Wichtigkeit
- [ ] Admin kann Eintraege loeschen

### Error Handling
- [ ] API Errors werden angezeigt
- [ ] Validation Errors sichtbar
- [ ] 401 fuehrt zu Redirect Login
- [ ] 403 Meldung sichtbar
