# Dentalist Theme System Documentation

## Přehled

Dentalist website používá modulární systém témat, který umožňuje snadné přidávání nových témat a udržování kódu. Systém je postavený na CSS custom properties (proměnné) a data atributech.

## Struktura souborů

```
css/
├── variables.css     # Všechny CSS proměnné pro všechna témata
├── base.css         # Základní styly (reset, layout, typography)
├── components.css   # Komponenty používající CSS proměnné
├── theme-light.css  # Světlé téma (výchozí)
├── theme-dark.css   # Tmavé téma
└── theme-blue.css   # Příklad třetího témata
```

## Jak funguje systém

### 1. CSS Proměnné
Všechny barvy a hodnoty jsou definované jako CSS custom properties v `variables.css`:

```css
:root, [data-theme="light"] {
  --primary-color: #4a5568;
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
  /* ... další proměnné */
}

[data-theme="dark"] {
  --primary-color: #4db8ff;
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  /* ... další proměnné */
}
```

### 2. Data atribut
Aktuální téma je řízeno pomocí `data-theme` atributu na `<body>` elementu:

```html
<body data-theme="light">  <!-- Světlé téma -->
<body data-theme="dark">   <!-- Tmavé téma -->
<body data-theme="blue">   <!-- Modré téma -->
```

### 3. CSS selektory
Všechny theme-specific styly používají atributové selektory:

```css
[data-theme="dark"] .some-element {
  background-color: var(--bg-primary);
}
```

## Pořadí načítání CSS

Je důležité zachovat správné pořadí načítání CSS souborů:

```html
<link rel="stylesheet" href="css/variables.css">   <!-- 1. Proměnné -->
<link rel="stylesheet" href="css/base.css">        <!-- 2. Základní styly -->
<link rel="stylesheet" href="css/components.css">  <!-- 3. Komponenty -->
<link rel="stylesheet" href="css/theme-light.css"> <!-- 4. Aktuální téma -->
```

## JavaScript API

### Základní použití
```javascript
// Získání aktuálního tématu
const currentTheme = window.DentalistTheme.getCurrentTheme();

// Nastavení tématu
window.DentalistTheme.setTheme('dark');

// Dostupná témata
const themes = window.DentalistTheme.THEMES;
// { LIGHT: 'light', DARK: 'dark', BLUE: 'blue' }
```

### Automatické přepínání
Systém automaticky:
- Ukládá vybrané téma do localStorage
- Aktualizuje ikonu tlačítka
- Mění reCAPTCHA téma
- Dynamicky přepíná CSS soubor tématu

## Přidání nového tématu

### 1. Vytvořte CSS proměnné
Přidejte nové proměnné do `css/variables.css`:

```css
[data-theme="purple"] {
  --primary-color: #8b5cf6;
  --bg-primary: #faf5ff;
  /* ... všechny potřebné proměnné */
}
```

### 2. Vytvořte theme-specific styly
Vytvořte nový soubor `css/theme-purple.css`:

```css
[data-theme="purple"] {
  /* Specifické styly pro fialové téma */
}

[data-theme="purple"] .some-element {
  /* Theme-specific overrides */
}
```

### 3. Aktualizujte JavaScript
Přidejte nové téma do seznamu:

```javascript
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  BLUE: 'blue',
  PURPLE: 'purple'  // Nové téma
};
```

### 4. Aktualizujte přepínací logiku
Pokud chcete cyklické přepínání více témat, upravte toggle logiku v `script.js`.

## Best Practices

### CSS Proměnné
- Používejte sémantické názvy (`--text-primary` místo `--color-dark`)
- Definujte všechny proměnné pro každé téma
- Seskupujte související proměnné dohromady

### Nová témata
- Vždy definujte všechny potřebné CSS proměnné
- Testujte všechny komponenty a stavy
- Dbejte na přístupnost (kontrast barev)

### Komponenty
- Používejte pouze CSS proměnné pro barvy
- Vyhněte se hardcoded barvám v komponentách
- Komponenty by měly být theme-agnostic

## Troubleshooting

### Téma se nezobrazuje správně
1. Zkontrolujte pořadí CSS souborů
2. Ověřte, že jsou definované všechny potřebné proměnné
3. Zkontrolujte data-theme atribut na body elementu

### JavaScript chyby
1. Ověřte, že je theme toggle button v HTML (`id="theme-toggle"`)
2. Zkontrolujte konzoli pro JavaScript chyby
3. Ujistěte se, že je window.DentalistTheme dostupný

### Nové téma nefunguje
1. Zkontrolujte názvy v THEMES objektu
2. Ověřte, že CSS soubor existuje
3. Zkontrolujte CSS selektory (`[data-theme="název"]`)

## Migrace ze starého systému

Pokud migrujete ze starého `body.dark-theme` systému:

1. **CSS**: Změňte `body.dark-theme` na `[data-theme="dark"]`
2. **JavaScript**: Změňte `classList.add/remove` na `setAttribute('data-theme')`
3. **HTML**: Přidejte `data-theme="light"` na body element
4. **Testování**: Otestujte všechny komponenty v obou tématech

## Výhody modulárního systému

- **Rozšiřitelnost**: Snadné přidávání nových témat
- **Udržovatelnost**: Oddělené concerns, čitelnější kód
- **Performance**: Dynamické načítání pouze potřebných stylů
- **Flexibilita**: Možnost více současných témat pro různé sekce
- **Debugging**: Snadnější identifikace theme-specific problémů
