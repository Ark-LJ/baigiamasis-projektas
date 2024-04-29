# VCS Baigiamasis Darbas

## Frontend ir Server instaliacija

### Instaliacija
1. Pasidaryti repozitorijos kloną:
   ```bash
   git clone <repozitorijos-linkas>
   ```
2. Atidaryti frontend folderį terminale:
   ```bash
   cd frontend
   ```
3. Instaliuoti reikalingas bibliotekas frontend daliai:
   ```bash
   npm install
   ```
4. Atidaryti naujame terminale server folderį:
   ```bash
   cd server
   ```
5. Instaliuoti reikalingas bibliotekas serveriui:
   ```bash
   npm install
   ```

### Paleidimas
- Paleisti serverį (serverio folderio terminale):
  ```bash
  npm run dev
  ```
- Paleisti frontend (frontend folderio terminale):
  ```bash
  npm start
  ```

### E2E Testavimas su Cypress
- Run tests:
  ```bash
  npx cypress open
  ```