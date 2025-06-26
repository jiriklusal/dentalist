# 🚀 GitHub Pages Deployment Guide

Tento průvodce vám ukáže, jak nasadit web Dentalist na GitHub Pages s automatickým přepnutím do produkčního módu.

## 📋 Přehled

Při vývoji používáte `DEBUG_MODE = true` (vývojový mód), ale pro produkční nasazení potřebujete `DEBUG_MODE = false`. Tento průvodce nabízí tři způsoby, jak toto automatizovat.

## 🎯 Co se změní při přepnutí do produkčního módu:

- ✅ `DEBUG_MODE = false`
- ✅ `RECAPTCHA_ENABLED = true` (automaticky)
- ✅ `SHOW_TEST_BUTTON = false` (automaticky)
- ✅ Všechny debug zprávy vypnuté (automaticky)

## 🛠️ Způsoby nasazení

### 1. 🤖 Automatické nasazení pomocí GitHub Actions (DOPORUČENO)

Soubor `.github/workflows/deploy.yml` je již připraven. Stačí:

1. **Pushněte kód na GitHub:**
   ```bash
   git add .
   git commit -m "Ready for GitHub Pages deployment"
   git push origin main
   ```

2. **Aktivujte GitHub Pages:**
   - Jděte do Settings > Pages
   - Source: "GitHub Actions"
   - Workflow se spustí automaticky

3. **Workflow automaticky:**
   - Změní `DEBUG_MODE = true` na `DEBUG_MODE = false`
   - Nasadí web na GitHub Pages
   - Zachová originální kód v repozitáři nezměněný

### 2. 🔧 Manuální build pomocí scriptu

#### Na Windows:
```cmd
# Spusťte build script
.\build-production.bat

# Potom pushněte změny
git add config.js
git commit -m "Switch to production mode"
git push origin main
```

#### Na Linux/Mac:
```bash
# Spusťte build script
chmod +x build-production.sh
./build-production.sh

# Potom pushněte změny
git add config.js
git commit -m "Switch to production mode"
git push origin main
```

### 3. ✋ Manuální změna

Jednoduše změňte v `config.js`:
```javascript
// Změňte toto:
const DEBUG_MODE = true;

// Na toto:
const DEBUG_MODE = false;
```

## 🔄 Návrat do vývojového módu

Po nasazení se můžete vrátit k vývoji:

```bash
# Manuálně změňte zpět nebo použijte:
git checkout config.js

# Nebo pomocí příkazu:
sed -i 's/const DEBUG_MODE = false;/const DEBUG_MODE = true;/g' config.js
```

## 📁 Struktura souborů pro nasazení

```
dentalist/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── build-production.sh         # Linux/Mac build script
├── build-production.bat        # Windows build script
├── config.js                   # Hlavní konfigurace
├── index.html                  # Hlavní stránka
├── style.css                   # Styly
├── script.js                   # JavaScript
└── img/                        # Obrázky
```

## ⚡ Rychlý start

1. **Nahrajte projekt na GitHub**
2. **Aktivujte GitHub Pages (Actions)**
3. **Pushněte změny - automatické nasazení se spustí**

## ✅ Ověření produkčního módu

Po nasazení zkontrolujte v konzoli prohlížeče:
```javascript
console.log(window.DentalistConfig.DEBUG_MODE); // false
console.log(window.DentalistConfig.RECAPTCHA_ENABLED); // true
console.log(window.DentalistConfig.SHOW_TEST_BUTTON); // false
```

## 🔍 Troubleshooting

**Problém:** GitHub Actions selhávají
**Řešení:** Zkontrolujte v Settings > Pages, zda je zdroj nastaven na "GitHub Actions"

**Problém:** reCAPTCHA nefunguje
**Řešení:** Zkontrolujte, zda je váš domain přidán v Google reCAPTCHA konzoli

**Problém:** Web se nenačítá
**Řešení:** Zkontrolujte Console v Developer Tools pro JavaScript chyby

## 📞 Podpora

Pro více informací si přečtěte:
- `CONFIG_GUIDE.md` - Kompletní konfigurace
- `RECAPTCHA_SETUP.md` - Nastavení reCAPTCHA
- `EMAILJS_SETUP.md` - Nastavení EmailJS
