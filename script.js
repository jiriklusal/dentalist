// Wait for DOM to be fully loaded
// Global function to attach lightbox events (used when recreating lightbox after language change)
function attachLightboxEvents() {
  if (!galleryLightbox || !galleryCloseBtn || !galleryPrevBtn || !galleryNextBtn) return;

  // Close lightbox events
  galleryCloseBtn.addEventListener('click', closeLightbox);
  galleryLightbox.addEventListener('click', function (e) {
    if (e.target === galleryLightbox) {
      closeLightbox();
    }
  });

  // Navigation events
  galleryPrevBtn.addEventListener('click', showPrevImage);
  galleryNextBtn.addEventListener('click', showNextImage);
}

document.addEventListener('DOMContentLoaded', function () {
  // Language switcher (initialize first to set correct language)
  initLanguageSwitcher();

  // Initialize reCAPTCHA state (show/hide based on configuration)
  initRecaptchaState();

  // Initialize anti-bot protection
  initEmailProtection();
  initFormProtection();

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
});

// EmailJS initialization
function initEmailJS() {
  // Initialize EmailJS with your public key from config
  emailjs.init(window.DentalistConfig.EMAILJS_PUBLIC_KEY);
  if (window.DentalistConfig.EMAILJS_DEBUG) {
    console.log('EmailJS initialized with public key:', window.DentalistConfig.EMAILJS_PUBLIC_KEY);
  }
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

// Global variables for gallery functionality
let galleryCurrentImageIndex = 0;
let galleryAllImages = [];
let galleryLightbox = null;
let galleryLightboxImg = null;
let galleryLightboxCaption = null;
let galleryCloseBtn = null;
let galleryPrevBtn = null;
let galleryNextBtn = null;
// Global functions for gallery lightbox
function openLightbox(index) {
  galleryCurrentImageIndex = index;
  updateLightboxImage();
  galleryLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus on close button for accessibility
  galleryCloseBtn.focus();
}

function closeLightbox() {
  galleryLightbox.classList.remove('active');
  document.body.style.overflow = '';

  // Return focus to the clicked image
  galleryAllImages[galleryCurrentImageIndex].focus();
}

function showPrevImage() {
  galleryCurrentImageIndex =
    galleryCurrentImageIndex > 0 ? galleryCurrentImageIndex - 1 : galleryAllImages.length - 1;
  updateLightboxImage();
}

function showNextImage() {
  galleryCurrentImageIndex =
    galleryCurrentImageIndex < galleryAllImages.length - 1 ? galleryCurrentImageIndex + 1 : 0;
  updateLightboxImage();
}

function updateLightboxImage() {
  const currentImg = galleryAllImages[galleryCurrentImageIndex];
  galleryLightboxImg.src = currentImg.src;
  galleryLightboxImg.alt = currentImg.alt;

  // Update caption
  const caption = currentImg.alt || `${window.DentalistConfig.getMessage('imageCounter')} ${galleryCurrentImageIndex + 1}`;
  galleryLightboxCaption.textContent = caption;

  // Update counter
  const counter = document.querySelector('.lightbox-counter');
  counter.textContent = `${galleryCurrentImageIndex + 1} / ${galleryAllImages.length}`;

  // Show/hide navigation buttons based on image availability
  galleryPrevBtn.style.display = galleryAllImages.length > 1 ? 'block' : 'none';
  galleryNextBtn.style.display = galleryAllImages.length > 1 ? 'block' : 'none';
}

// Gallery functionality
function initGallery() {
  // Select both gallery images and other lightbox-enabled images
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const otherImages = document.querySelectorAll('.lightbox-enabled');
  galleryAllImages = [...galleryImages, ...otherImages];

  if (galleryAllImages.length === 0) {
    return;
  }

  // Create lightbox HTML
  createLightbox();

  // Get lightbox elements after creation and store globally
  galleryLightbox = document.querySelector('.lightbox');
  galleryLightboxImg = document.querySelector('.lightbox-img');
  galleryLightboxCaption = document.querySelector('.lightbox-caption');
  galleryCloseBtn = document.querySelector('.lightbox-close');
  galleryPrevBtn = document.querySelector('.lightbox-prev');
  galleryNextBtn = document.querySelector('.lightbox-next');

  // Add click event to all lightbox-enabled images
  galleryAllImages.forEach((img, index) => {
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
      `${window.DentalistConfig.getMessage('showImageLarger')} ${index + 1}`
    );

    // Add visual indicator that image is clickable
    img.style.cursor = 'pointer';
    img.classList.add('lightbox-clickable');
  });

  // Attach initial lightbox events
  attachLightboxEvents();

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!galleryLightbox || !galleryLightbox.classList.contains('active')) return;

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
                    <button class="lightbox-close" aria-label="${window.DentalistConfig.getMessage('closeGallery')}">&times;</button>
                    <button class="lightbox-prev" aria-label="${window.DentalistConfig.getMessage('previousImage')}">&#10094;</button>
                    <button class="lightbox-next" aria-label="${window.DentalistConfig.getMessage('nextImage')}">&#10095;</button>
                    <img class="lightbox-img" src="" alt="">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
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
      showMessage(window.DentalistConfig.getMessage('fillRequiredFields'), 'error');
      return;
    }

    // Anti-bot protection checks
    const rateLimitCheck = submissionTracker.canSubmit();
    if (!rateLimitCheck.allowed) {
      showMessage(window.DentalistConfig.getMessage('rateLimitExceeded'), 'error');
      return;
    }

    // Check honeypot field
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('🍯 Honeypot triggered - likely bot submission');
      showMessage(window.DentalistConfig.getMessage('securityBlock'), 'error');
      return;
    }

    // Check form fill time (basic bot detection)
    if (formStartTime) {
      const humanCheck = botDetector.checkFormFillTime(formStartTime);
      if (!humanCheck && botDetector.isLikelyBot()) {
        console.warn('🤖 Bot behavior detected');
        showMessage(window.DentalistConfig.getMessage('fillSlowly'), 'error');
        return;
      }
    }

    // Validate reCAPTCHA (only if enabled)
    if (window.DentalistConfig.RECAPTCHA_ENABLED) {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        showMessage(window.DentalistConfig.getMessage('confirmNotRobot'), 'error');
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
    submitBtn.innerHTML = `<span>${window.DentalistConfig.getMessage('sending')}</span>`;

    try {
      // Send email via EmailJS
      await sendContactForm(data);
      
      // Record successful submission for rate limiting
      submissionTracker.recordSubmission();
      
      // Reset bot detector
      botDetector.reset();
      formStartTime = null;
      
      // Show success message
      showMessage(window.DentalistConfig.getMessage('messageSentSuccess'), 'success');
      
      // Reset form
      contactForm.reset();
      
      // Reset reCAPTCHA (only if enabled)
      if (window.DentalistConfig.RECAPTCHA_ENABLED && typeof grecaptcha !== 'undefined') {
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
      let errorMessage = window.DentalistConfig.getMessage('errorSending');
      
      if (error.text && error.text.includes('service ID not found')) {
        errorMessage += window.DentalistConfig.getMessage('emailjsServiceNotConfigured');
      } else if (error.text && error.text.includes('template')) {
        errorMessage += window.DentalistConfig.getMessage('emailTemplateNotFound');
      } else if (error.status === 400) {
        errorMessage += window.DentalistConfig.getMessage('invalidFormData');
      } else if (error.status === 412) {
        errorMessage += window.DentalistConfig.getMessage('emailjsNotConfigured');
      } else if (error.status === 422) {
        errorMessage += window.DentalistConfig.getMessage('templateErrors');
      } else if (error.text && error.text.includes('service')) {
        errorMessage += window.DentalistConfig.getMessage('emailServiceProblem');
      } else if (!navigator.onLine) {
        errorMessage += window.DentalistConfig.getMessage('checkConnection');
      } else {
        errorMessage += `${window.DentalistConfig.getMessage('tryLater')} (Error: ${error.status || window.DentalistConfig.getMessage('unknownError')})`;
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

    // Auto-hide message after configured delay
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, window.DentalistConfig.MESSAGE_AUTO_HIDE_DELAY);
  }

  async function sendContactForm(data) {
    try {
      if (window.DentalistConfig.EMAILJS_DEBUG) {
        console.log('Sending data:', data);
      }
      
      // EmailJS template parameters
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        to_email: window.DentalistConfig.TARGET_EMAIL
      };

      // Add reCAPTCHA response only if enabled
      if (window.DentalistConfig.RECAPTCHA_ENABLED) {
        const recaptchaResponse = grecaptcha.getResponse();
        templateParams['g-recaptcha-response'] = recaptchaResponse;
      }

      if (window.DentalistConfig.EMAILJS_DEBUG) {
        console.log('Template params:', templateParams);
        console.log('Using Service ID:', window.DentalistConfig.EMAILJS_SERVICE_ID);
        console.log('Using Template ID:', window.DentalistConfig.EMAILJS_TEMPLATE_ID);
        console.log('📧 Target Email:', window.DentalistConfig.TARGET_EMAIL);
        console.log('🔧 Debug Mode:', window.DentalistConfig.DEBUG_MODE ? 'ON (Development)' : 'OFF (Production)');
        console.log('Sending to EmailJS API...');
      }

      // Send email via EmailJS
      const response = await emailjs.send(
        window.DentalistConfig.EMAILJS_SERVICE_ID,
        window.DentalistConfig.EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (window.DentalistConfig.EMAILJS_DEBUG) {
        console.log('Email sent successfully:', response);
      }
      return response;

    } catch (error) {
      console.error('EmailJS error details:', error);
      if (window.DentalistConfig.EMAILJS_DEBUG) {
        console.error('Error status:', error.status);
        console.error('Error text:', error.text);
        
        // Specific error for Service ID not found
        if (error.text && error.text.includes('service ID not found')) {
          console.error('🔥 ERROR: Service ID "' + window.DentalistConfig.EMAILJS_SERVICE_ID + '" was not found!');
          console.error('📋 Go to https://dashboard.emailjs.com/admin and check the correct Service ID');
        }
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

  // Add test data fill functionality (REMOVE IN PRODUCTION)
  const fillTestButton = document.querySelector('#fillTestData');
  if (fillTestButton && window.DentalistConfig.SHOW_TEST_BUTTON) {
    if (window.DentalistConfig.DEBUG_MODE) {
      console.log('✅ Test button found, adding event listener...');
    }
    fillTestButton.addEventListener('click', function() {
      if (window.DentalistConfig.DEBUG_MODE) {
        console.log('🧪 Test data button was clicked!');
      }
      fillTestData();
    });
    fillTestButton.style.display = 'block';
  } else if (fillTestButton && !window.DentalistConfig.SHOW_TEST_BUTTON) {
    fillTestButton.style.display = 'none';
    if (window.DentalistConfig.DEBUG_MODE) {
      console.log('🚫 Test button is hidden (SHOW_TEST_BUTTON = false)');
    }
  } else if (window.DentalistConfig.DEBUG_MODE) {
    console.log('❌ Test button was not found!');
  }

  function fillTestData() {
    if (window.DentalistConfig.DEBUG_MODE) {
      console.log('🧪 Filling test data...');
    }
    
    // Test data from config
    const testData = window.DentalistConfig.TEST_DATA;
    
    // Random selection of alternative message (50% chance)
    let selectedMessage = testData;
    if (Math.random() > 0.5 && window.DentalistConfig.ALTERNATIVE_TEST_MESSAGES) {
      const alternatives = window.DentalistConfig.ALTERNATIVE_TEST_MESSAGES;
      const randomIndex = Math.floor(Math.random() * alternatives.length);
      const randomAlt = alternatives[randomIndex];
      
      selectedMessage = {
        ...testData,
        subject: randomAlt.subject,
        message: randomAlt.message
      };
      
      if (window.DentalistConfig.DEBUG_MODE) {
        console.log('🎲 Used random alternative message:', randomAlt.subject);
      }
    }
    
    // Fill form fields
    const firstNameField = document.getElementById('firstName');
    const lastNameField = document.getElementById('lastName');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    if (window.DentalistConfig.FORM_DEBUG) {
      console.log('🔍 Checking form fields...');
      console.log('firstName field:', firstNameField ? 'found' : 'NOT FOUND');
      console.log('lastName field:', lastNameField ? 'found' : 'NOT FOUND');
      console.log('email field:', emailField ? 'found' : 'NOT FOUND');
      console.log('phone field:', phoneField ? 'found' : 'NOT FOUND');
      console.log('subject field:', subjectField ? 'found' : 'NOT FOUND');
      console.log('message field:', messageField ? 'found' : 'NOT FOUND');
    }
    
    if (firstNameField) firstNameField.value = selectedMessage.firstName;
    if (lastNameField) lastNameField.value = selectedMessage.lastName;
    if (emailField) emailField.value = selectedMessage.email;
    if (phoneField) phoneField.value = selectedMessage.phone;
    if (subjectField) subjectField.value = selectedMessage.subject;
    if (messageField) messageField.value = selectedMessage.message;
    
    // Remove any error styling from fields
    const allFields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    allFields.forEach(field => {
      field.classList.remove('error');
    });
    
    if (window.DentalistConfig.DEBUG_MODE) {
      console.log('✅ Test data filled!');
    }
    
    // Hide reCAPTCHA error if visible
    const recaptchaError = document.getElementById('recaptcha-error');
    if (recaptchaError) {
      recaptchaError.style.display = 'none';
    }
    
    const recaptchaStatus = window.DentalistConfig.RECAPTCHA_ENABLED ? 
      window.DentalistConfig.getMessage('recaptchaEnabled') : 
      window.DentalistConfig.getMessage('recaptchaDisabledStatus');
    const message = window.DentalistConfig.RECAPTCHA_ENABLED ? 
      `${window.DentalistConfig.getMessage('testDataFilled')} ${window.DentalistConfig.getMessage('confirmRecaptcha')}` :
      `${window.DentalistConfig.getMessage('testDataFilled')} ${window.DentalistConfig.getMessage('recaptchaDisabled')}`;
    
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
    
    // Update gallery aria-labels
    updateGalleryLabels();
    
    // Recreate lightbox with current language
    recreateLightbox();
  }

  // Helper function to update gallery labels
  function updateGalleryLabels() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const otherImages = document.querySelectorAll('.lightbox-enabled');
    const allImages = [...galleryImages, ...otherImages];
    
    allImages.forEach((img, index) => {
      img.setAttribute(
        'aria-label',
        `${window.DentalistConfig.getMessage('showImageLarger')} ${index + 1}`
      );
    });
  }
  
  // Helper function to update lightbox labels
  function updateLightboxLabels() {
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightbox = document.querySelector('.lightbox');
    
    if (lightboxClose) {
      lightboxClose.setAttribute('aria-label', window.DentalistConfig.getMessage('closeGallery'));
    }
    if (lightboxPrev) {
      lightboxPrev.setAttribute('aria-label', window.DentalistConfig.getMessage('previousImage'));
    }
    if (lightboxNext) {
      lightboxNext.setAttribute('aria-label', window.DentalistConfig.getMessage('nextImage'));
    }
    
    // Update caption if lightbox is currently open
    if (lightbox && lightbox.classList.contains('active') && lightboxCaption) {
      const lightboxImg = document.querySelector('.lightbox-img');
      if (lightboxImg) {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        const otherImages = document.querySelectorAll('.lightbox-enabled');
        const allImages = [...galleryImages, ...otherImages];
        
        // Find current image index
        let currentIndex = 0;
        for (let i = 0; i < allImages.length; i++) {
          if (allImages[i].src === lightboxImg.src) {
            currentIndex = i;
            break;
          }
        }
        
        const caption = lightboxImg.alt || `${window.DentalistConfig.getMessage('imageCounter')} ${currentIndex + 1}`;
        lightboxCaption.textContent = caption;
      }
    }
  }
  
  // Helper function to recreate lightbox with current language
  function recreateLightbox() {
    // Remove existing lightbox if it exists
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
      existingLightbox.remove();
    }
    
    // Create new lightbox with current language
    const lightboxHTML = `
            <div class="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="${window.DentalistConfig.getMessage('closeGallery')}">&times;</button>
                    <button class="lightbox-prev" aria-label="${window.DentalistConfig.getMessage('previousImage')}">&#10094;</button>
                    <button class="lightbox-next" aria-label="${window.DentalistConfig.getMessage('nextImage')}">&#10095;</button>
                    <img class="lightbox-img" src="" alt="">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Update global references to new lightbox elements
    galleryLightbox = document.querySelector('.lightbox');
    galleryLightboxImg = document.querySelector('.lightbox-img');
    galleryLightboxCaption = document.querySelector('.lightbox-caption');
    galleryCloseBtn = document.querySelector('.lightbox-close');
    galleryPrevBtn = document.querySelector('.lightbox-prev');
    galleryNextBtn = document.querySelector('.lightbox-next');
    
    // Re-attach event listeners for the new lightbox
    if (galleryCloseBtn && galleryPrevBtn && galleryNextBtn && galleryLightbox) {
      // Re-attach gallery functionality to new lightbox
      attachLightboxEvents();
    }
  }

  // Expose switchLanguage function globally for potential external use
  window.switchLanguage = switchLanguage;
}

// reCAPTCHA Configuration - CONFIGURATION CAN BE FOUND IN config.js
// No longer configured here - everything is in the config.js file

// If reCAPTCHA is enabled, initialize it
if (window.DentalistConfig && window.DentalistConfig.RECAPTCHA_ENABLED) {
  // Initialize reCAPTCHA (v2 or v3 based on your preference)
  // For v2:
  // grecaptcha.render('recaptcha', { 'sitekey' : window.DentalistConfig.RECAPTCHA_SITE_KEY });

  // For v3 (invisible):
  // grecaptcha.ready(function() {
  //   grecaptcha.execute(window.DentalistConfig.RECAPTCHA_SITE_KEY, {action: 'homepage'}).then(function(token) {
  //      // Add your logic to submit to your backend server here.
  //   });
  // });
}

function initRecaptchaState() {
    const contactFormSection = document.querySelector('.contact-form-section');
    
    if (!window.DentalistConfig.RECAPTCHA_ENABLED && contactFormSection) {
      // Add CSS class to hide reCAPTCHA
      contactFormSection.classList.add('recaptcha-disabled');
      if (window.DentalistConfig.RECAPTCHA_DEBUG) {
        console.log('🔒 reCAPTCHA is disabled (RECAPTCHA_ENABLED = false)');
      }
    } else if (window.DentalistConfig.RECAPTCHA_ENABLED && contactFormSection) {
      // Remove CSS class to show reCAPTCHA
      contactFormSection.classList.remove('recaptcha-disabled');
      if (window.DentalistConfig.RECAPTCHA_DEBUG) {
        console.log('🛡️ reCAPTCHA is enabled (RECAPTCHA_ENABLED = true)');
      }
    }
  }

// =============================================================================
// DARK THEME IMPLEMENTATION
// =============================================================================

// Simple dark theme toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) {
    console.log('❌ Theme toggle button not found');
    return;
  }
  
  console.log('✅ Theme toggle button found');
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
    updateRecaptchaTheme('dark');
  } else {
    updateRecaptchaTheme('light');
  }
  
  // Toggle event
  themeToggle.addEventListener('click', function() {
    console.log('🎯 Theme toggle clicked!');
    
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
      // Switch to light
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      updateThemeIcon(false);
      updateRecaptchaTheme('light');
      console.log('🌞 Switched to light theme');
    } else {
      // Switch to dark
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      updateThemeIcon(true);
      updateRecaptchaTheme('dark');
      console.log('🌙 Switched to dark theme');
    }
  });
  
  // Update icon function
  function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    const currentLang = localStorage.getItem('language') || window.DentalistConfig.DEFAULT_LANGUAGE;
    
    if (isDark) {
      icon.className = 'fas fa-sun';
      themeToggle.title = window.DentalistConfig.getMessage('switchToLight');
    } else {
      icon.className = 'fas fa-moon';
      themeToggle.title = window.DentalistConfig.getMessage('switchToDark');
    }
  }
});

// Function to update reCAPTCHA theme
function updateRecaptchaTheme(theme) {
  const recaptchaElement = document.querySelector('.g-recaptcha');
  if (!recaptchaElement) {
    console.log('⚠️ reCAPTCHA element not found');
    return;
  }
  
  try {
    // Update the data-theme attribute
    recaptchaElement.setAttribute('data-theme', theme);
    console.log(`🔄 reCAPTCHA data-theme updated to: ${theme}`);
    
    // If reCAPTCHA is already rendered, try multiple approaches to update theme
    if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse !== undefined) {
      
      // Check if reCAPTCHA is already rendered
      if (recaptchaElement.children.length > 0) {
        try {
          // Get the current widget ID
          const widgetId = recaptchaElement.getAttribute('data-widget-id');
          
          if (widgetId !== null) {
            // Reset and re-render with new theme
            grecaptcha.reset(parseInt(widgetId));
            console.log('🔄 reCAPTCHA reset with widget ID');
            
            // Re-render after reset
            setTimeout(() => {
              try {
                const newWidgetId = grecaptcha.render(recaptchaElement, {
                  'sitekey': recaptchaElement.getAttribute('data-sitekey'),
                  'theme': theme
                });
                recaptchaElement.setAttribute('data-widget-id', newWidgetId);
                console.log(`✅ reCAPTCHA re-rendered with ${theme} theme, new widget ID: ${newWidgetId}`);
              } catch (renderError) {
                console.warn('⚠️ Could not re-render reCAPTCHA:', renderError);
              }
            }, 200);
          } else {
            // Fallback: clear content and re-render
            recaptchaElement.innerHTML = '';
            setTimeout(() => {
              try {
                const newWidgetId = grecaptcha.render(recaptchaElement, {
                  'sitekey': recaptchaElement.getAttribute('data-sitekey'),
                  'theme': theme
                });
                recaptchaElement.setAttribute('data-widget-id', newWidgetId);
                console.log(`✅ reCAPTCHA rendered fresh with ${theme} theme, widget ID: ${newWidgetId}`);
              } catch (renderError) {
                console.warn('⚠️ Could not render fresh reCAPTCHA:', renderError);
              }
            }, 200);
          }
        } catch (resetError) {
          console.warn('⚠️ Could not reset reCAPTCHA:', resetError);
          // Force re-render by clearing and re-creating
          recaptchaElement.innerHTML = '';
          setTimeout(() => {
            try {
              const newWidgetId = grecaptcha.render(recaptchaElement, {
                'sitekey': recaptchaElement.getAttribute('data-sitekey'),
                'theme': theme
              });
              recaptchaElement.setAttribute('data-widget-id', newWidgetId);
              console.log(`✅ reCAPTCHA force-rendered with ${theme} theme`);
            } catch (renderError) {
              console.warn('⚠️ Could not force-render reCAPTCHA:', renderError);
            }
          }, 300);
        }
      } else {
        console.log('📝 reCAPTCHA not yet rendered, theme will be applied on load');
      }
    } else {
      console.log('📝 reCAPTCHA API not loaded yet, theme will be applied on load');
    }
    
    console.log(`🔄 reCAPTCHA theme updated to: ${theme}`);
  } catch (error) {
    console.warn('⚠️ Could not update reCAPTCHA theme:', error);
  }
}

// =============================================================================
// RECAPTCHA CALLBACK FOR THEME INITIALIZATION
// =============================================================================

// Global callback for reCAPTCHA when it's ready
window.onRecaptchaReady = function() {
  console.log('🛡️ reCAPTCHA API loaded');
  
  const recaptchaElement = document.querySelector('.g-recaptcha');
  if (!recaptchaElement) {
    console.log('⚠️ reCAPTCHA element not found');
    return;
  }
  
  // Set initial theme based on current state
  const isDark = document.body.classList.contains('dark-theme');
  const theme = isDark ? 'dark' : 'light';
  
  // Update the data-theme attribute
  recaptchaElement.setAttribute('data-theme', theme);
  
  try {
    // Render reCAPTCHA with correct theme
    const widgetId = grecaptcha.render(recaptchaElement, {
      'sitekey': recaptchaElement.getAttribute('data-sitekey'),
      'theme': theme
    });
    
    // Store widget ID for future theme changes
    recaptchaElement.setAttribute('data-widget-id', widgetId);
    console.log(`✅ reCAPTCHA rendered with ${theme} theme, widget ID: ${widgetId}`);
  } catch (error) {
    console.warn('⚠️ Could not render reCAPTCHA:', error);
  }
};

// =============================================================================
// ANTI-BOT PROTECTION SYSTEM
// =============================================================================

// Email obfuscation to protect from spam bots
function createObfuscatedEmail(user, domain, displayText = null) {
  const email = user + '@' + domain;
  const obfuscated = btoa(email); // Base64 encode
  const display = displayText || email;
  
  return `<a href="#" data-email="${obfuscated}" class="obfuscated-email" onclick="return revealEmail(this)">${display}</a>`;
}

// Reveal email when clicked (human interaction)
function revealEmail(element) {
  try {
    const obfuscated = element.getAttribute('data-email');
    const email = atob(obfuscated); // Base64 decode
    element.href = 'mailto:' + email;
    element.onclick = null; // Remove the onclick handler
    
    // Optional: Update the displayed text to show the actual email
    if (element.textContent === element.getAttribute('data-original-text')) {
      element.textContent = email;
    }
    
    // Trigger the mailto
    window.location.href = 'mailto:' + email;
    return false;
  } catch (error) {
    console.warn('Email reveal failed:', error);
    return false;
  }
}

// Initialize email protection on page load
function initEmailProtection() {
  // Find all email links and obfuscate them
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    const href = link.getAttribute('href');
    const email = href.replace('mailto:', '');
    const parts = email.split('@');
    
    if (parts.length === 2) {
      const user = parts[0];
      const domain = parts[1];
      const displayText = link.textContent;
      
      // Store original text
      link.setAttribute('data-original-text', displayText);
      
      // Obfuscate
      const obfuscated = btoa(email);
      link.setAttribute('data-email', obfuscated);
      link.setAttribute('href', '#');
      link.setAttribute('onclick', 'return revealEmail(this)');
      
      console.log(`🔒 Email protected: ${email}`);
    }
  });
  
  // Protect plain text emails in footer and other places
  const textNodes = document.querySelectorAll('p, div, span');
  textNodes.forEach(node => {
    if (node.textContent.includes('@') && node.textContent.includes('.')) {
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const matches = node.textContent.match(emailRegex);
      
      if (matches) {
        matches.forEach(email => {
          if (email === 'info@dentalist.cz') {
            const parts = email.split('@');
            const obfuscated = btoa(email);
            const span = document.createElement('span');
            span.setAttribute('data-email', obfuscated);
            span.setAttribute('onclick', 'return revealEmail(this)');
            span.className = 'obfuscated-email clickable-email';
            span.style.cursor = 'pointer';
            span.style.textDecoration = 'underline';
            span.textContent = email;
            
            // Replace in text content
            node.innerHTML = node.innerHTML.replace(email, span.outerHTML);
            console.log(`🔒 Plain text email protected: ${email}`);
          }
        });
      }
    }
  });
}

// Honeypot field detection
function createHoneypot() {
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website'; // Common bot field name
  honeypot.id = 'website';
  honeypot.style.position = 'absolute';
  honeypot.style.left = '-9999px';
  honeypot.style.width = '1px';
  honeypot.style.height = '1px';
  honeypot.style.opacity = '0';
  honeypot.style.pointerEvents = 'none';
  honeypot.tabIndex = -1;
  honeypot.setAttribute('autocomplete', 'off');
  
  return honeypot;
}

// Rate limiting for form submissions
const submissionTracker = {
  submissions: [],
  maxSubmissions: 3,
  timeWindow: 300000, // 5 minutes in milliseconds
  
  canSubmit() {
    const now = Date.now();
    
    // Remove old submissions outside time window
    this.submissions = this.submissions.filter(time => now - time < this.timeWindow);
    
    // Check if under limit
    if (this.submissions.length >= this.maxSubmissions) {
      const oldestSubmission = Math.min(...this.submissions);
      const timeUntilNext = Math.ceil((oldestSubmission + this.timeWindow - now) / 60000);
      
      console.warn(`⚠️ Rate limit exceeded. Try again in ${timeUntilNext} minutes.`);
      return {
        allowed: false,
        message: `Příliš mnoho pokusů. Zkuste to znovu za ${timeUntilNext} minut.`,
        messageEn: `Too many attempts. Try again in ${timeUntilNext} minutes.`
      };
    }
    
    return { allowed: true };
  },
  
  recordSubmission() {
    this.submissions.push(Date.now());
    console.log(`📝 Submission recorded. Count: ${this.submissions.length}/${this.maxSubmissions}`);
  }
};

// Bot behavior detection
const botDetector = {
  suspiciousActivity: 0,
  flags: [],
  
  checkFormFillTime(startTime) {
    const fillTime = Date.now() - startTime;
    const minHumanTime = 5000; // 5 seconds minimum for human
    
    if (fillTime < minHumanTime) {
      this.suspiciousActivity++;
      this.flags.push('Fast form fill');
      console.warn(`⚠️ Suspicious: Form filled too quickly (${fillTime}ms)`);
      return false;
    }
    return true;
  },
  
  checkMouseActivity() {
    // This would be set by mouse movement listeners
    const hasMouseActivity = window.humanMouseActivity || false;
    if (!hasMouseActivity) {
      this.suspiciousActivity++;
      this.flags.push('No mouse activity');
      console.warn('⚠️ Suspicious: No mouse activity detected');
      return false;
    }
    return true;
  },
  
  isLikelyBot() {
    return this.suspiciousActivity >= 2;
  },
  
  reset() {
    this.suspiciousActivity = 0;
    this.flags = [];
  }
};

// Human activity tracking
let humanMouseActivity = false;
let humanKeyboardActivity = false;
let formStartTime = null;

// Track human mouse activity
document.addEventListener('mousemove', function() {
  if (!humanMouseActivity) {
    humanMouseActivity = true;
    window.humanMouseActivity = true;
    console.log('👆 Human mouse activity detected');
  }
});

// Track human keyboard activity
document.addEventListener('keydown', function() {
  if (!humanKeyboardActivity) {
    humanKeyboardActivity = true;
    window.humanKeyboardActivity = true;
    console.log('⌨️ Human keyboard activity detected');
  }
});

// Initialize form protection
function initFormProtection() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    console.log('❌ Contact form not found');
    return;
  }
  
  // Add honeypot field
  const honeypot = createHoneypot();
  contactForm.appendChild(honeypot);
  console.log('🍯 Honeypot field added to form');
  
  // Track when user starts interacting with form
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (!formStartTime) {
        formStartTime = Date.now();
        console.log('⏱️ Form interaction started');
      }
    });
  });
  
  console.log('🛡️ Form protection initialized');
}

// =============================================================================
