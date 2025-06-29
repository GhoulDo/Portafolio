document.addEventListener('DOMContentLoaded', function() {
    // Configuración de animaciones
    const config = {
        animationDuration: 800,
        typingSpeed: 50,
        scrollThreshold: 0.2,
        hoverDelay: 100,
        parallaxIntensity: 0.1,
        rotationIntensity: 0.02
    };

    // Selección de elementos
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const projects = document.querySelectorAll('.project');
    const skillItems = document.querySelectorAll('.skill-item');
    const profilePhoto = document.querySelector('.profile-photo');
    const contactItems = document.querySelectorAll('.contact-item');

    // Manejo de la navegación
    let lastScroll = 0;
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
            
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
        }
    });

    // Navegación suave mejorada
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Cerrar el menú en móviles si está abierto
                if (window.innerWidth <= 768) {
                    nav.classList.add('hidden');
                }
            }
        });
    });

    // Animaciones al hacer scroll mejoradas
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: config.scrollThreshold
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('project')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
                }
            }
        });
    }, observerOptions);

    // Observar secciones con delay
    sections.forEach((section, index) => {
        section.dataset.delay = index * 0.2;
        observer.observe(section);
    });

    // Observar proyectos con delay
    projects.forEach((project, index) => {
        project.dataset.delay = index * 0.2;
        observer.observe(project);
    });

    // Efectos hover en proyectos mejorados - SIMPLIFICADO
    projects.forEach((project, index) => {
        const links = project.querySelectorAll('.project-link');
        
        // Manejar clicks en enlaces de proyectos
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const url = this.getAttribute('href');
                console.log('Abriendo URL:', url);
                
                if (url && url !== '#' && url !== '') {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });

            // Mejorar accesibilidad
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Efectos de hover simplificados
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Añadir delay para animaciones
        project.style.animationDelay = `${index * 0.1}s`;
    });

    // Efectos hover en habilidades mejorados
    skillItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Efecto parallax mejorado en la foto de perfil
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (profilePhoto) {
            profilePhoto.style.transform = `
                translateY(${scrolled * config.parallaxIntensity}px)
                rotate(${scrolled * config.rotationIntensity}deg)
            `;
        }
    });

    // Efectos hover en elementos de contacto
    contactItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Formulario de contacto mejorado
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
                input.style.transform = 'translateY(-2px)';
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                    input.style.transform = 'translateY(0)';
                }
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            try {
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
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
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Función mejorada para mostrar mensajes
    function showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type} show`;
        messageDiv.textContent = message;
        
        const container = document.querySelector('.contact-container');
        container.insertBefore(messageDiv, container.firstChild);
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 5000);
    }

    // Inicialización
    // Añadir clase visible a la primera sección
    if (sections[0]) {
        sections[0].classList.add('visible');
    }
});

// Navegación suave adicional (fuera del DOMContentLoaded)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Event listener global adicional para asegurar funcionamiento
document.addEventListener('click', function(e) {
    const projectLink = e.target.closest('.project-link');
    if (projectLink) {
        e.preventDefault();
        e.stopPropagation();
        
        const href = projectLink.getAttribute('href');
        console.log('Click global detectado, URL:', href);
        
        if (href && href !== '#' && href !== '') {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    }
});
