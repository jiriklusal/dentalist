# 🎯 Dentalist - Quick Configuration Overview

## 📁 Files
- **`config.js`** - All settings
- **`script.js`** - Uses config.js
- **`index.html`** - Loads config.js

## ⚡ SUPER FAST SWITCHING - ONE VARIABLE!

### 🔧 Development Mode
```javascript
// In config.js - line 14:
const DEBUG_MODE = true;
```
**Automatically sets:**
- ❌ reCAPTCHA disabled
- ✅ Test button shown
- ✅ Debug outputs enabled

### 🚀 Production Mode
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

## ⚠️ Before Production Deployment

1. **Open** `config.js`
2. **Set** `DEBUG_MODE = false` (line 14)
3. **Save** the file
4. **Open console** (F12)
5. **Run:** `window.DentalistConfig.isProductionReady()`
6. **Should return:** `true`

## 🎯 New System Benefits

- ✅ **One variable** controls everything
- ✅ **No errors** when switching modes
- ✅ **Automatic configuration** of all related values
- ✅ **You can't forget** any setting

## 📖 Plná dokumentace

Viz `CONFIG_GUIDE.md` pro kompletní návod.
