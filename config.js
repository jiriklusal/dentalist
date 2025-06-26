// =============================================================================
// DENTALIST - KONFIGURAČNÍ SOUBOR
// =============================================================================
// Tento soubor obsahuje všechny nastavitelné proměnné pro web Dentalist.
// Upravte podle vašich potřeb a prostředí (development/production).

// =============================================================================
// 🎯 HLAVNÍ REŽIM - ZMĚŇTE POUZE TUTO JEDNU PROMĚNNOU!
// =============================================================================

// 🔧 HLAVNÍ DEBUG REŽIM - ovládá všechna ostatní nastavení
// true = DEVELOPMENT režim (reCAPTCHA vypnuta, testovací tlačítko zapnuto, debug zapnutý)
// false = PRODUCTION režim (reCAPTCHA zapnuta, testovací tlačítko vypnuto, debug vypnutý)
const DEBUG_MODE = true;

// =============================================================================
// 🔒 reCAPTCHA NASTAVENÍ
// =============================================================================

// Zapnutí/vypnutí reCAPTCHA ochrany formuláře (ovládané DEBUG_MODE)
// DEBUG_MODE = true  → reCAPTCHA vypnuta (pro testování)
// DEBUG_MODE = false → reCAPTCHA zapnuta (pro produkci)
const RECAPTCHA_ENABLED = !DEBUG_MODE;

// Google reCAPTCHA Site Key (veřejný klíč)
// Získejte na: https://www.google.com/recaptcha/admin
const RECAPTCHA_SITE_KEY = "6LccuG4rAAAAAKxHyObMhxb-Cab_-8-a5FoNQicp";

// reCAPTCHA téma (light/dark)
const RECAPTCHA_THEME = "light";

// =============================================================================
// 📧 EmailJS NASTAVENÍ
// =============================================================================

// EmailJS Public Key (veřejný klíč)
// Získejte na: https://dashboard.emailjs.com/admin/account
const EMAILJS_PUBLIC_KEY = "qXByuv7y4-smb5Nug";

// EmailJS Service ID
// Najděte na: https://dashboard.emailjs.com/admin
const EMAILJS_SERVICE_ID = "service_6htqe2e";

// EmailJS Template ID
// Najděte na: https://dashboard.emailjs.com/admin/templates
const EMAILJS_TEMPLATE_ID = "template_f0w827z";

// Cílový email pro příjem zpráv z formuláře
const TARGET_EMAIL = "jiri.klusal@seznam.cz";

// =============================================================================
// 🧪 TESTOVACÍ NASTAVENÍ
// =============================================================================

// Zobrazení testovacího tlačítka pro vyplnění formuláře (ovládané DEBUG_MODE)
// DEBUG_MODE = true  → tlačítko je viditelné (pro development)
// DEBUG_MODE = false → tlačítko je skryté (pro produkci)
const SHOW_TEST_BUTTON = DEBUG_MODE;

// Testovací data pro formulář
const TEST_DATA = {
  firstName: 'Jan',
  lastName: 'Novák',
  email: 'jan.novak@email.cz',
  phone: '+420777123456',
  subject: 'Objednání na preventivní prohlídku',
  message: 'Dobrý den,\n\nrád bych se objednal na preventivní prohlídku. Mám k dispozici termíny ve středu nebo čtvrtek odpoledne. Prosím o informaci o dostupnosti.\n\nPokud by bylo možné, uvítal bych také konzultaci ohledně zubní hygieny.\n\nDěkuji za odpověď.\n\nS pozdravem'
};

// Alternativní testovací zprávy (pro pestrost)
const ALTERNATIVE_TEST_MESSAGES = [
  {
    subject: 'Dotaz na bělení zubů',
    message: 'Dobrý den,\n\nzajímalo by mě bělení zubů ve vaší ordinaci. Mohli byste mi prosím poslat informace o cenách a postupu?\n\nZároveň bych se rád zeptal, jak dlouho celý proces trvá a zda je nutné více návštěv.\n\nDěkuji předem za odpověď.\n\nS pozdravem'
  },
  {
    subject: 'Bolest zubu - urgentní termín',
    message: 'Dobrý den,\n\nmám silnou bolest pravého horního zubu již druhý den. Bylo by možné se objednat na nejbližší možný termín?\n\nJsem k dispozici i v ranních hodinách nebo večer.\n\nDěkuji za rychlou odpověď.\n\nS pozdravem'
  },
  {
    subject: 'Výměna amalgámových výplní',
    message: 'Dobrý den,\n\nchtěl bych se informovat o možnosti výměny starých amalgámových výplní za moderní kompozitní.\n\nMám celkem 3 staré výplně. Mohli byste mi prosím sdělit orientační cenu a postup?\n\nDěkuji za informace.\n\nS pozdravem'
  },
  {
    subject: 'Ortodontické ošetření pro dospělé',
    message: 'Dobrý den,\n\nzajímalo by mě ortodontické ošetření pro dospělé. Mám 28 let a chtěl bych si nechat narovnat zuby.\n\nPoskytujete také neviditelné rovnátka? Prosím o informace o možnostech a cenách.\n\nS pozdravem'
  },
  {
    subject: 'Dentální hygiena - termín',
    message: 'Dobrý den,\n\nrád bych se objednal na dentální hygienu. Naposledy jsem byl před rokem a myslím, že už je čas na další ošetření.\n\nMohl bych prosím termín někdy příští týden?\n\nDěkuji.\n\nS pozdravem'
  }
];

// =============================================================================
// 🔧 DEVELOPMENT NASTAVENÍ (ovládané DEBUG_MODE)
// =============================================================================

// Všechna následující nastavení jsou automaticky řízena proměnnou DEBUG_MODE:
// - DEBUG_MODE = true  → development nastavení
// - DEBUG_MODE = false → production nastavení

// Zobrazení debug zpráv pro EmailJS
const EMAILJS_DEBUG = DEBUG_MODE;

// Zobrazení debug zpráv pro formulář
const FORM_DEBUG = DEBUG_MODE;

// Zobrazení debug zpráv pro reCAPTCHA
const RECAPTCHA_DEBUG = DEBUG_MODE;

// =============================================================================
// 🌐 JAZYKOVÉ NASTAVENÍ
// =============================================================================

// Výchozí jazyk webu
// 'cs' = čeština
// 'en' = angličtina
const DEFAULT_LANGUAGE = 'cs';

// Uložení jazykové preference do localStorage
const SAVE_LANGUAGE_PREFERENCE = true;

// =============================================================================
// 🎨 UI/UX NASTAVENÍ
// =============================================================================

// Automatické skrytí zpráv formuláře (v milisekundách)
// 5000 = 5 sekund
const MESSAGE_AUTO_HIDE_DELAY = 5000;

// Animace při scrollování
const SCROLL_ANIMATIONS_ENABLED = true;

// Smooth scrolling pro kotvy
const SMOOTH_SCROLLING_ENABLED = true;

// Offset pro navigaci (v pixelech)
const NAVIGATION_OFFSET = 80;

// =============================================================================
// 📱 RESPONSIVE NASTAVENÍ
// =============================================================================

// Breakpoint pro mobilní menu (v pixelech)
const MOBILE_BREAKPOINT = 768;

// Automatické zavření mobilního menu při změně velikosti okna
const AUTO_CLOSE_MOBILE_MENU = true;

// =============================================================================
// 🚀 PERFORMANCE NASTAVENÍ
// =============================================================================

// Throttling pro scroll eventy (v milisekundách)
// 16ms ≈ 60fps
const SCROLL_THROTTLE_DELAY = 16;

// Lazy loading pro obrázky
const LAZY_LOADING_ENABLED = true;

// Service Worker pro offline funkcionalitě
const SERVICE_WORKER_ENABLED = false;

// =============================================================================
// 📊 ANALYTICS NASTAVENÍ
// =============================================================================

// Sledování kliknutí na tlačítka
const TRACK_BUTTON_CLICKS = true;

// Sledování kliknutí na telefon/email
const TRACK_CONTACT_CLICKS = true;

// Google Analytics ID (pokud používáte)
const GOOGLE_ANALYTICS_ID = null; // Např. "GA_MEASUREMENT_ID"

// =============================================================================
// 🎯 PRODUKČNÍ KONTROLY
// =============================================================================

// ⚠️ DŮLEŽITÉ: Pro produkční nasazení stačí nastavit DEBUG_MODE = false
// Všechna ostatní nastavení se automaticky upraví správně!

const PRODUCTION_CHECKLIST = {
  // ✅ = správně nastaveno pro produkci
  // ❌ = potřebuje změnu před produkčním nasazením
  
  debug_mode: DEBUG_MODE,                      // Mělo by být false
  recaptcha_enabled: RECAPTCHA_ENABLED,        // Mělo by být true (auto z !DEBUG_MODE)
  show_test_button: SHOW_TEST_BUTTON,          // Mělo by být false (auto z DEBUG_MODE)
  emailjs_debug: EMAILJS_DEBUG,                // Mělo by být false (auto z DEBUG_MODE)
  form_debug: FORM_DEBUG,                      // Mělo by být false (auto z DEBUG_MODE)
  recaptcha_debug: RECAPTCHA_DEBUG,            // Mělo by být false (auto z DEBUG_MODE)
  service_worker: SERVICE_WORKER_ENABLED       // Podle potřeby
};

// =============================================================================
// 📝 EXPORT KONFIGURACE
// =============================================================================

// Export všech konfigurací pro použití v dalších souborech
window.DentalistConfig = {
  // reCAPTCHA
  RECAPTCHA_ENABLED,
  RECAPTCHA_SITE_KEY,
  RECAPTCHA_THEME,
  
  // EmailJS
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  TARGET_EMAIL,
  
  // Testování
  SHOW_TEST_BUTTON,
  TEST_DATA,
  ALTERNATIVE_TEST_MESSAGES,
  
  // Development
  DEBUG_MODE,
  EMAILJS_DEBUG,
  FORM_DEBUG,
  RECAPTCHA_DEBUG,
  
  // Jazyk
  DEFAULT_LANGUAGE,
  SAVE_LANGUAGE_PREFERENCE,
  
  // UI/UX
  MESSAGE_AUTO_HIDE_DELAY,
  SCROLL_ANIMATIONS_ENABLED,
  SMOOTH_SCROLLING_ENABLED,
  NAVIGATION_OFFSET,
  
  // Responsive
  MOBILE_BREAKPOINT,
  AUTO_CLOSE_MOBILE_MENU,
  
  // Performance
  SCROLL_THROTTLE_DELAY,
  LAZY_LOADING_ENABLED,
  SERVICE_WORKER_ENABLED,
  
  // Analytics
  TRACK_BUTTON_CLICKS,
  TRACK_CONTACT_CLICKS,
  GOOGLE_ANALYTICS_ID,
  
  // Produkční kontrola
  PRODUCTION_CHECKLIST
};

// =============================================================================
// 🎛️ HELPER FUNKCE
// =============================================================================

// Kontrola, zda jsme v produkčním režimu
window.DentalistConfig.isProduction = function() {
  return !DEBUG_MODE && RECAPTCHA_ENABLED && !SHOW_TEST_BUTTON;
};

// Kontrola, zda je konfigurace připravena pro produkci
window.DentalistConfig.isProductionReady = function() {
  // Pro produkci stačí zkontrolovat pouze DEBUG_MODE
  // Všechno ostatní se nastaví automaticky
  return !DEBUG_MODE;
};

// Výpis současné konfigurace do konzole
window.DentalistConfig.printCurrentConfig = function() {
  console.group('🎛️ Dentalist Konfigurace');
  console.log('🔒 reCAPTCHA:', RECAPTCHA_ENABLED ? '✅ Zapnuto' : '❌ Vypnuto');
  console.log('🧪 Testovací tlačítko:', SHOW_TEST_BUTTON ? '✅ Zobrazeno' : '❌ Skryto');
  console.log('🔧 Debug režim:', DEBUG_MODE ? '✅ Zapnutý' : '❌ Vypnutý');
  console.log('📧 EmailJS Service:', EMAILJS_SERVICE_ID);
  console.log('📧 EmailJS Template:', EMAILJS_TEMPLATE_ID);
  console.log('🌐 Výchozí jazyk:', DEFAULT_LANGUAGE);
  console.log('🚀 Produkční režim:', this.isProduction() ? '✅ ANO' : '❌ NE');
  console.log('✅ Připraveno pro produkci:', this.isProductionReady() ? '✅ ANO' : '❌ NE');
  console.groupEnd();
};

// =============================================================================
// 📖 DOKUMENTACE A NÁVODY
// =============================================================================

console.log(`
🎛️ Dentalist konfigurace načtena!

⚡ RYCHLÉ PŘEPÍNÁNÍ REŽIMU:
• DEVELOPMENT: DEBUG_MODE = true  (reCAPTCHA vypnuta, testovací tlačítko zapnuto)
• PRODUCTION:  DEBUG_MODE = false (reCAPTCHA zapnuta, testovací tlačítko vypnuto)

📋 Současný režim: ${DEBUG_MODE ? '🔧 DEVELOPMENT' : '🚀 PRODUCTION'}

🔧 Přístup ke konfiguraci:
• window.DentalistConfig.RECAPTCHA_ENABLED
• window.DentalistConfig.isProduction()
• window.DentalistConfig.printCurrentConfig()

📖 Dokumentace:
• EmailJS návod: EMAILJS_SETUP.md
• reCAPTCHA návod: RECAPTCHA_SETUP.md
• Konfigurace: CONFIG_GUIDE.md
`);

// Debug výpis při načtení (pouze v debug režimu)
if (DEBUG_MODE) {
  window.DentalistConfig.printCurrentConfig();
}
