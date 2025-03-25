document.addEventListener('DOMContentLoaded', function() {
    // Configuración
    const config = {
        animationDuration: 600,
        typingSpeed: 50,
        consolePrefix: '> '
    };

    // Selección de elementos del DOM
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const form = document.querySelector('form');
    const languageToggle = document.querySelector('#language-toggle');
    const profilePhoto = document.querySelector('.profile-photo');
    const skillsList = document.querySelector('.skills-list');
    const projects = document.querySelectorAll('.project');

    // Navegación suave mejorada
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('experience-item')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    projects.forEach(project => {
        observer.observe(project);
    });

    // Observar elementos de experiencia con delay
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.dataset.delay = index * 0.2;
        observer.observe(item);
    });

    // Efecto parallax en la foto de perfil
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (profilePhoto) {
            profilePhoto.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Efectos hover en las habilidades
    if (skillsList) {
        skillsList.addEventListener('mouseenter', () => {
            const items = skillsList.querySelectorAll('li');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(10px)';
                    item.style.opacity = '1';
                }, index * 100);
            });
        });

        skillsList.addEventListener('mouseleave', () => {
            const items = skillsList.querySelectorAll('li');
            items.forEach(item => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '0.8';
            });
        });
    }

    // Manejo del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar el formulario
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Mostrar estado de carga
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showMessage('¡Mensaje enviado con éxito!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            showMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            console.error('Error:', error);
        } finally {
            // Restaurar el botón
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    });

    function showMessage(message, type) {
        // Crear o actualizar el mensaje
        let messageElement = document.querySelector('.form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.insertBefore(messageElement, contactForm.firstChild);
        }

        // Actualizar el mensaje
        messageElement.textContent = message;
        messageElement.className = `form-message ${type} show`;

        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }

    // Validación en tiempo real
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
            }
        });
    });

    // Animación de progreso de habilidades
    function animateSkills() {
        const skillBars = document.querySelectorAll('.progress');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress');
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    // Inicializar animaciones cuando las habilidades sean visibles
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Cambio de idioma mejorado
    if (languageToggle) {
        const translations = {
            es: {
                about: 'Sobre Mí',
                skills: 'Habilidades',
                projects: 'Proyectos',
                experience: 'Experiencia',
                contact: 'Contacto'
            },
            en: {
                about: 'About Me',
                skills: 'Skills',
                projects: 'Projects',
                experience: 'Experience',
                contact: 'Contact'
            }
        };

        let currentLang = 'es';

        languageToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            updateLanguage(currentLang);
        });

        function updateLanguage(lang) {
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
        }
    }

    // Efectos de hover en proyectos
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            const overlay = project.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        project.addEventListener('mouseleave', () => {
            const overlay = project.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // Inicialización
    document.addEventListener('DOMContentLoaded', () => {
        // Añadir clase visible a la primera sección
        if (sections[0]) {
            sections[0].classList.add('visible');
        }
    });
});
