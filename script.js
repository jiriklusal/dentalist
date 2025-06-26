// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize EmailJS
  initEmailJS();

  // Navigation functionality
  initNavigation();

  // Smooth scrolling for anchor links
  initSmoothScrolling();

  // Gallery functionality
  initGallery();

  // Scroll animations
  initScrollAnimations();

  // Contact form functionality (if needed)
  initContactForm();

  // Mobile menu toggle
  initMobileMenu();

  // Navbar scroll effect
  initNavbarScroll();

  // Language switcher
  initLanguageSwitcher();
});

// EmailJS initialization
function initEmailJS() {
  // Initialize EmailJS with your public key
  emailjs.init("qXByuv7y4-smb5Nug");
  console.log('EmailJS initialized with public key: qXByuv7y4-smb5Nug');
}

// Navigation functionality
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Highlight active navigation link based on scroll position
  function updateActiveNav() {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener('scroll', updateActiveNav);

  // Initial call
  updateActiveNav();
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  });
}

// Gallery functionality
function initGallery() {
  // Select both gallery images and other lightbox-enabled images
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const otherImages = document.querySelectorAll('.lightbox-enabled');
  const allImages = [...galleryImages, ...otherImages];

  if (allImages.length === 0) return;

  // Create lightbox HTML
  createLightbox();

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;

  // Add click event to all lightbox-enabled images
  allImages.forEach((img, index) => {
    img.addEventListener('click', function () {
      openLightbox(index);
    });

    // Add keyboard navigation
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    // Make images focusable for accessibility
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute(
      'aria-label',
      `Zobrazit obrázek ${index + 1} ve větší velikosti`
    );

    // Add visual indicator that image is clickable
    img.style.cursor = 'pointer';
    img.classList.add('lightbox-clickable');
  });

  // Close lightbox events
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation events
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  });

  function createLightbox() {
    const lightboxHTML = `
            <div class="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Zavřít galerii">&times;</button>
                    <button class="lightbox-prev" aria-label="Předchozí obrázek">&#10094;</button>
                    <button class="lightbox-next" aria-label="Další obrázek">&#10095;</button>
                    <img class="lightbox-img" src="" alt="">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus on close button for accessibility
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    // Return focus to the clicked image
    allImages[currentImageIndex].focus();
  }

  function showPrevImage() {
    currentImageIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1;
    updateLightboxImage();
  }

  function showNextImage() {
    currentImageIndex =
      currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    const currentImg = allImages[currentImageIndex];
    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt;

    // Update caption
    const caption = currentImg.alt || `Obrázek ${currentImageIndex + 1}`;
    lightboxCaption.textContent = caption;

    // Update counter
    const counter = document.querySelector('.lightbox-counter');
    counter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;

    // Show/hide navigation buttons based on image availability
    prevBtn.style.display = allImages.length > 1 ? 'block' : 'none';
    nextBtn.style.display = allImages.length > 1 ? 'block' : 'none';
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.service-card, .team-member, .gallery-item, .pricing-item, .contact-item'
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector('#contactForm');
  const formMessage = document.querySelector('#formMessage');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Validate form
    if (!validateForm(data)) {
      showMessage('Prosím vyplňte všechna povinná pole správně.', 'error');
      return;
    }

    // Validate reCAPTCHA (only if enabled)
    if (RECAPTCHA_ENABLED) {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        showMessage('Prosím potvrďte, že nejste robot.', 'error');
        document.getElementById('recaptcha-error').style.display = 'block';
        return;
      } else {
        document.getElementById('recaptcha-error').style.display = 'none';
      }
    } else {
      // reCAPTCHA is disabled, hide error message if visible
      document.getElementById('recaptcha-error').style.display = 'none';
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Odesílám...</span>';

    try {
      // Send email via EmailJS
      await sendContactForm(data);
      
      // Show success message
      showMessage('Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve.', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Reset reCAPTCHA (only if enabled)
      if (RECAPTCHA_ENABLED && typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        name: error.name,
        message: error.message
      });
      
      // More specific error messages
      let errorMessage = 'Nastala chyba při odesílání zprávy. ';
      
      if (error.text && error.text.includes('service ID not found')) {
        errorMessage += 'EmailJS služba není správně nakonfigurována. Service ID nebylo nalezeno.';
      } else if (error.text && error.text.includes('template')) {
        errorMessage += 'Problém s email template. Template ID nebylo nalezeno.';
      } else if (error.status === 400) {
        errorMessage += 'Neplatné údaje ve formuláři nebo chybná konfigurace EmailJS.';
      } else if (error.status === 412) {
        errorMessage += 'EmailJS služba není správně nakonfigurována.';
      } else if (error.status === 422) {
        errorMessage += 'Template obsahuje chyby.';
      } else if (error.text && error.text.includes('service')) {
        errorMessage += 'Problém s email službou.';
      } else if (!navigator.onLine) {
        errorMessage += 'Zkontrolujte internetové připojení.';
      } else {
        errorMessage += `Zkuste to prosím později. (Chyba: ${error.status || 'neznámá'})`;
      }
      
      showMessage(errorMessage, 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  function validateForm(data) {
    // Check required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.subject || !data.message) {
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return false;
    }

    // Validate phone format (basic check for numbers and common formatting)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    if (!phoneRegex.test(data.phone)) {
      return false;
    }

    return true;
  }

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Auto-hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }

  async function sendContactForm(data) {
    try {
      console.log('Odesílám data:', data); // Debug log
      
      // EmailJS template parameters
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        to_email: 'jiri.klusal@gmail.com'
      };

      // Add reCAPTCHA response only if enabled
      if (RECAPTCHA_ENABLED) {
        const recaptchaResponse = grecaptcha.getResponse();
        templateParams['g-recaptcha-response'] = recaptchaResponse;
      }

      console.log('Template params:', templateParams); // Debug log

      // DŮLEŽITÉ: Zkontrolujte tyto hodnoty ve vašem EmailJS dashboard!
      const serviceId = 'service_lfqx5fh';     
      const templateId = 'template_f0w827z';   
      
      console.log('Používám Service ID:', serviceId);
      console.log('Používám Template ID:', templateId);
      console.log('Odesílám na EmailJS API...');

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return response;

    } catch (error) {
      console.error('EmailJS error details:', error);
      console.error('Error status:', error.status);
      console.error('Error text:', error.text);
      
      // Specific error for Service ID not found
      if (error.text && error.text.includes('service ID not found')) {
        console.error('🔥 CHYBA: Service ID "service_lfqx5fh" nebyl nalezen!');
        console.error('📋 Jděte na https://dashboard.emailjs.com/admin a zkontrolujte správné Service ID');
      }
      
      throw error;
    }
  }

  // Add real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    
    // Remove any existing error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      field.classList.add('error');
      return false;
    }
    
    // Validate email field
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        field.classList.add('error');
        return false;
      }
    }
    
    // Validate phone field
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
      if (!phoneRegex.test(value)) {
        field.classList.add('error');
        return false;
      }
    }
    
    return true;
  }

  // If you add real images later, this function will handle it
  const contactSection = document.querySelector('#contact');

  // Example: Add click-to-call functionality
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    link.addEventListener('click', function () {
      // Track phone clicks for analytics if needed
      console.log('Phone number clicked:', this.getAttribute('href'));
    });
  });

  // Example: Add click-to-email functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener('click', function () {
      // Track email clicks for analytics if needed
      console.log('Email clicked:', this.getAttribute('href'));
    });
  });

  // Initialize reCAPTCHA state
  initRecaptchaState();

  // Add test data fill functionality (REMOVE IN PRODUCTION)
  const fillTestButton = document.querySelector('#fillTestData');
  if (fillTestButton) {
    console.log('✅ Testovací tlačítko nalezeno, přidávám event listener...');
    fillTestButton.addEventListener('click', function() {
      console.log('🧪 Tlačítko pro testovací data bylo kliknuto!');
      fillTestData();
    });
  } else {
    console.log('❌ Testovací tlačítko nebylo nalezeno!');
  }

  function fillTestData() {
    console.log('🧪 Vyplňuji testovací data...');
    
    // Test data
    const testData = {
      firstName: 'Jan',
      lastName: 'Novák',
      email: 'jan.novak@email.cz',
      phone: '+420777123456',
      subject: 'Testovací zpráva z formuláře',
      message: 'Toto je testovací zpráva pro ověření funkčnosti EmailJS služby. Pokud tuto zprávu vidíte, formulář funguje správně!'
    };
    
    // Fill form fields
    const firstNameField = document.getElementById('firstName');
    const lastNameField = document.getElementById('lastName');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    console.log('🔍 Kontrolujem pole formuláře...');
    console.log('firstName pole:', firstNameField ? 'nalezeno' : 'NENALEZENO');
    console.log('lastName pole:', lastNameField ? 'nalezeno' : 'NENALEZENO');
    console.log('email pole:', emailField ? 'nalezeno' : 'NENALEZENO');
    console.log('phone pole:', phoneField ? 'nalezeno' : 'NENALEZENO');
    console.log('subject pole:', subjectField ? 'nalezeno' : 'NENALEZENO');
    console.log('message pole:', messageField ? 'nalezeno' : 'NENALEZENO');
    
    if (firstNameField) firstNameField.value = testData.firstName;
    if (lastNameField) lastNameField.value = testData.lastName;
    if (emailField) emailField.value = testData.email;
    if (phoneField) phoneField.value = testData.phone;
    if (subjectField) subjectField.value = testData.subject;
    if (messageField) messageField.value = testData.message;
    
    // Remove any error styling from fields
    const allFields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    allFields.forEach(field => {
      field.classList.remove('error');
    });
    
    console.log('✅ Testovací data vyplněna!');
    
    // Hide reCAPTCHA error if visible
    const recaptchaError = document.getElementById('recaptcha-error');
    if (recaptchaError) {
      recaptchaError.style.display = 'none';
    }
    
    const recaptchaStatus = RECAPTCHA_ENABLED ? 'zapnutá' : 'vypnutá';
    const message = RECAPTCHA_ENABLED ? 
      'Testovací data byla vyplněna. Nyní potvrďte reCAPTCHA a můžete otestovat odeslání.' :
      'Testovací data byla vyplněna. reCAPTCHA je vypnutá - můžete rovnou otestovat odeslání.';
    
    showMessage(`${message} (reCAPTCHA: ${recaptchaStatus})`, 'success');
  }
}

// Mobile menu toggle
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });

    // Close menu on window resize if it's large enough
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('#navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolling
    if (scrollTop > 0) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Optional: Hide navbar when scrolling down, show when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Performance optimization for scroll events
const optimizedScrollHandler = throttle(function () {
  // Any scroll-related functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images (if you add real images later)
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', function (e) {
  console.error('JavaScript error:', e.error);
  // You could send this to an analytics service
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed');
      });
  });
}

// Analytics tracking (you can integrate Google Analytics or other services)
function trackEvent(eventName, eventData) {
  // Example: gtag('event', eventName, eventData);
  console.log('Event tracked:', eventName, eventData);
}

// Track user interactions
document.addEventListener('click', function (e) {
  if (e.target.matches('.btn')) {
    trackEvent('button_click', {
      button_text: e.target.textContent,
      button_location: e.target.getAttribute('href') || 'unknown',
    });
  }
});

// Accessibility improvements
function initAccessibility() {
  // Skip to main content link
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' && !e.shiftKey) {
      const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

// Initialize accessibility features
initAccessibility();

// Reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Print functionality
function initPrintStyles() {
  window.addEventListener('beforeprint', function () {
    // Expand all collapsed sections before printing
    document.querySelectorAll('.nav-menu').forEach((menu) => {
      menu.style.display = 'none';
    });
  });

  window.addEventListener('afterprint', function () {
    // Restore normal styles after printing
    document.querySelectorAll('.nav-menu').forEach((menu) => {
      menu.style.display = '';
    });
  });
}

initPrintStyles();

// Language switcher functionality
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const elementsWithTranslation =
    document.querySelectorAll('[data-cs][data-en]');

  // Get saved language from localStorage or default to Czech
  let currentLanguage = localStorage.getItem('language') || 'cs';

  // Apply saved language on load
  switchLanguage(currentLanguage);

  // Add click event listeners to language buttons
  langButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const selectedLang = this.getAttribute('data-lang');

      if (selectedLang !== currentLanguage) {
        switchLanguage(selectedLang);
        currentLanguage = selectedLang;

        // Save language preference
        localStorage.setItem('language', selectedLang);
      }
    });
  });

  function switchLanguage(lang) {
    // Update button states
    langButtons.forEach((btn) => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });

    // Update text content
    elementsWithTranslation.forEach((element) => {
      const translation = element.getAttribute(`data-${lang}`);
      if (translation) {
        element.textContent = translation;
      }
    });

    // Update document language attribute
    document.documentElement.setAttribute('lang', lang);

    // Update page title
    const titles = {
      cs: 'Dentalist - Moderní stomatologická ordinace',
      en: 'Dentalist - Modern Dental Practice',
    };
    document.title = titles[lang];
  }

  // Expose switchLanguage function globally for potential external use
  window.switchLanguage = switchLanguage;
}

// reCAPTCHA Configuration - ZMĚŇTE NA false PRO VYPNUTÍ reCAPTCHA
const RECAPTCHA_ENABLED = false; // Změňte na false pro vypnutí reCAPTCHA

// If reCAPTCHA is enabled, initialize it
if (RECAPTCHA_ENABLED) {
  // Initialize reCAPTCHA (v2 or v3 based on your preference)
  // For v2:
  // grecaptcha.render('recaptcha', { 'sitekey' : 'your-site-key' });

  // For v3 (invisible):
  // grecaptcha.ready(function() {
  //   grecaptcha.execute('your-site-key', {action: 'homepage'}).then(function(token) {
  //      // Add your logic to submit to your backend server here.
  //   });
  // });
}

function initRecaptchaState() {
    const contactFormSection = document.querySelector('.contact-form-section');
    
    if (!RECAPTCHA_ENABLED && contactFormSection) {
      // Add CSS class to hide reCAPTCHA
      contactFormSection.classList.add('recaptcha-disabled');
      console.log('🔒 reCAPTCHA je vypnutá (RECAPTCHA_ENABLED = false)');
    } else if (RECAPTCHA_ENABLED && contactFormSection) {
      // Remove CSS class to show reCAPTCHA
      contactFormSection.classList.remove('recaptcha-disabled');
      console.log('🛡️ reCAPTCHA je zapnutá (RECAPTCHA_ENABLED = true)');
    }
  }
