# 🎛️ Dentalist - Konfigurační soubor

Tento dokument popisuje nový konfigurační soubor `config.js`, který obsahuje všechny nastavitelné proměnné pro web Dentalist.

## 📋 Přehled

Místo hledání nastavení napříč kódem, nyní máte všechny důležité konfigurace na jednom místě v souboru `config.js`.

## 🎯 Rychlé nastavení

### 🧪 Pro testování/development:
```javascript
const RECAPTCHA_ENABLED = false;
const SHOW_TEST_BUTTON = true;
const DEBUG_MODE = true;
```

### 🚀 Pro produkční nasazení:
```javascript
const RECAPTCHA_ENABLED = true;
const SHOW_TEST_BUTTON = false;
const DEBUG_MODE = false;
```

## 📖 Kategorie nastavení

### 🔒 reCAPTCHA
- `RECAPTCHA_ENABLED` - Zapnutí/vypnutí reCAPTCHA
- `RECAPTCHA_SITE_KEY` - Google reCAPTCHA Site Key
- `RECAPTCHA_THEME` - Téma (light/dark)

### 📧 EmailJS
- `EMAILJS_PUBLIC_KEY` - Veřejný klíč EmailJS
- `EMAILJS_SERVICE_ID` - ID služby EmailJS
- `EMAILJS_TEMPLATE_ID` - ID template EmailJS
- `TARGET_EMAIL` - Cílový email pro zprávy

### 🧪 Testování
- `SHOW_TEST_BUTTON` - Zobrazení testovacího tlačítka
- `TEST_DATA` - Testovací data pro formulář

### 🔧 Development
- `DEBUG_MODE` - Zapnutí debug režimu
- `EMAILJS_DEBUG` - Debug pro EmailJS
- `FORM_DEBUG` - Debug pro formulář
- `RECAPTCHA_DEBUG` - Debug pro reCAPTCHA

### 🌐 Jazyk
- `DEFAULT_LANGUAGE` - Výchozí jazyk (cs/en)
- `SAVE_LANGUAGE_PREFERENCE` - Uložení volby jazyka

### 🎨 UI/UX
- `MESSAGE_AUTO_HIDE_DELAY` - Doba zobrazení zpráv (ms)
- `SCROLL_ANIMATIONS_ENABLED` - Animace při scrollu
- `SMOOTH_SCROLLING_ENABLED` - Plynulý scroll
- `NAVIGATION_OFFSET` - Offset pro navigaci (px)

### 📱 Responsive
- `MOBILE_BREAKPOINT` - Breakpoint pro mobil (px)
- `AUTO_CLOSE_MOBILE_MENU` - Auto zavření menu

### 🚀 Performance
- `SCROLL_THROTTLE_DELAY` - Throttling scroll (ms)
- `LAZY_LOADING_ENABLED` - Lazy loading obrázků
- `SERVICE_WORKER_ENABLED` - Service Worker

### 📊 Analytics
- `TRACK_BUTTON_CLICKS` - Sledování kliknutí
- `TRACK_CONTACT_CLICKS` - Sledování kontaktů
- `GOOGLE_ANALYTICS_ID` - Google Analytics ID

## 🎛️ Helper funkce

### Kontrola produkčního režimu:
```javascript
window.DentalistConfig.isProduction()
// true pokud je vše nastaveno pro produkci
```

### Kontrola připravenosti pro produkci:
```javascript
window.DentalistConfig.isProductionReady()
// true pokud jsou všechna nastavení správná pro produkci
```

### Výpis současné konfigurace:
```javascript
window.DentalistConfig.printCurrentConfig()
// Vypíše současné nastavení do konzole
```

## 📁 Struktura souborů

```
dentalist/
├── config.js          ← NOVÝ - všechna nastavení zde
├── script.js           ← používá config.js
├── index.html          ← načítá config.js před script.js
├── style.css
└── dokumentace/
    ├── EMAILJS_SETUP.md
    ├── RECAPTCHA_SETUP.md
    ├── RECAPTCHA_TOGGLE.md
    └── CONFIG_GUIDE.md  ← tento soubor
```

## ⚠️ Produkční checklist

Před nasazením do produkce zkontrolujte:

1. ✅ `RECAPTCHA_ENABLED = true`
2. ✅ `SHOW_TEST_BUTTON = false`
3. ✅ `DEBUG_MODE = false`
4. ✅ `EMAILJS_DEBUG = false`
5. ✅ `FORM_DEBUG = false`
6. ✅ `RECAPTCHA_DEBUG = false`

**Rychlá kontrola:**
```javascript
// V konzoli prohlížeče spusťte:
window.DentalistConfig.isProductionReady()
// Mělo by vrátit true
```

## 🔧 Jak používat

### 1. Otevřete `config.js`
Všechna nastavení najdete v tomto souboru s komentáři.

### 2. Upravte podle potřeby
Změňte hodnoty konstant podle vašeho prostředí.

### 3. Uložte a otestujte
Obnovte stránku a zkontrolujte konzoli.

## 🆘 Řešení problémů

### Chyba: "DentalistConfig is not defined"
- Zkontrolujte, zda je `config.js` načten před `script.js` v HTML
- Obnovte cache prohlížeče (Ctrl+F5)

### Testovací tlačítko se nezobrazuje
- Zkontrolujte `SHOW_TEST_BUTTON = true` v config.js
- Ověřte, že je `DEBUG_MODE = true`

### reCAPTCHA nefunguje
- Zkontrolujte `RECAPTCHA_ENABLED = true`
- Ověřte správnost `RECAPTCHA_SITE_KEY`
- Zkontrolujte konzoli pro chyby

### EmailJS neodesílá
- Zkontrolujte `EMAILJS_SERVICE_ID` a `EMAILJS_TEMPLATE_ID`
- Ověřte `EMAILJS_PUBLIC_KEY`
- Zapněte `EMAILJS_DEBUG = true` pro detailní logy

## 📞 Podpora

Pro další pomoc zkontrolujte:
- Konzoli prohlížeče (F12)
- Existující dokumentaci (EMAILJS_SETUP.md, RECAPTCHA_SETUP.md)
- Spusťte `window.DentalistConfig.printCurrentConfig()` pro debug

---

**💡 Tip:** Všechny změny v `config.js` se projeví po obnovení stránky!
