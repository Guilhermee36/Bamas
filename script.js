// Funções compartilhadas
function setupMobileMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}

// Página Inicial
function setupHomePage() {
    if (document.querySelector('.slideshow-container')) {
        // Configuração do slideshow
        const slides = [
            {image: 'img/slides1.jpeg' },
            {image: 'img/slides2.jpeg' },
            {image: 'img/slides3.jpg'  },
        ];
        
        const slideshowContainer = document.querySelector('.slideshow-container');
        
        slides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            slideDiv.style.backgroundImage = `url(${slide.image})`;
            slideDiv.style.display = index === 0 ? 'block' : 'none';
            
            const caption = document.createElement('div');
            caption.className = 'slide-caption';
            caption.textContent = slide.caption;
            slideDiv.appendChild(caption);
            
            slideshowContainer.appendChild(slideDiv);
        });
        
        let currentSlide = 0;
        const allSlides = document.querySelectorAll('.slide');
        
        function nextSlide() {
            allSlides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % allSlides.length;
            allSlides[currentSlide].style.display = 'block';
        }
        
        setInterval(nextSlide, 5000);
    }
}

function setupEventsPage() {
    const events = [
        { date: '15/10/2023', title: 'Desfile Cívico', location: 'Centro da Cidade' },
        { date: '20/11/2023', title: 'Festa da Música', location: 'Teatro Municipal' },
        { date: '05/12/2023', title: 'Apresentação de Final de Ano', location: 'Escola Saad Bechara' }
    ];

    const eventsList = document.getElementById('events-list');
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    // Renderizar eventos na lista
    function renderEventsList() {
        eventsList.innerHTML = '';
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-card';

            eventDiv.innerHTML = `
                <h4>${event.title}</h4>
                <p><strong>Data:</strong> ${event.date}</p>
                <p><strong>Local:</strong> ${event.location}</p>
            `;

            eventsList.appendChild(eventDiv);
        });
    }

    // Renderizar calendário
    function renderCalendar() {
        calendarDays.innerHTML = '';

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Atualizar o título do mês
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        // Primeiro dia do mês
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();

        // Número de dias no mês
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Dias vazios no início
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }

        // Dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';

            dayElement.innerHTML = `
                <div class="calendar-day-number">${i}</div>
            `;

            // Adicionar eventos que ocorrem neste dia
            events.forEach(event => {
                const [day, month, year] = event.date.split('/').map(Number);
                if (day === i && month === currentMonth + 1 && year === currentYear) {
                    dayElement.innerHTML += `
                        <div class="event-badge">${event.title}</div>
                    `;
                }
            });

            calendarDays.appendChild(dayElement);
        }
    }

    // Navegar para o mês anterior
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // Navegar para o próximo mês
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Inicializar
    renderEventsList();
    renderCalendar();
}

// Página de Galeria
function setupGalleryPage() {
    if (document.querySelector('.gallery-container')) {
        const galleryImages = [
            {src: 'img/slides1.jpeg', category: 'eventos', caption: 'Desfile de Aniversário da Cidade'},
            {src: 'img/slides2.jpeg', category: 'ensaios', caption: 'Ensaio Semanal'},
            {src: 'img/slides3.jpg', category: 'eventos', caption: 'Competição Regional'},
            {src: 'img/slide4.jpeg', category: 'fotos', caption: 'Grupo Completo'},
            {src: 'img/slides1.jpeg', category: 'ensaios', caption: 'Preparação para Evento'},
            {src: 'img/slides2.jpeg', category: 'eventos', caption: 'Apresentação no Teatro'}
        ];
        
        const galleryContainer = document.querySelector('.gallery-container');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.close-btn');
        
        // Renderizar imagens
        function renderGallery(filter = 'all') {
            galleryContainer.innerHTML = '';
            
            galleryImages.forEach(image => {
                if (filter === 'all' || image.category === filter) {
                    const imgDiv = document.createElement('div');
                    imgDiv.className = `gallery-item ${image.category}`;
                    
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.caption;
                    img.dataset.caption = image.caption;
                    
                    imgDiv.appendChild(img);
                    galleryContainer.appendChild(imgDiv);
                    
                    // Abrir lightbox ao clicar
                    img.addEventListener('click', () => {
                        lightboxImg.src = image.src;
                        lightboxCaption.textContent = image.caption;
                        lightbox.classList.add('active');
                    });
                }
            });
        }
        
        // Filtros
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderGallery(button.dataset.filter);
            });
        });
        
        // Fechar lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Inicializar galeria
        renderGallery();
    }
}

// Página de Contato
function setupContactPage() {
    if (document.getElementById('contactForm')) {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envio do formulário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();

    if (document.querySelector('.slideshow-container')) {
        setupHomePage();
    }

    if (document.querySelector('.calendar-grid')) {
        setupEventsPage();
    }

    if (document.querySelector('.gallery-container')) {
        setupGalleryPage();
    }

    if (document.getElementById('contactForm')) {
        setupContactPage();
    }
});

