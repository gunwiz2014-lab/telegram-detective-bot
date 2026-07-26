/**
 * NEXUS GAMES - Main JavaScript
 * Функционал игрового маркетплейса
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Анимация иконки меню
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
    
    // ========================================
    // HERO TIMER COUNTDOWN
    // ========================================
    const heroTimer = document.getElementById('heroTimer');
    if (heroTimer) {
        let hours = 23;
        let minutes = 45;
        let seconds = 30;
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        function updateTimer() {
            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        hours = 23;
                    }
                }
            }
            
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        setInterval(updateTimer, 1000);
    }
    
    // ========================================
    // TABS FUNCTIONALITY
    // ========================================
    const tabs = document.querySelectorAll('.tab');
    const productCards = document.querySelectorAll('.product-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущему табу
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-tab');
            
            // Фильтрация товаров
            productCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
                    card.style.display = 'block';
                    // Анимация появления
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Закрываем все остальные
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Если не был активным, открываем
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // ========================================
    // REVIEWS SLIDER
    // ========================================
    const reviewsSlider = document.getElementById('reviewsSlider');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    
    if (reviewsSlider && prevBtn && nextBtn) {
        const scrollAmount = 374; // ширина карточки + отступ
        
        prevBtn.addEventListener('click', () => {
            reviewsSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            reviewsSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Автопрокрутка
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (reviewsSlider.scrollLeft + reviewsSlider.clientWidth >= reviewsSlider.scrollWidth - 10) {
                    reviewsSlider.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    reviewsSlider.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }, 5000);
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Останавливаем автопрокрутку при взаимодействии
        reviewsSlider.addEventListener('mouseenter', stopAutoScroll);
        reviewsSlider.addEventListener('mouseleave', startAutoScroll);
        
        // Запускаем автопрокрутку
        startAutoScroll();
    }
    
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(19, 24, 35, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(19, 24, 35, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
    
    // ========================================
    // SEARCH BAR FUNCTIONALITY
    // ========================================
    const searchInput = document.querySelector('.search-bar__input');
    const searchBtn = document.querySelector('.search-bar__btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Здесь можно добавить логику поиска
                console.log('Поиск:', query);
                // Плавный скролл к каталогу
                document.getElementById('catalog').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Игнорируем пустые ссылки и теги
            if (href === '#' || href.startsWith('#tag')) {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    const animatedElements = document.querySelectorAll('.category-card, .product-card, .benefit-card, .review-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================
    // CURRENCY SELECTOR
    // ========================================
    const currencySelect = document.querySelector('.currency-select');
    
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            const selectedCurrency = this.value;
            console.log('Выбрана валюта:', selectedCurrency);
            
            // Здесь можно добавить логику конвертации цен
            // Например, обновление всех элементов с ценами
        });
    }
    
    // ========================================
    // BUTTON CLICK EFFECTS
    // ========================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Эффект ripple для кнопок
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                animation: ripple-effect 0.6s linear;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Добавляем стили для ripple эффекта
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // LAZY LOADING FOR IMAGES
    // ========================================
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    console.log('NEXUS GAMES initialized successfully! 🎮');
});
