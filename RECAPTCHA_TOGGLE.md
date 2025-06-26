# reCAPTCHA Zapnutí/Vypnutí - Návod

Byla přidána možnost jednoduše zapnout nebo vypnout reCAPTCHA pomocí jedné konstanty v JavaScriptu.

## 🔧 Jak vypnout/zapnout reCAPTCHA

### Vypnutí reCAPTCHA

V souboru `script.js` na **řádku 2** najděte:

```javascript
const RECAPTCHA_ENABLED = true; // Změňte na false pro vypnutí reCAPTCHA
```

Změňte na:

```javascript
const RECAPTCHA_ENABLED = false; // reCAPTCHA je vypnutá
```

### Zapnutí reCAPTCHA

Změňte zpět na:

```javascript
const RECAPTCHA_ENABLED = true; // reCAPTCHA je zapnutá
```

## ✅ Co se stane při vypnutí

Když je `RECAPTCHA_ENABLED = false`:

1. **reCAPTCHA widget se skryje** - checkbox "I'm not a robot" se nezobrazí
2. **Validace se přeskočí** - formulář se odešle bez kontroly reCAPTCHA
3. **Chybové hlášky se skryjí** - "Prosím potvrďte, že nejste robot" se nezobrazí
4. **Template parametry** - reCAPTCHA response se nepřidává do EmailJS
5. **Console log** - zobrazí se "🔒 reCAPTCHA je vypnutá"

Když je `RECAPTCHA_ENABLED = true`:

1. **reCAPTCHA widget se zobrazí** - checkbox "I'm not a robot" je viditelný
2. **Validace je aktivní** - formulář vyžaduje potvrzení reCAPTCHA
3. **Chybové hlášky fungují** - zobrazí se při nepotvrzené reCAPTCHA
4. **Template parametry** - reCAPTCHA response se přidává do EmailJS
5. **Console log** - zobrazí se "🛡️ reCAPTCHA je zapnutá"

## 🧪 Testování s testovacími daty

Testovací tlačítko "🧪 Vyplnit testovací data" automaticky detekuje stav reCAPTCHA:

- **reCAPTCHA zapnutá**: "Testovací data byla vyplněna. Nyní potvrďte reCAPTCHA a můžete otestovat odeslání. (reCAPTCHA: zapnutá)"
- **reCAPTCHA vypnutá**: "Testovací data byla vyplněna. reCAPTCHA je vypnutá - můžete rovnou otestovat odeslání. (reCAPTCHA: vypnutá)"

## 🎯 Použití

### Kdy vypnout reCAPTCHA:
- **Během vývoje a testování** - pro rychlejší testování formuláře
- **Pro interní systémy** - kde není riziko spamu
- **Dočasně při problémech** - pokud má Google reCAPTCHA výpadek

### Kdy zapnout reCAPTCHA:
- **Na produkčním webu** - pro ochranu před spamem
- **Veřejné formuláře** - kde hrozí automatizované útoky
- **Finální nasazení** - před spuštěním webu

## ⚠️ Důležité poznámky

1. **Nezapomeňte zapnout** reCAPTCHA před produkčním nasazením!
2. **reCAPTCHA klíče** - i když je reCAPTCHA vypnutá, site key zůstává v HTML
3. **Bezpečnost** - vypnutá reCAPTCHA znamená žádnou ochranu před spamem
4. **CSS třídy** - `.recaptcha-disabled` se automaticky přidává/odebírá

## 🔍 Jak zkontrolovat aktuální stav

1. **Otevřete konzoli prohlížeče** (F12)
2. **Obnovte stránku**
3. **Najděte log zprávu**:
   - "🛡️ reCAPTCHA je zapnutá" = aktivní
   - "🔒 reCAPTCHA je vypnutá" = neaktivní

## 📝 Technické detaily

### CSS selektory:
```css
.recaptcha-disabled .g-recaptcha {
    display: none !important;
}

.recaptcha-disabled #recaptcha-error {
    display: none !important;
}
```

### JavaScript kontrola:
```javascript
if (RECAPTCHA_ENABLED) {
    // reCAPTCHA logika
} else {
    // Přeskočit reCAPTCHA
}
```

Toto řešení umožňuje rychlé a pohodlné přepínání reCAPTCHA bez úprav HTML nebo CSS! 🚀
