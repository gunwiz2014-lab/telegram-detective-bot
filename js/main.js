/**
 * NEXUS GAMES - Основной JavaScript
 * Интерактивный функционал лендинга
 */

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация всех модулей
  initMobileMenu();
  initTimer();
  initTabs();
  initAccordion();
  initReviewsSlider();
  initScrollAnimations();
  initRippleEffect();
  initCurrencySelector();
  initSearchScroll();
});

/**
 * Мобильное меню
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-menu-link');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

/**
 * Таймер обратного отсчета
 */
function initTimer() {
  const timerElement = document.querySelector('.hero-card-timer-value');
  if (!timerElement) return;
  
  // Устанавливаем время окончания акции (24 часа от текущего момента)
  let endTime = localStorage.getItem('nexus_promo_end');
  
  if (!endTime) {
    endTime = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('nexus_promo_end', endTime);
  }
  
  function updateTimer() {
    const now = Date.now();
    const remaining = Math.max(0, endTime - now);
    
    if (remaining === 0) {
      // Сброс таймера
      endTime = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem('nexus_promo_end', endTime);
    }
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    timerElement.textContent = 
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * Табы товаров
 */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const productGrids = document.querySelectorAll('.products-grid');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      
      // Удаляем активный класс у всех кнопок
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс нажатой кнопке
      button.classList.add('active');
      
      // Скрываем все сетки товаров
      productGrids.forEach(grid => {
        grid.style.display = 'none';
        grid.classList.remove('visible');
      });
      
      // Показываем нужную сетку
      const targetGrid = document.querySelector(`.products-grid[data-category="${target}"]`);
      if (targetGrid) {
        setTimeout(() => {
          targetGrid.style.display = 'grid';
          setTimeout(() => targetGrid.classList.add('visible'), 50);
        }, 100);
      }
    });
  });
}

/**
 * Аккордеон FAQ
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    if (!header || !content) return;
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Закрываем все остальные items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = '0';
        }
      });
      
      // Переключаем текущий item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Слайдер отзывов
 */
function initReviewsSlider() {
  const track = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.reviews-prev');
  const nextBtn = document.querySelector('.reviews-next');
  const cards = document.querySelectorAll('.review-card');
  
  if (!track || !prevBtn || !nextBtn || cards.length === 0) return;
  
  let currentIndex = 0;
  const totalCards = cards.length;
  
  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  function updateSlider() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    currentIndex = Math.min(Math.max(0, currentIndex), maxIndex);
    
    const cardWidth = cards[0].offsetWidth + 24; // 24px gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Обновляем состояние кнопок
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
  }
  
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });
  
  // Автопрокрутка
  let autoScrollInterval = setInterval(() => {
    const cardsPerView = getCardsPerView();
    if (currentIndex >= totalCards - cardsPerView) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  }, 5000);
  
  // Остановка автопрокрутки при наведении
  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
      const cardsPerView = getCardsPerView();
      if (currentIndex >= totalCards - cardsPerView) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateSlider();
    }, 5000);
  });
  
  // Пересчет при изменении размера окна
  window.addEventListener('resize', updateSlider);
  
  // Инициализация
  updateSlider();
}

/**
 * Анимации при скролле (Intersection Observer)
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  
  if (elements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

/**
 * Ripple эффект на кнопках
 */
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/**
 * Переключатель валют
 */
function initCurrencySelector() {
  const selector = document.querySelector('.currency-selector');
  const currencies = ['KZT', 'RUB', 'USD'];
  let currentIndex = 0;
  
  if (!selector) return;
  
  selector.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currencies.length;
    selector.innerHTML = `
      <span>💱</span>
      <span>${currencies[currentIndex]}</span>
      <span>▼</span>
    `;
    
    // Здесь можно добавить логику конвертации цен
    console.log(`Валюта переключена на: ${currencies[currentIndex]}`);
  });
}

/**
 * Плавный скролл к результатам поиска
 */
function initSearchScroll() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  const productsSection = document.querySelector('#products');
  
  if (!searchInput || !searchBtn || !productsSection) return;
  
  function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Здесь можно добавить фильтрацию товаров
      console.log('Поиск:', query);
    }
  }
  
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  
  // Обработка быстрых тегов
  const quickTags = document.querySelectorAll('.quick-tag');
  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const tagText = tag.textContent.replace('#', '');
      searchInput.value = tagText;
      handleSearch();
    });
  });
}

/**
 * Утилита для форматирования цены
 */
function formatPrice(price, currency = 'KZT') {
  const symbols = {
    KZT: '₸',
    RUB: '₽',
    USD: '$'
  };
  
  return new Intl.NumberFormat('ru-RU').format(price) + ' ' + symbols[currency];
}

/**
 * Утилита для получения начальных букв имени
 */
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Экспорт утилит для внешнего использования
window.NexusUtils = {
  formatPrice,
  getInitials
};
