// =============================================================================
// DENTALIST - CONFIGURATION FILE
// =============================================================================
// This file contains all configurable variables for the Dentalist website.
// Adjust according to your needs and environment (development/production).

// =============================================================================
// 🎯 MAIN MODE - CHANGE ONLY THIS ONE VARIABLE!
// =============================================================================

// 🔧 MAIN DEBUG MODE - controls all other settings
// true = DEVELOPMENT mode (reCAPTCHA disabled, test button enabled, debug on)
// false = PRODUCTION mode (reCAPTCHA enabled, test button disabled, debug off)
//
// 🚀 PRO GITHUB PAGES: Automaticky se změní na false při nasazení
// 💡 Pro manuální změnu: true → false před nahráním na server
const DEBUG_MODE = true;

// =============================================================================
// 🔒 reCAPTCHA SETTINGS
// =============================================================================

// Enable/disable reCAPTCHA form protection (controlled by DEBUG_MODE)
// DEBUG_MODE = true  → reCAPTCHA disabled (for testing)
// DEBUG_MODE = false → reCAPTCHA enabled (for production)
const RECAPTCHA_ENABLED = !DEBUG_MODE;

// Google reCAPTCHA Site Key (public key)
// Get it at: https://www.google.com/recaptcha/admin
const RECAPTCHA_SITE_KEY = "6LccuG4rAAAAAKxHyObMhxb-Cab_-8-a5FoNQicp";

// reCAPTCHA theme (light/dark)
const RECAPTCHA_THEME = "light";

// =============================================================================
// 📧 EmailJS SETTINGS
// =============================================================================

// EmailJS Public Key (public key)
// Get it at: https://dashboard.emailjs.com/admin/account
const EMAILJS_PUBLIC_KEY = "qXByuv7y4-smb5Nug";

// EmailJS Service ID
// Find it at: https://dashboard.emailjs.com/admin
const EMAILJS_SERVICE_ID = "service_6htqe2e";

// EmailJS Template ID
// Find it at: https://dashboard.emailjs.com/admin/templates
const EMAILJS_TEMPLATE_ID = "template_f0w827z";

// Target email configuration based on environment
// 🧪 DEBUG_MODE = true  → jiri.klusal@seznam.cz (development/testing)
// 🚀 DEBUG_MODE = false → info@dentalist.cz (production) 
const TARGET_EMAIL_DEBUG = "jiri.klusal@seznam.cz";
const TARGET_EMAIL_PRODUCTION = "info@dentalist.cz";
const TARGET_EMAIL = DEBUG_MODE ? TARGET_EMAIL_DEBUG : TARGET_EMAIL_PRODUCTION;

// =============================================================================
// 🧪 TEST SETTINGS
// =============================================================================

// Show test button for filling the form (controlled by DEBUG_MODE)
// DEBUG_MODE = true  → button is visible (for development)
// DEBUG_MODE = false → button is hidden (for production)
const SHOW_TEST_BUTTON = DEBUG_MODE;

// Test data for the form
const TEST_DATA = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@email.com',
  phone: '+420777123456',
  subject: 'Appointment for preventive checkup',
  message: 'Hello,\n\nI would like to schedule a preventive checkup appointment. I am available on Wednesday or Thursday afternoons. Please let me know about availability.\n\nIf possible, I would also appreciate a consultation about dental hygiene.\n\nThank you for your response.\n\nBest regards'
};

// Alternative test messages (for variety)
const ALTERNATIVE_TEST_MESSAGES = [
  {
    subject: 'Inquiry about teeth whitening',
    message: 'Hello,\n\nI would be interested in teeth whitening at your clinic. Could you please send me information about prices and the procedure?\n\nI would also like to ask how long the entire process takes and whether multiple visits are necessary.\n\nThank you in advance for your response.\n\nBest regards'
  },
  {
    subject: 'Tooth pain - urgent appointment',
    message: 'Hello,\n\nI have severe pain in my upper right tooth for the second day. Would it be possible to schedule the earliest possible appointment?\n\nI am available even in the morning hours or evening.\n\nThank you for a quick response.\n\nBest regards'
  },
  {
    subject: 'Replacement of amalgam fillings',
    message: 'Hello,\n\nI would like to inquire about the possibility of replacing old amalgam fillings with modern composite ones.\n\nI have 3 old fillings in total. Could you please tell me the approximate price and procedure?\n\nThank you for the information.\n\nBest regards'
  },
  {
    subject: 'Orthodontic treatment for adults',
    message: 'Hello,\n\nI would be interested in orthodontic treatment for adults. I am 28 years old and would like to have my teeth straightened.\n\nDo you also provide invisible braces? Please provide information about options and prices.\n\nBest regards'
  },
  {
    subject: 'Dental hygiene - appointment',
    message: 'Hello,\n\nI would like to schedule a dental hygiene appointment. My last visit was a year ago and I think it\'s time for another treatment.\n\nCould I please have an appointment sometime next week?\n\nThank you.\n\nBest regards'
  }
];

// =============================================================================
// 🔧 DEVELOPMENT SETTINGS (controlled by DEBUG_MODE)
// =============================================================================

// All following settings are automatically controlled by the DEBUG_MODE variable:
// - DEBUG_MODE = true  → development settings
// - DEBUG_MODE = false → production settings

// Show debug messages for EmailJS
const EMAILJS_DEBUG = DEBUG_MODE;

// Show debug messages for form
const FORM_DEBUG = DEBUG_MODE;

// Show debug messages for reCAPTCHA
const RECAPTCHA_DEBUG = DEBUG_MODE;

// =============================================================================
// 🌐 LOCALIZED MESSAGES
// =============================================================================

// Form messages in multiple languages
const LOCALIZED_MESSAGES = {
  cs: {
    // Form validation messages
    fillRequiredFields: 'Prosím vyplňte všechna povinná pole správně.',
    confirmNotRobot: 'Prosím potvrďte, že nejste robot.',
    sending: 'Odesílám...',
    messageSentSuccess: 'Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve.',
    
    // Security and anti-bot messages
    rateLimitExceeded: 'Příliš mnoho pokusů. Zkuste to znovu za několik minut.',
    suspiciousActivity: 'Byla detekována podezřelá aktivita. Zkuste to znovu pomaleji.',
    securityBlock: 'Formulář nebyl odeslán kvůli bezpečnostním důvodům.',
    fillSlowly: 'Prosím, vyplňte formulář pomaleji.',
    
    // Error messages
    errorSending: 'Nastala chyba při odesílání zprávy. ',
    emailjsServiceNotConfigured: 'EmailJS služba není správně nakonfigurována. Service ID nebylo nalezeno.',
    emailTemplateNotFound: 'Problém s email template. Template ID nebylo nalezeno.',
    invalidFormData: 'Neplatné údaje ve formuláři nebo chybná konfigurace EmailJS.',
    emailjsNotConfigured: 'EmailJS služba není správně nakonfigurována.',
    templateErrors: 'Template obsahuje chyby.',
    emailServiceProblem: 'Problém s email službou.',
    checkConnection: 'Zkontrolujte internetové připojení.',
    tryLater: 'Zkuste to prosím později.',
    unknownError: 'neznámá',
    
    // Test data messages
    testDataFilled: 'Testovací data byla vyplněna.',
    confirmRecaptcha: 'Nyní potvrďte reCAPTCHA a můžete otestovat odeslání.',
    recaptchaDisabled: 'reCAPTCHA je vypnutá - můžete rovnou otestovat odeslání.',
    recaptchaEnabled: 'zapnutá',
    recaptchaDisabledStatus: 'vypnutá',
    
    // Gallery messages
    closeGallery: 'Zavřít galerii',
    previousImage: 'Předchozí obrázek',
    nextImage: 'Další obrázek',
    showImageLarger: 'Zobrazit obrázek ve větší velikosti',
    imageCounter: 'Obrázek',
    
    // Theme switcher messages
    switchToDark: 'Přepnout na tmavý režim',
    switchToLight: 'Přepnout na světlý režim'
  },
  en: {
    // Form validation messages
    fillRequiredFields: 'Please fill in all required fields correctly.',
    confirmNotRobot: 'Please confirm that you are not a robot.',
    sending: 'Sending...',
    messageSentSuccess: 'Your message has been sent successfully. We will contact you as soon as possible.',
    
    // Security and anti-bot messages
    rateLimitExceeded: 'Too many attempts. Please try again in a few minutes.',
    suspiciousActivity: 'Suspicious activity detected. Please try again more slowly.',
    securityBlock: 'Form was not sent due to security reasons.',
    fillSlowly: 'Please fill the form more slowly.',
    
    // Error messages
    errorSending: 'An error occurred while sending the message. ',
    emailjsServiceNotConfigured: 'EmailJS service is not configured correctly. Service ID was not found.',
    emailTemplateNotFound: 'Problem with email template. Template ID was not found.',
    invalidFormData: 'Invalid form data or incorrect EmailJS configuration.',
    emailjsNotConfigured: 'EmailJS service is not configured correctly.',
    templateErrors: 'Template contains errors.',
    emailServiceProblem: 'Problem with email service.',
    checkConnection: 'Please check your internet connection.',
    tryLater: 'Please try again later.',
    unknownError: 'unknown',
    
    // Test data messages
    testDataFilled: 'Test data has been filled.',
    confirmRecaptcha: 'Now confirm reCAPTCHA and you can test sending.',
    recaptchaDisabled: 'reCAPTCHA is disabled - you can test sending directly.',
    recaptchaEnabled: 'enabled',
    recaptchaDisabledStatus: 'disabled',
    
    // Gallery messages
    closeGallery: 'Close gallery',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    showImageLarger: 'Show image in larger size',
    imageCounter: 'Image',
    
    // Theme switcher messages
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode'
  }
};

// =============================================================================
// 🌐 LANGUAGE SETTINGS
// =============================================================================

// Default website language
// 'cs' = Czech
// 'en' = English
const DEFAULT_LANGUAGE = 'cs';

// Save language preference to localStorage
const SAVE_LANGUAGE_PREFERENCE = true;

// =============================================================================
// 🎨 UI/UX SETTINGS
// =============================================================================

// Auto-hide form messages (in milliseconds)
// 5000 = 5 seconds
const MESSAGE_AUTO_HIDE_DELAY = 5000;

// Animations on scroll
const SCROLL_ANIMATIONS_ENABLED = true;

// Smooth scrolling for anchors
const SMOOTH_SCROLLING_ENABLED = true;

// Offset for navigation (in pixels)
const NAVIGATION_OFFSET = 80;

// =============================================================================
// 📱 RESPONSIVE SETTINGS
// =============================================================================

// Breakpoint for mobile menu (in pixels)
const MOBILE_BREAKPOINT = 768;

// Auto-close mobile menu when window size changes
const AUTO_CLOSE_MOBILE_MENU = true;

// =============================================================================
// =============================================================================
// 🚀 PERFORMANCE SETTINGS
// =============================================================================

// Throttling for scroll events (in milliseconds)
// 16ms ≈ 60fps
const SCROLL_THROTTLE_DELAY = 16;

// Lazy loading for images
const LAZY_LOADING_ENABLED = true;

// Service Worker for offline functionality
const SERVICE_WORKER_ENABLED = false;

// =============================================================================
// 📊 ANALYTICS SETTINGS
// =============================================================================

// Track button clicks
const TRACK_BUTTON_CLICKS = true;

// Track phone/email clicks
const TRACK_CONTACT_CLICKS = true;

// Google Analytics ID (if using)
const GOOGLE_ANALYTICS_ID = null; // E.g. "GA_MEASUREMENT_ID"

// =============================================================================
// 🎯 PRODUCTION CHECKS
// =============================================================================

// ⚠️ IMPORTANT: For production deployment, just set DEBUG_MODE = false
// All other settings will automatically adjust correctly!

const PRODUCTION_CHECKLIST = {
  // ✅ = correctly set for production
  // ❌ = needs change before production deployment
  
  debug_mode: DEBUG_MODE,                      // Should be false
  recaptcha_enabled: RECAPTCHA_ENABLED,        // Should be true (auto from !DEBUG_MODE)
  show_test_button: SHOW_TEST_BUTTON,          // Should be false (auto from DEBUG_MODE)
  emailjs_debug: EMAILJS_DEBUG,                // Should be false (auto from DEBUG_MODE)
  form_debug: FORM_DEBUG,                      // Should be false (auto from DEBUG_MODE)
  recaptcha_debug: RECAPTCHA_DEBUG,            // Should be false (auto from DEBUG_MODE)
  service_worker: SERVICE_WORKER_ENABLED       // As needed
};

// =============================================================================
// 📝 CONFIGURATION EXPORT
// =============================================================================

// Export all configurations for use in other files
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
  
  // Testing
  SHOW_TEST_BUTTON,
  TEST_DATA,
  ALTERNATIVE_TEST_MESSAGES,
  
  // Development
  DEBUG_MODE,
  EMAILJS_DEBUG,
  FORM_DEBUG,
  RECAPTCHA_DEBUG,
  
  // Language
  DEFAULT_LANGUAGE,
  SAVE_LANGUAGE_PREFERENCE,
  LOCALIZED_MESSAGES,
  
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
  
  // Production check
  PRODUCTION_CHECKLIST
};

// =============================================================================
// 🎛️ HELPER FUNCTIONS
// =============================================================================

// Check if we are in production mode
window.DentalistConfig.isProduction = function() {
  return !DEBUG_MODE && RECAPTCHA_ENABLED && !SHOW_TEST_BUTTON;
};

// Check if configuration is ready for production
window.DentalistConfig.isProductionReady = function() {
  // For production, just check DEBUG_MODE
  // Everything else is set automatically
  return !DEBUG_MODE;
};

// Print current configuration to console
window.DentalistConfig.printCurrentConfig = function() {
  console.group('🎛️ Dentalist Configuration');
  console.log('🔒 reCAPTCHA:', RECAPTCHA_ENABLED ? '✅ Enabled' : '❌ Disabled');
  console.log('🧪 Test button:', SHOW_TEST_BUTTON ? '✅ Shown' : '❌ Hidden');
  console.log('🔧 Debug mode:', DEBUG_MODE ? '✅ Enabled' : '❌ Disabled');
  console.log('📧 EmailJS Service:', EMAILJS_SERVICE_ID);
  console.log('📧 EmailJS Template:', EMAILJS_TEMPLATE_ID);
  console.log('🌐 Default language:', DEFAULT_LANGUAGE);
  console.log('🚀 Production mode:', this.isProduction() ? '✅ YES' : '❌ NO');
  console.log('✅ Ready for production:', this.isProductionReady() ? '✅ YES' : '❌ NO');
  console.groupEnd();
};

// Get localized message based on current language
window.DentalistConfig.getMessage = function(messageKey) {
  // Get current language from localStorage or default
  const currentLang = localStorage.getItem('language') || DEFAULT_LANGUAGE;
  
  // Return message in current language, fallback to English, then to key itself
  return LOCALIZED_MESSAGES[currentLang]?.[messageKey] || 
         LOCALIZED_MESSAGES['en']?.[messageKey] || 
         messageKey;
};

// Get current language
window.DentalistConfig.getCurrentLanguage = function() {
  return localStorage.getItem('language') || DEFAULT_LANGUAGE;
};

// =============================================================================
// 📖 DOCUMENTATION AND GUIDES
// =============================================================================

console.log(`
🎛️ Dentalist configuration loaded!

⚡ QUICK MODE SWITCHING:
• DEVELOPMENT: DEBUG_MODE = true  (reCAPTCHA disabled, test button enabled)
• PRODUCTION:  DEBUG_MODE = false (reCAPTCHA enabled, test button disabled)

📋 Current mode: ${DEBUG_MODE ? '🔧 DEVELOPMENT' : '🚀 PRODUCTION'}

🔧 Configuration access:
• window.DentalistConfig.RECAPTCHA_ENABLED
• window.DentalistConfig.isProduction()
• window.DentalistConfig.printCurrentConfig()

📖 Documentation:
• EmailJS guide: EMAILJS_SETUP.md
• reCAPTCHA guide: RECAPTCHA_SETUP.md
• Configuration: CONFIG_GUIDE.md
`);

// Debug output on load (only in debug mode)
if (DEBUG_MODE) {
  window.DentalistConfig.printCurrentConfig();
}
