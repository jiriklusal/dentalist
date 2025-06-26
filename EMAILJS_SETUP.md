# EmailJS Setup Instructions - ŘEŠENÍ CHYBY

## 🔥 AKTUÁLNÍ PROBLÉM: Service ID not found

Chyba "The service ID not found" znamená, že Service ID `service_xidpurm` neexistuje ve vašem EmailJS účtu.

## ⚡ RYCHLÉ ŘEŠENÍ:

### 1. Přihlaste se do EmailJS Dashboard
- Jděte na: https://dashboard.emailjs.com/admin
- Přihlaste se svým účtem

### 2. Zkontrolujte/Vytvořte Email Service
- V levém menu klikněte na "Email Services"
- Pokud nevidíte žádnou službu, klikněte "Add New Service"
- Vyberte Gmail (nebo jiný provider)
- Postupujte podle instrukcí
- **DŮLEŽITÉ**: Poznamenejte si správné **Service ID** (např. `service_abc123`)

### 3. Zkontrolujte/Vytvořte Email Template
- V levém menu klikněte na "Email Templates"  
- Pokud nevidíte template, klikněte "Create New Template"
- **DŮLEŽITÉ**: Poznamenejte si správné **Template ID** (např. `template_xyz789`)

### 4. Aktualizujte kód v script.js

Najděte řádky (cca 376-377) a nahraďte správnými hodnotami:

```javascript
const serviceId = 'VAŠE_SPRÁVNÉ_SERVICE_ID';     // Místo 'service_xidpurm'
const templateId = 'VAŠE_SPRÁVNÉ_TEMPLATE_ID';   // Místo 'template_f0w827z'
```

### 5. Email Template obsah
V EmailJS template použijte tyto proměnné:

```
Subject: Nová zpráva z kontaktního formuláře: {{subject}}

Od: {{from_name}} ({{from_email}})
Telefon: {{phone}}
Předmět: {{subject}}

Zpráva:
{{message}}

---
Tato zpráva byla odeslána z kontaktního formuláře na webu Dentalist.
```

## 📋 Kontrolní seznam:

- [ ] Mám EmailJS účet a jsem přihlášen
- [ ] Vytvořil jsem Email Service a mám správné Service ID
- [ ] Vytvořil jsem Email Template a mám správné Template ID  
- [ ] Aktualizoval jsem Service ID a Template ID v script.js
- [ ] Template obsahuje správné proměnné ({{from_name}}, {{from_email}}, atd.)
- [ ] Otestoval jsem formulář

## 🚨 Časté chyby:

1. **Service ID neexistuje** - Vytvořte novou službu v EmailJS
2. **Template ID neexistuje** - Vytvořte nový template
3. **Špatné proměnné v template** - Použijte {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
4. **Nepropojený email provider** - Zkontrolujte připojení k Gmail/Outlook

Po opravě by měl formulář fungovat správně!
