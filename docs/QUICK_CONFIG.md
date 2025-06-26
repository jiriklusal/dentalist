# 🎯 Dentalist - Rychlý přehled konfigurace

## 📁 Soubory
- **`config.js`** - Všechna nastavení
- **`script.js`** - Používá config.js
- **`index.html`** - Načítá config.js

## ⚡ SUPER RYCHLÉ PŘEPÍNÁNÍ - JEDNA PROMĚNNÁ!

### 🔧 Development režim
```javascript
// V config.js - řádek 14:
const DEBUG_MODE = true;
```
**Automaticky nastaví:**
- ❌ reCAPTCHA vypnuta
- ✅ Testovací tlačítko zobrazeno
- ✅ Debug výpisy zapnuty

### 🚀 Production režim
```javascript
// V config.js - řádek 14:
const DEBUG_MODE = false;
```
**Automaticky nastaví:**
- ✅ reCAPTCHA zapnuta
- ❌ Testovací tlačítko skryto
- ❌ Debug výpisy vypnuty

## 🎮 Console příkazy

```javascript
// Kontrola konfigurace
window.DentalistConfig.printCurrentConfig()

// Kontrola produkční připravenosti (nyní stačí DEBUG_MODE = false)
window.DentalistConfig.isProductionReady()

// Přístup k nastavení
window.DentalistConfig.RECAPTCHA_ENABLED  // automaticky !DEBUG_MODE
window.DentalistConfig.SHOW_TEST_BUTTON   // automaticky DEBUG_MODE
```

## 🛠️ Manuální nastavení (pokud potřebujete)

Některá nastavení můžete stále upravit ručně:

```javascript
// EmailJS
const EMAILJS_SERVICE_ID = "service_lfqx5fh";
const TARGET_EMAIL = "jiri.klusal@gmail.com";

// Testovací data
const TEST_DATA = {
  firstName: 'Jan',
  // ...
};

// UI/UX
const MESSAGE_AUTO_HIDE_DELAY = 5000;
```

## ⚠️ Před produkčním nasazením

1. **Otevřete** `config.js`
2. **Nastavte** `DEBUG_MODE = false` (řádek 14)
3. **Uložte** soubor
4. **Otevřete konzoli** (F12)
5. **Spusťte:** `window.DentalistConfig.isProductionReady()`
6. **Mělo by vrátit:** `true`

## 🎯 Výhody nového systému

- ✅ **Jedna proměnná** ovládá vše
- ✅ **Žádné chyby** při přepínání režimů
- ✅ **Automatické nastavení** všech souvisejících hodnot
- ✅ **Nemůžete zapomenout** na některé nastavení

## 📖 Plná dokumentace

Viz `CONFIG_GUIDE.md` pro kompletní návod.
