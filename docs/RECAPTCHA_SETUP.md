# Google reCAPTCHA Setup Instructions

Google reCAPTCHA byla přidána do kontaktního formuláře pro ochranu před spamem a automatizovanými útoky.

## 🔧 Nastavení Google reCAPTCHA

### 1. Registrace reCAPTCHA

1. Jděte na: https://www.google.com/recaptcha/admin/create
2. Přihlaste se pomocí Google účtu
3. Vyplňte formulář:
   - **Label**: Dentalist Website
   - **reCAPTCHA type**: Vyberte "reCAPTCHA v2" > "I'm not a robot" Checkbox
   - **Domains**: Přidejte vaši doménu (např. `dentalist.cz`, `www.dentalist.cz`)
   - Pro testování můžete přidat také: `localhost`, `127.0.0.1`

### 2. Získání klíčů

Po vytvoření dostanete:
- **Site Key** (veřejný klíč) - bude vidět v HTML
- **Secret Key** (tajný klíč) - používá se na serveru

### 3. Aktualizace kódu

V souboru `index.html` najděte řádek (cca 497):
```html
<div class="g-recaptcha" data-sitekey="6LfYourSiteKeyHere" data-theme="light"></div>
```

Nahraďte `6LfYourSiteKeyHere` vaším skutečným **Site Key**.

### 4. Testování

1. Otevřete web v prohlížeči
2. Vyplňte kontaktní formulář
3. Zaškrtněte "I'm not a robot"
4. Klikněte "Odeslat zprávu"

## 🎯 Aktuální implementace

### Co je implementováno:
✅ reCAPTCHA v2 checkbox widget  
✅ Validace před odesláním formuláře  
✅ Responsivní design (škálování na mobilech)  
✅ Automatické resetování po úspěšném odeslání  
✅ Chybové hlášky v češtině a angličtině  
✅ Integrace s EmailJS  

### Vlastnosti:
- **Typ**: reCAPTCHA v2 (checkbox)
- **Téma**: Light (světlé)
- **Pozice**: Nad tlačítkem "Odeslat zprávu"
- **Validace**: Povinná pro odeslání formuláře
- **Chybová hláška**: "Prosím potvrďte, že nejste robot."

## 🔒 Bezpečnostní výhody

1. **Ochrana před spamem** - Automatické zprávy budou zablokovány
2. **Ochrana před boty** - Roboti nebudou moci odeslat formulář
3. **Ochrana před útoky** - Zabránění automatizovaným útokům
4. **Google Analytics** - Google poskytuje statistiky o útocích

## 📱 Responsivní design

reCAPTCHA se automaticky přizpůsobí velikosti obrazovky:
- **Desktop**: Normální velikost
- **Tablet**: Zmenšeno na 85%
- **Mobil**: Zmenšeno na 75%

## ⚠️ Možné problémy

### 1. reCAPTCHA se nezobrazuje
- Zkontrolujte, že máte správný Site Key
- Ověřte, že je doména správně nastavená v Google Admin Console
- Zkontrolujte internetové připojení

### 2. Chyba "Invalid site key"
- Site Key není správný nebo doména není povolená
- Jděte do Google reCAPTCHA Admin Console a zkontrolujte nastavení

### 3. reCAPTCHA je příliš velká na mobilu
- CSS obsahuje automatické škálování
- Pokud je stále příliš velká, můžete upravit `transform: scale()` hodnoty

## 🧪 Testování s testovacími daty

Po kliknutí na "🧪 Vyplnit testovací data":
1. Formulář se vyplní testovacími údaji
2. **Musíte stále ručně potvrdit reCAPTCHA**
3. Poté můžete kliknout "Odeslat zprávu"

## 📊 Google reCAPTCHA Admin

V Admin Console můžete sledovat:
- Počet úspěšných verificí
- Počet zablokovaných pokusů
- Analýzu bezpečnostních hrozeb
- Statistiky používání

Přístup: https://www.google.com/recaptcha/admin

Po dokončení nastavení bude váš formulář chráněn před spamem a automatizovanými útoky! 🛡️
