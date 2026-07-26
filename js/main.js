/* ========================================
   NEXUS GAMES - Основной JavaScript
   Gaming Marketplace Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // 2. Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // ========================================
    // 3. Countdown Timer
    // ========================================
    function initCountdownTimer() {
        const timerElements = document.querySelectorAll('.timer');
        
        timerElements.forEach(timer => {
            const hoursEl = timer.querySelector('.timer-hours');
            const minutesEl = timer.querySelector('.timer-minutes');
            const secondsEl = timer.querySelector('.timer-seconds');
            
            // Set countdown to 24 hours from now
            let totalSeconds = 24 * 60 * 60;
            
            const updateTimer = () => {
                if (totalSeconds <= 0) {
                    totalSeconds = 24 * 60 * 60; // Reset
                }
                
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                
                if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
                if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
                if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
                
                totalSeconds--;
            };
            
            updateTimer();
            setInterval(updateTimer, 1000);
        });
    }
    
    initCountdownTimer();
    
    // ========================================
    // 4. Product Tabs & Filtering
    // ========================================
    function initProductTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const productCards = document.querySelectorAll('.product-card');
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all tabs
                tabButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked tab
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                // Filter products
                productCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('fade-in');
                    }
                });
            });
        });
    }
    
    initProductTabs();
    
    // ========================================
    // 5. FAQ Accordion
    // ========================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    initFAQ();
    
    // ========================================
    // 6. Reviews Slider
    // ========================================
    function initReviewsSlider() {
        const track = document.querySelector('.reviews-track');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (!track || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        const cardWidth = 365; // card width + gap
        
        const updateSlider = () => {
            const maxIndex = Math.ceil(track.children.length - 3);
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        };
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.ceil(track.children.length - 3);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
        
        // Auto-scroll every 5 seconds
        setInterval(() => {
            const maxIndex = Math.ceil(track.children.length - 3);
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateSlider();
        }, 5000);
    }
    
    initReviewsSlider();
    
    // ========================================
    // 7. Modal System (Login & Checkout)
    // ========================================
    function initModals() {
        // Login Modal
        const loginBtns = document.querySelectorAll('[data-modal="login"]');
        const loginModal = document.getElementById('loginModal');
        
        loginBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(loginModal);
            });
        });
        
        // Checkout Modal
        const checkoutBtns = document.querySelectorAll('[data-modal="checkout"]');
        const checkoutModal = document.getElementById('checkoutModal');
        
        checkoutBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.new-price').textContent;
                
                // Update modal content
                document.querySelector('.checkout-product-name').textContent = productName;
                document.querySelector('.checkout-total-amount').textContent = productPrice;
                
                openModal(checkoutModal);
            });
        });
        
        // Close modals
        const closeButtons = document.querySelectorAll('.modal-close');
        const overlays = document.querySelectorAll('.modal-overlay');
        
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const overlay = btn.closest('.modal-overlay');
                closeModal(overlay);
            });
        });
        
        // Close on overlay click
        overlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeModal(overlay);
                }
            });
        });
        
        // Payment options selection
        const paymentOptions = document.querySelectorAll('.payment-option');
        paymentOptions.forEach(option => {
            option.addEventListener('click', () => {
                paymentOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    }
    
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.classList.add('scroll-hidden');
    }
    
    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.classList.remove('scroll-hidden');
    }
    
    initModals();
    
    // ========================================
    // 8. Search Functionality
    // ========================================
    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (!searchInput || !searchBtn) return;
        
        const performSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            
            if (query) {
                // Scroll to products section
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Filter products by name
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    const title = card.querySelector('.product-title').textContent.toLowerCase();
                    
                    if (title.includes(query)) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Activate "All hits" tab
                const allTab = document.querySelector('[data-filter="all"]');
                if (allTab) {
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    allTab.classList.add('active');
                }
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    initSearch();
    
    // ========================================
    // 9. Quick Tags Filter
    // ========================================
    function initQuickTags() {
        const tags = document.querySelectorAll('.tag');
        
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                const searchTerm = tag.textContent.replace('#', '');
                const searchInput = document.querySelector('.search-input');
                
                if (searchInput) {
                    searchInput.value = searchTerm;
                    searchInput.dispatchEvent(new Event('keypress'));
                }
            });
        });
    }
    
    initQuickTags();
    
    // ========================================
    // 10. Category Cards Animation
    // ========================================
    function initCategoryAnimations() {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    initCategoryAnimations();
    
    // ========================================
    // 11. Ripple Effect on Buttons
    // ========================================
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn-ripple, .btn-primary, .btn-success');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.marginLeft = '-50px';
                ripple.style.marginTop = '-50px';
                ripple.style.pointerEvents = 'none';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    initRippleEffect();
    
    // ========================================
    // 12. Intersection Observer for Animations
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animateElements = document.querySelectorAll('.category-card, .product-card, .feature-card, .review-card, .faq-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }
    
    initScrollAnimations();
    
    // ========================================
    // 13. Currency Switcher
    // ========================================
    function initCurrencySwitcher() {
        const currencySelector = document.querySelector('.currency-selector');
        
        if (currencySelector) {
            currencySelector.addEventListener('change', (e) => {
                const currency = e.target.value;
                const prices = document.querySelectorAll('.new-price, .old-price');
                
                // Simple conversion demo (in real app, fetch actual rates)
                const rates = {
                    'KZT': 1,
                    'RUB': 0.85,
                    'USD': 0.0022
                };
                
                prices.forEach(price => {
                    const originalPrice = parseFloat(price.dataset.original) || 
                                         parseFloat(price.textContent.replace(/\D/g, ''));
                    
                    if (!price.dataset.original) {
                        price.dataset.original = originalPrice;
                    }
                    
                    const convertedPrice = (originalPrice * rates[currency]).toFixed(0);
                    
                    const symbols = {
                        'KZT': '₸',
                        'RUB': '₽',
                        'USD': '$'
                    };
                    
                    price.textContent = `${convertedPrice} ${symbols[currency]}`;
                });
            });
        }
    }
    
    initCurrencySwitcher();
    
    // ========================================
    // 14. Smooth Scroll for Navigation Links
    // ========================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    initSmoothScroll();
    
    // ========================================
    // 15. Form Validation (Login/Checkout)
    // ========================================
    function initFormValidation() {
        const loginForm = document.getElementById('loginForm');
        const checkoutForm = document.getElementById('checkoutForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = loginForm.querySelector('input[type="email"]').value;
                const password = loginForm.querySelector('input[type="password"]').value;
                
                if (email && password) {
                    // Simulate login
                    alert('Вход выполнен успешно! Добро пожаловать в NEXUS GAMES!');
                    closeModal(document.getElementById('loginModal'));
                }
            });
        }
        
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const selectedPayment = document.querySelector('.payment-option.selected');
                
                if (selectedPayment) {
                    // Simulate purchase
                    alert('Покупка оформлена! Ключ активации отправлен на вашу почту.');
                    closeModal(document.getElementById('checkoutModal'));
                } else {
                    alert('Пожалуйста, выберите способ оплаты.');
                }
            });
        }
    }
    
    initFormValidation();
    
    console.log('🎮 NEXUS GAMES initialized successfully!');
});

// ========================================
// Additional Utility Functions
// ========================================

// Format price with spaces (e.g., 4 500 instead of 4500)
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Get random number between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local Storage Helper
const Storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};
