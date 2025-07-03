# 🎨 Dentalist Theme System - Quick Setup Guide

## ✅ Co bylo implementováno

Byl vytvořen modulární systém témat, který umožňuje snadné přidávání nových témat:

### 📁 Struktura souborů
```
css/
├── variables.css      # ✅ Všechny CSS proměnné pro všechna témata
├── base.css          # ✅ Základní styly (theme-agnostic)
├── components.css    # ✅ Komponenty používající CSS proměnné
├── theme-light.css   # ✅ Světlé téma (výchozí)
├── theme-dark.css    # ✅ Tmavé téma
├── theme-blue.css    # ✅ Modré téma (ukázka)
├── theme-purple.css  # ✅ Fialové téma (ukázka)
└── theme-selector.css # 📦 Volitelný multi-theme selector
```

### 🔧 Systém funguje pomocí:
- **CSS custom properties** (proměnné) pro všechny barvy
- **`data-theme` atribut** na `<body>` elementu 
- **Atributové selektory** `[data-theme="název"]` v CSS
- **JavaScript API** pro správu témat

## 🚀 Jak používat

### Základní přepínání témat
```javascript
// Získání aktuálního tématu
const theme = window.DentalistTheme.getCurrentTheme();

// Nastavení tématu
window.DentalistTheme.setTheme('dark');

// Dostupná témata
window.DentalistTheme.THEMES.LIGHT   // 'light'
window.DentalistTheme.THEMES.DARK    // 'dark'  
window.DentalistTheme.THEMES.BLUE    // 'blue'
window.DentalistTheme.THEMES.PURPLE  // 'purple'
```

### HTML struktura
```html
<!-- Body s data-theme atributem -->
<body data-theme="light">

<!-- CSS v pořadí: Variables → Base → Components → Theme -->
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/theme-light.css" id="theme-stylesheet">

<!-- Tlačítko pro přepínání -->
<button id="theme-toggle">
    <i class="fas fa-moon"></i>
</button>
```

## ➕ Přidání nového tématu

### 1. CSS proměnné
Přidejte do `css/variables.css`:
```css
[data-theme="green"] {
    --primary-color: #10b981;
    --bg-primary: #f0fdf4;
    --text-primary: #064e3b;
    /* ... všechny potřebné proměnné */
}
```

### 2. Theme-specific styly  
Vytvořte `css/theme-green.css`:
```css
[data-theme="green"] {
    /* Specifické styly pro zelené téma */
}

[data-theme="green"] .some-element {
    /* Theme-specific overrides */
}
```

### 3. JavaScript
Aktualizujte `THEMES` objekt:
```javascript
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    BLUE: 'blue', 
    PURPLE: 'purple',
    GREEN: 'green'  // ← Nové téma
};
```

### 4. (Volitelně) Multi-theme selector
Pro více než 2 témata použijte `theme-selector-example.html`.

## 🎯 Best Practices

### ✅ Doporučuje se:
- Používat sémantické názvy proměnných (`--text-primary`)
- Definovat všechny proměnné pro každé téma
- Testovat přístupnost (kontrast barev)
- Používat pouze CSS proměnné v komponentách

### ❌ Vyhněte se:
- Hardcoded barvám v komponentách
- Používání class selektorů pro témata
- Přeskakování CSS proměnných

## 🔍 Troubleshooting

### Téma nefunguje?
1. ✅ Zkontrolujte pořadí CSS souborů
2. ✅ Ověřte `data-theme` atribut na body
3. ✅ Zkontrolujte, že jsou definované všechny CSS proměnné
4. ✅ Ověřte konzoli pro JavaScript chyby

### Přepínání nefunguje?
1. ✅ Zkontrolujte `id="theme-toggle"` na tlačítku
2. ✅ Ověřte, že je JavaScript načtený
3. ✅ Zkontrolujte `window.DentalistTheme` v konzoli

## 📚 Dokumentace

Úplná dokumentace: [`THEME_SYSTEM.md`](./THEME_SYSTEM.md)

## 🎨 Dostupná témata

| Téma | ID | Popis |
|------|-----|-------|
| 🌞 Světlé | `light` | Výchozí světlé téma |
| 🌙 Tmavé | `dark` | Tmavé téma pro noční použití |
| 🔵 Modré | `blue` | Modré téma (ukázka) |
| 🟣 Fialové | `purple` | Fialové téma (ukázka) |

---

**Systém je připraven k použití! 🚀**

Pro jednoduché light/dark přepínání funguje stávající tlačítko automaticky.
Pro více témat implementujte multi-theme selector z `theme-selector-example.html`.
