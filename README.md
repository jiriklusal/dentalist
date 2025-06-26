# 🦷 Dentalist - Modern Responsive Dental Practice Website

Modern responsive website for Dentalist dental practice in Hlučín with advanced features and dark mode support.

🌐 **Live Demo**: [https://jiriklusal.github.io/dentalist/](https://jiriklusal.github.io/dentalist/)

## ✨ Key Features

- 🌙 **Dark/Light Theme** - Theme switcher with persistence
- 🌍 **Bilingual Support** - Czech and English with auto-save
- 📱 **Fully Responsive** - Optimized for mobile, tablet and desktop
- 🛡️ **Anti-Spam Protection** - Complete protection against bots and spam
- 📧 **Functional Contact Form** - EmailJS + reCAPTCHA integration
- 🎨 **Modern Design** - Clean, professional appearance
- ⚡ **High Performance** - Speed and SEO optimization
- 🔧 **Simple Configuration** - One variable for dev/production

## 🏗️ Project Structure

```
dentalist/
├── 📄 index.html           # Main HTML file
├── 🎨 style.css            # CSS styles and responsive design
├── ⚙️ script.js            # JavaScript functionality
├── 🔧 config.js            # All configuration in one place
├── 🤖 robots.txt           # SEO and anti-bot rules
├── 🗺️ sitemap.xml          # SEO sitemap
├── 🖼️ img/                 # Images and assets
└── 📚 docs/                # Documentation
    ├── QUICK_CONFIG.md     # Quick setup (5 minutes)
    ├── CONFIG_GUIDE.md     # Complete configuration
    ├── EMAILJS_SETUP.md    # EmailJS setup
    ├── RECAPTCHA_SETUP.md  # reCAPTCHA setup
    └── more...
```

## 🚀 Quick Start

### 1. **Development Mode (Testing)**
```javascript
// In config.js set:
const DEBUG_MODE = true;
```
✅ reCAPTCHA disabled, test button shown, debug enabled

### 2. **Production Mode (Deployment)**
```javascript
// In config.js set:
const DEBUG_MODE = false;
```
✅ reCAPTCHA enabled, test button hidden, debug disabled

### 3. **Verify Configuration**
```javascript
// In browser console (F12):
window.DentalistConfig.isProductionReady()
// Returns true if everything is ready for production
```

## 🌟 Advanced Features

### 🌙 **Dark/Light Theme**
- Navigation switcher with 🌙/☀️ icons
- Automatic user preference saving
- Complete support across all sections
- Mobile optimization

### 🛡️ **Anti-Spam Protection**
- Email obfuscation against spam bots
- Honeypot fields to catch robots
- Rate limiting (max 3 attempts per 5 minutes)
- Suspicious behavior detection
- reCAPTCHA with automatic theme switching

### 📧 **Intelligent Contact Form**
- EmailJS integration for sending
- Environment-based routing (dev/production)
- Real-time field validation
- Localized error messages
- Automatic test button (dev mode)

### 🌍 **Full Localization**
- Czech/English with automatic saving
- Flag switcher in navigation
- Localized forms and messages
- SEO optimization for both languages

### 📱 **Responsive Design**
- Mobile-first approach
- Optimization for all breakpoints
- Mobile menu with hamburger icon
- Touch-friendly controls

## 🛠️ Technologies

- **HTML5** - Semantic markup + Schema.org structured data
- **CSS3** - Grid, Flexbox, custom properties, dark mode
- **Vanilla JavaScript** - No dependencies, fast loading
- **EmailJS** - Serverless email sending
- **Google reCAPTCHA v3** - Advanced anti-spam protection
- **Font Awesome** - Professional icons (CDN)
- **Google Fonts** - Inter font family (CDN)

## 🌟 Pokročilé funkce

### 🌙 **Tmavý/světlý režim**
- Přepínač v navigaci s ikonami 🌙/☀️
- Automatické ukládání volby uživatele
- Kompletní podpora ve všech sekcích
- Mobilní optimalizace

### 🛡️ **Anti-spam ochrana**
- Email obfuskace proti spam botům
- Honeypot pole pro lapání robotů
- Rate limiting (max 3 pokusy za 5 minut)
- Detekce podezřelého chování
- reCAPTCHA s automatickým přepínáním témat

### 📧 **Inteligentní kontaktní formulář**
- EmailJS integrace pro odesílání
- Environment-based routing (dev/produkce)
- Real-time validace polí
- Lokalizované chybové zprávy
- Automatické testovací tlačítko (dev mode)

### 🌍 **Plná lokalizace**
- Česky/anglicky s automatickým ukládáním
- Přepínač vlajek v navigaci
- Lokalizované formuláře a zprávy
- SEO optimalizace pro oba jazyky

### 📱 **Responzivní design**
- Mobile-first přístup
- Optimalizace pro všechny breakpointy
- Mobilní menu s hamburger ikonou
- Touch-friendly ovládání

## 🛠️ Technologie

- **HTML5** - Sémantické značkování + Schema.org strukturovaná data
- **CSS3** - Grid, Flexbox, custom properties, dark mode
- **Vanilla JavaScript** - Žádné závislosti, rychlé načítání
- **EmailJS** - Serverless odesílání emailů
- **Google reCAPTCHA v3** - Pokročilá anti-spam ochrana
- **Font Awesome** - Profesionální ikony (CDN)
- **Google Fonts** - Inter font family (CDN)

## � SEO & Performance

- ✅ **Schema.org** strukturovaná data (dentist, business)
- ✅ **Open Graph** meta tagy pro sociální sítě
- ✅ **Twitter Cards** optimization
- ✅ **Sitemap.xml** for search engines
- ✅ **Robots.txt** with anti-bot rules
- ✅ **Canonical URLs** for proper indexing
- ✅ **Mobile-first** indexing
- ✅ **Lazy loading** for images
- ✅ **Loading speed** optimization

## 📋 Website Sections

1. **🏠 Hero Section** - Introduction with practice name and main services
2. **👥 About Us** - Practice information, doctor team and location
3. **🦷 Services** - Complete list of dental services
4. **📸 Photo Gallery** - Interior and equipment images
5. **💰 Price List** - Transparent pricing for all services
6. **📞 Contact** - Contact details, address and office hours
7. **🤝 Cooperation** - Partner practices and collaboration
8. **👨‍⚕️ Staff** - Introduction of medical team

## 🎯 Configuration

All settings are centralized in the `config.js` file:

```javascript
// 🔧 DEVELOPMENT - testing, debug, no reCAPTCHA
const DEBUG_MODE = true;

// 🚀 PRODUCTION - reCAPTCHA enabled, no debug
const DEBUG_MODE = false;
```

### 📚 Available Documentation

- **[QUICK_CONFIG.md](docs/QUICK_CONFIG.md)** - 5-minute setup
- **[CONFIG_GUIDE.md](docs/CONFIG_GUIDE.md)** - Complete configuration
- **[EMAILJS_SETUP.md](docs/EMAILJS_SETUP.md)** - EmailJS setup
- **[RECAPTCHA_SETUP.md](docs/RECAPTCHA_SETUP.md)** - reCAPTCHA setup

## 🔧 Development and Deployment

### Development
```bash
# Otevřete config.js a nastavte:
const DEBUG_MODE = true;
# reCAPTCHA vypnuta, testovací tlačítka zapnuta
```

### Production
```bash
# Otevřete config.js a nastavte:
const DEBUG_MODE = false;
# reCAPTCHA zapnuta, optimalizace pro produkci
```

### Ověření
```javascript
// V konzoli prohlížeče:
window.DentalistConfig.printCurrentConfig()
window.DentalistConfig.isProductionReady()
```

## 🏥 O ordinaci Dentalist

**Dentalist s.r.o.**
- 📍 Moderní zubní ordinace v Hlučíně
- 👨‍⚕️ Tým zkušených zubních lékařů a hygieniček  
- 🔬 Nejmodernější vybavení včetně operačního mikroskopu
- 💙 Zaměření na bezbolestné ošetření a pohodlí pacientů
- 🕐 Flexibilní ordinační hodiny (i večer do 20:00)
- 🚗 Parkování přímo u budovy

## � Licence

Tento projekt je vytvořen pro Dentalist s.r.o. Všechna práva vyhrazena.

---

**💻 Pro vývojáře**: Začněte s [docs/QUICK_CONFIG.md](docs/QUICK_CONFIG.md)  
**🚀 Pro nasazení**: Nastavte `DEBUG_MODE = false` v config.js
