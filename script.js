// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Highlight active navigation link based on scroll position
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
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
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
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
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Here you could add lightbox functionality
            // For now, we'll just add a simple click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You could implement a modal/lightbox here
            console.log(`Gallery item ${index + 1} clicked`);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .gallery-item, .pricing-item, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    // If you add a contact form later, this function will handle it
    const contactSection = document.querySelector('#contact');
    
    // Example: Add click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks for analytics if needed
            console.log('Phone number clicked:', this.getAttribute('href'));
        });
    });
    
    // Example: Add click-to-email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks for analytics if needed
            console.log('Email clicked:', this.getAttribute('href'));
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu on window resize if it's large enough
        window.addEventListener('resize', function() {
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
    
    window.addEventListener('scroll', function() {
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
        const later = function() {
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
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = throttle(function() {
    // Any scroll-related functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images (if you add real images later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an analytics service
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
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
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_location: e.target.getAttribute('href') || 'unknown'
        });
    }
});

// Accessibility improvements
function initAccessibility() {
    // Skip to main content link
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            const focusableElements = document.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];
            
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
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections before printing
        document.querySelectorAll('.nav-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
    
    window.addEventListener('afterprint', function() {
        // Restore normal styles after printing
        document.querySelectorAll('.nav-menu').forEach(menu => {
            menu.style.display = '';
        });
    });
}

initPrintStyles();

// Language switcher functionality
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithTranslation = document.querySelectorAll('[data-cs][data-en]');
    
    // Get saved language from localStorage or default to Czech
    let currentLanguage = localStorage.getItem('language') || 'cs';
    
    // Apply saved language on load
    switchLanguage(currentLanguage);
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
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
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update text content
        elementsWithTranslation.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update document language attribute
        document.documentElement.setAttribute('lang', lang);
        
        // Update page title
        const titles = {
            'cs': 'Dentalist - Moderní stomatologická ordinace',
            'en': 'Dentalist - Modern Dental Practice'
        };
        document.title = titles[lang];
    }
    
    // Expose switchLanguage function globally for potential external use
    window.switchLanguage = switchLanguage;
}
