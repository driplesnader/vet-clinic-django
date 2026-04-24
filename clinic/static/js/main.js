// ============================================
// Функция 1: Адаптивное бургер-меню для мобильных устройств
// ============================================
// Создаём иконку-бургер, если её нет в шапке
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.main-nav');
    const headerInner = document.querySelector('.header-inner');
    
    // Создаём кнопку-бургер
    const burger = document.createElement('div');
    burger.className = 'burger-menu';
    burger.innerHTML = '<span></span><span></span><span></span>';
    
    // Добавляем бургер в шапку, если его ещё нет
    if (!document.querySelector('.burger-menu') && window.innerWidth <= 768) {
        headerInner.appendChild(burger);
    }
    
    // Обработчик клика по бургеру
    if (burger) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
    
    // При изменении размера окна проверяем, нужен ли бургер
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.burger-menu')) {
                headerInner.appendChild(burger);
            }
        } else {
            const existingBurger = document.querySelector('.burger-menu');
            if (existingBurger) {
                existingBurger.remove();
                nav.classList.remove('nav-active');
            }
        }
    });
});

// ============================================
// Функция 2: Валидация формы записи на стороне клиента
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            let hasError = false;
            
            // Проверка поля телефона (минимум 10 символов)
            const phone = document.querySelector('#id_owner_phone');
            const phoneError = document.querySelector('.phone-error');
            
            if (phone && phone.value.trim().length < 10) {
                e.preventDefault();
                hasError = true;
                
                if (!phoneError) {
                    const error = document.createElement('div');
                    error.className = 'phone-error error-message';
                    error.style.color = 'red';
                    error.style.fontSize = '12px';
                    error.style.marginTop = '5px';
                    error.textContent = 'Введите корректный номер телефона (минимум 10 цифр)';
                    phone.parentNode.appendChild(error);
                }
            } else if (phoneError) {
                phoneError.remove();
            }
            
            // Проверка поля даты (нельзя выбрать прошедшую дату)
            const dateField = document.querySelector('#id_appointment_date');
            if (dateField && dateField.value) {
                const selectedDate = new Date(dateField.value);
                const now = new Date();
                if (selectedDate < now) {
                    e.preventDefault();
                    hasError = true;
                    alert('Нельзя выбрать дату и время в прошлом. Пожалуйста, выберите будущую дату.');
                }
            }
            
            // Проверка поля имени владельца (не пустое)
            const ownerName = document.querySelector('#id_owner_name');
            if (ownerName && ownerName.value.trim() === '') {
                e.preventDefault();
                hasError = true;
                alert('Пожалуйста, укажите имя владельца');
            }
            
            // Проверка клички питомца (не пустое)
            const petName = document.querySelector('#id_pet');
            if (petName && petName.value.trim() === '') {
                e.preventDefault();
                hasError = true;
                alert('Пожалуйста, укажите кличку питомца');
            }
            
            if (!hasError) {
                // Показываем сообщение об отправке
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.textContent = 'Отправка...';
                    submitBtn.disabled = true;
                }
            }
        });
        
        // Очистка ошибки телефона при вводе
        const phone = document.querySelector('#id_owner_phone');
        if (phone) {
            phone.addEventListener('input', function() {
                const phoneError = document.querySelector('.phone-error');
                if (phoneError) {
                    phoneError.remove();
                }
            });
        }
    }
});

// ============================================
// Функция 3: Живой поиск по карточкам врачей
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Создаём поле поиска на странице врачей
    const doctorsGrid = document.querySelector('.doctors-grid');
    const doctorsTitle = document.querySelector('.page-title');
    
    if (doctorsGrid && doctorsTitle) {
        // Создаём контейнер для поиска
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.marginBottom = '20px';
        searchContainer.style.textAlign = 'center';
        
        // Создаём поле ввода
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Поиск врача по имени или специальности...';
        searchInput.className = 'doctor-search-input';
        searchInput.style.padding = '10px';
        searchInput.style.width = '100%';
        searchInput.style.maxWidth = '400px';
        searchInput.style.borderRadius = '8px';
        searchInput.style.border = '1px solid #ddd';
        searchInput.style.fontSize = '16px';
        
        searchContainer.appendChild(searchInput);
        doctorsTitle.parentNode.insertBefore(searchContainer, doctorsGrid);
        
        // Функция фильтрации карточек
        function filterDoctors() {
            const query = searchInput.value.toLowerCase().trim();
            const doctorCards = document.querySelectorAll('.doctor-card');
            let visibleCount = 0;
            
            doctorCards.forEach(card => {
                const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const speciality = card.querySelector('.muted')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.vet-description')?.textContent.toLowerCase() || '';
                
                if (name.includes(query) || speciality.includes(query) || description.includes(query)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Показываем сообщение, если ничего не найдено
            let noResultsMsg = document.querySelector('.no-results-message');
            if (visibleCount === 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.style.textAlign = 'center';
                    noResultsMsg.style.padding = '40px';
                    noResultsMsg.style.color = '#666';
                    noResultsMsg.textContent = '😔 По вашему запросу ничего не найдено. Попробуйте изменить критерии поиска.';
                    doctorsGrid.parentNode.insertBefore(noResultsMsg, doctorsGrid.nextSibling);
                }
            } else {
                if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            }
        }
        
        searchInput.addEventListener('input', filterDoctors);
    }
});

// ============================================
// Функция 4: Автоматическое заполнение даты в форме записи
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const dateField = document.querySelector('#id_appointment_date');
    
    if (dateField && !dateField.value) {
        // Устанавливаем дату: сегодня + 1 день
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0); // Устанавливаем на 10:00 утра
        
        // Форматируем для datetime-local (YYYY-MM-DDTHH:MM)
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const hours = String(tomorrow.getHours()).padStart(2, '0');
        const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
        
        dateField.value = `${year}-${month}-${day}T${hours}:${minutes}`;
        
        // Добавляем подсказку
        const hint = document.createElement('small');
        hint.style.display = 'block';
        hint.style.color = '#666';
        hint.style.fontSize = '12px';
        hint.style.marginTop = '5px';
        hint.textContent = '💡 Автоматически предложена дата завтра. Вы можете изменить её при необходимости.';
        dateField.parentNode.appendChild(hint);
    }
});

// ============================================
// Функция 5: Плавная прокрутка к форме записи
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки "Записаться" на странице
    const bookButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    bookButtons.forEach(button => {
        // Проверяем, ведёт ли кнопка на страницу записи
        const href = button.getAttribute('href');
        if (href && href.includes('appointment')) {
            button.addEventListener('click', function(e) {
                // Если это якорь на той же странице
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    });
    
    // Если пользователь пришёл на главную и нажал "Записаться" с якорем #appointment
    const hash = window.location.hash;
    if (hash === '#appointment') {
        const formSection = document.querySelector('.form-panel, .appointment-section');
        if (formSection) {
            setTimeout(() => {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        }
    }
});

// ============================================
// Функция 6: Динамическое обновление года в подвале
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        const text = copyright.textContent;
        // Обновляем год в копирайте
        const updatedText = text.replace(/2025|2026|2027/, currentYear);
        copyright.textContent = updatedText;
    }
});
// ============================================
// Функция 6: Кнопка "Наверх" (Scroll to Top)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Создаём кнопку
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '⬆ Наверх';
    scrollBtn.id = 'scrollToTopBtn';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #ff7fa3;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: none;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    scrollBtn.innerHTML = '⬆';
    document.body.appendChild(scrollBtn);
    
    // Показываем/скрываем кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Прокрутка наверх при клике
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});