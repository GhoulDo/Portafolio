document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Handle form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Gracias por tu mensaje!');
                form.reset();
            } else {
                alert('Hubo un problema al enviar el formulario.');
            }
        }).catch(error => {
            alert('Hubo un problema al enviar el formulario.');
        });
    });

    // Animations on scroll
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Interactive console
    const consoleOutput = document.getElementById('console-output');
    const consoleInput = document.getElementById('console-input');

    consoleInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = consoleInput.value.trim();
            consoleInput.value = '';
            handleCommand(command);
        }
    });

    function handleCommand(command) {
        const output = document.createElement('div');
        output.textContent = `> ${command}`;
        consoleOutput.appendChild(output);

        switch (command.toLowerCase()) {
            case 'about':
                scrollToSection('about');
                break;
            case 'skills':
                scrollToSection('skills');
                break;
            case 'projects':
                scrollToSection('projects');
                break;
            case 'experience':
                scrollToSection('experience');
                break;
            case 'contact':
                scrollToSection('contact');
                break;
            default:
                const error = document.createElement('div');
                error.textContent = 'Comando no reconocido.';
                error.style.color = 'red';
                consoleOutput.appendChild(error);
        }

        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }

    // Language toggle
    const languageToggle = document.getElementById('language-toggle');
    languageToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.lang;
        if (currentLang === 'es') {
            document.documentElement.lang = 'en';
            translateToEnglish();
            languageToggle.innerHTML = '<i class="fas fa-language"></i> Español';
        } else {
            document.documentElement.lang = 'es';
            translateToSpanish();
            languageToggle.innerHTML = '<i class="fas fa-language"></i> English';
        }
    });

    function translateToEnglish() {
        document.querySelector('h1').textContent = 'My Portfolio';
        document.querySelector('nav ul li a[href="#about"]').innerHTML = '<i class="fas fa-user"></i> About Me';
        document.querySelector('nav ul li a[href="#skills"]').innerHTML = '<i class="fas fa-code"></i> Skills';
        document.querySelector('nav ul li a[href="#projects"]').innerHTML = '<i class="fas fa-project-diagram"></i> Projects';
        document.querySelector('nav ul li a[href="#experience"]').innerHTML = '<i class="fas fa-briefcase"></i> Experience';
        document.querySelector('nav ul li a[href="#contact"]').innerHTML = '<i class="fas fa-envelope"></i> Contact';
        document.querySelector('nav ul li a[href="#console"]').innerHTML = '<i class="fas fa-terminal"></i> Console';
        document.querySelector('#about h2').textContent = 'About Me';
        document.querySelector('.about-text p').textContent = '👨‍💻 Software Development Student | Passionate about Process Optimization';
        document.querySelector('.about-text p:nth-child(2)').textContent = 'I am a software development student with a solid foundation in development methodologies, databases, and process optimization. I seek to create efficient and scalable solutions for organizations.';
        document.querySelector('#skills h2').textContent = 'Key Skills';
        document.querySelectorAll('.skills-list li')[0].textContent = '💻 Programming in Java and C++';
        document.querySelectorAll('.skills-list li')[1].textContent = '🗄️ Database Administration (SQL, NoSQL)';
        document.querySelectorAll('.skills-list li')[2].textContent = '🔍 Algorithms and Data Structures';
        document.querySelectorAll('.skills-list li')[3].textContent = '🛠️ Development of RESTful APIs';
        document.querySelectorAll('.skills-list li')[4].textContent = '🚀 Implementation of Microservices';
        document.querySelectorAll('.skills-list li')[5].textContent = '📊 Analysis and Processing of Large Data Volumes';
        document.querySelector('#projects h2').textContent = 'Projects';
        document.querySelectorAll('.project h3')[0].textContent = 'Project 1: Pokémon Search';
        document.querySelectorAll('.project p')[0].textContent = 'A website to search for Pokémon characteristics using the PokeAPI.';
        document.querySelectorAll('.project h3')[1].textContent = 'Project 2: Dog Grooming';
        document.querySelectorAll('.project p')[1].textContent = 'A website for a dog grooming service, with information about services and contact. Backend developed with TypeScript and MySQL, frontend with CSS and JavaScript.';
        document.querySelectorAll('.project h3')[2].textContent = 'Project 3: Bank Queue System';
        document.querySelectorAll('.project p')[2].textContent = 'A system to manage queues in a bank, developed in Java using linked queues for the backend.';
        document.querySelector('#experience h2').textContent = 'Experience';
        document.querySelector('#experience p').textContent = 'I have worked on several university and independent projects that have allowed me to develop my software development skills. Some of these projects include:';
        document.querySelectorAll('#experience ul')[0].innerHTML = `
            <li>Development of a task management application using Java and Spring Boot.</li>
            <li>Implementation of a reservation system for a university library with Node.js and MongoDB.</li>
            <li>Creation of an e-commerce website using HTML, CSS, and JavaScript.</li>
            <li>Development of a website to search for Pokémon characteristics using the PokeAPI.</li>
            <li>Creation of a website for a dog grooming service, with backend in TypeScript and MySQL, and frontend in CSS and JavaScript.</li>
            <li>Development of a system to manage queues in a bank using Java and linked queues.</li>
        `;
        document.querySelectorAll('#experience p')[1].textContent = 'In these projects, I have learned and applied skills such as:';
        document.querySelectorAll('#experience ul')[1].innerHTML = `
            <li>API management and endpoint creation.</li>
            <li>Creation and management of tokens for authentication and authorization.</li>
            <li>Development of CRUDs (Create, Read, Update, Delete).</li>
            <li>Administration and management of SQL and NoSQL databases.</li>
        `;
        document.querySelector('#contact h2').textContent = 'Contact';
        document.querySelector('#contact form label[for="name"]').textContent = 'Name:';
        document.querySelector('#contact form label[for="email"]').textContent = 'Email:';
        document.querySelector('#contact form label[for="message"]').textContent = 'Message:';
        document.querySelector('#contact form button').textContent = 'Send';
        document.querySelector('#console h2').textContent = 'Interactive Console';
        document.querySelector('#console p').textContent = 'Use the following commands to navigate the page:';
        document.querySelector('#console ul li:nth-child(1)').innerHTML = '<code>about</code>: Navigate to the "About Me" section.';
        document.querySelector('#console ul li:nth-child(2)').innerHTML = '<code>skills</code>: Navigate to the "Skills" section.';
        document.querySelector('#console ul li:nth-child(3)').innerHTML = '<code>projects</code>: Navigate to the "Projects" section.';
        document.querySelector('#console ul li:nth-child(4)').innerHTML = '<code>experience</code>: Navigate to the "Experience" section.';
        document.querySelector('#console ul li:nth-child(5)').innerHTML = '<code>contact</code>: Navigate to the "Contact" section.';
        document.querySelector('footer p').textContent = '© 2024 My Portfolio';
    }

    function translateToSpanish() {
        document.querySelector('h1').textContent = 'Mi Portafolio';
        document.querySelector('nav ul li a[href="#about"]').innerHTML = '<i class="fas fa-user"></i> Sobre Mí';
        document.querySelector('nav ul li a[href="#skills"]').innerHTML = '<i class="fas fa-code"></i> Habilidades';
        document.querySelector('nav ul li a[href="#projects"]').innerHTML = '<i class="fas fa-project-diagram"></i> Proyectos';
        document.querySelector('nav ul li a[href="#experience"]').innerHTML = '<i class="fas fa-briefcase"></i> Experiencia';
        document.querySelector('nav ul li a[href="#contact"]').innerHTML = '<i class="fas fa-envelope"></i> Contacto';
        document.querySelector('nav ul li a[href="#console"]').innerHTML = '<i class="fas fa-terminal"></i> Consola';
        document.querySelector('#about h2').textContent = 'Sobre Mí';
        document.querySelector('.about-text p').textContent = '👨‍💻 Estudiante de Desarrollo de Software | Apasionado por la Optimización de Procesos';
        document.querySelector('.about-text p:nth-child(2)').textContent = 'Soy un estudiante de desarrollo de software con una sólida base en metodologías de desarrollo, bases de datos y optimización de procesos. Busco crear soluciones eficientes y escalables para las organizaciones.';
        document.querySelector('#skills h2').textContent = 'Habilidades Clave';
        document.querySelectorAll('.skills-list li')[0].textContent = '💻 Programación en Java y C++';
        document.querySelectorAll('.skills-list li')[1].textContent = '🗄️ Administración de bases de datos (SQL, NoSQL)';
        document.querySelectorAll('.skills-list li')[2].textContent = '🔍 Algoritmos y estructuras de datos';
        document.querySelectorAll('.skills-list li')[3].textContent = '🛠️ Desarrollo de APIs RESTful';
        document.querySelectorAll('.skills-list li')[4].textContent = '🚀 Implementación de microservicios';
        document.querySelectorAll('.skills-list li')[5].textContent = '📊 Análisis y procesamiento de grandes volúmenes de datos';
        document.querySelector('#projects h2').textContent = 'Proyectos';
        document.querySelectorAll('.project h3')[0].textContent = 'Proyecto 1: Búsqueda de Pokémon';
        document.querySelectorAll('.project p')[0].textContent = 'Un sitio web para buscar características de Pokémon utilizando la PokeAPI.';
        document.querySelectorAll('.project h3')[1].textContent = 'Proyecto 2: Peluquería Canina';
        document.querySelectorAll('.project p')[1].textContent = 'Un sitio web para una peluquería canina, con información sobre servicios y contacto. Backend desarrollado con TypeScript y MySQL, frontend con CSS y JavaScript.';
        document.querySelectorAll('.project h3')[2].textContent = 'Proyecto 3: Sistema de Turnos en un Banco';
        document.querySelectorAll('.project p')[2].textContent = 'Un sistema para gestionar turnos en un banco, desarrollado en Java utilizando colas enlazadas para el backend.';
        document.querySelector('#experience h2').textContent = 'Experiencia';
        document.querySelector('#experience p').textContent = 'He trabajado en varios proyectos universitarios e independientes que me han permitido desarrollar mis habilidades en desarrollo de software. Algunos de estos proyectos incluyen:';
        document.querySelectorAll('#experience ul')[0].innerHTML = `
            <li>Desarrollo de una aplicación de gestión de tareas utilizando Java y Spring Boot.</li>
            <li>Implementación de un sistema de reservas para una biblioteca universitaria con Node.js y MongoDB.</li>
            <li>Creación de un sitio web de comercio electrónico utilizando HTML, CSS y JavaScript.</li>
            <li>Desarrollo de un sitio web para buscar características de Pokémon utilizando la PokeAPI.</li>
            <li>Creación de un sitio web para una peluquería canina, con backend en TypeScript y MySQL, y frontend en CSS y JavaScript.</li>
            <li>Desarrollo de un sistema para gestionar turnos en un banco utilizando Java y colas enlazadas.</li>
        `;
        document.querySelectorAll('#experience p')[1].textContent = 'En estos proyectos, he aprendido y aplicado habilidades como:';
        document.querySelectorAll('#experience ul')[1].innerHTML = `
            <li>Manejo de APIs y creación de endpoints.</li>
            <li>Creación y manejo de tokens para autenticación y autorización.</li>
            <li>Desarrollo de CRUDs (Create, Read, Update, Delete).</li>
            <li>Administración y manejo de bases de datos SQL y NoSQL.</li>
        `;
        document.querySelector('#contact h2').textContent = 'Contacto';
        document.querySelector('#contact form label[for="name"]').textContent = 'Nombre:';
        document.querySelector('#contact form label[for="email"]').textContent = 'Email:';
        document.querySelector('#contact form label[for="message"]').textContent = 'Mensaje:';
        document.querySelector('#contact form button').textContent = 'Enviar';
        document.querySelector('#console h2').textContent = 'Consola Interactiva';
        document.querySelector('#console p').textContent = 'Usa los siguientes comandos para navegar por la página:';
        document.querySelector('#console ul li:nth-child(1)').innerHTML = '<code>about</code>: Navega a la sección "Sobre Mí".';
        document.querySelector('#console ul li:nth-child(2)').innerHTML = '<code>skills</code>: Navega a la sección "Habilidades".';
        document.querySelector('#console ul li:nth-child(3)').innerHTML = '<code>projects</code>: Navega a la sección "Proyectos".';
        document.querySelector('#console ul li:nth-child(4)').innerHTML = '<code>experience</code>: Navega a la sección "Experiencia".';
        document.querySelector('#console ul li:nth-child(5)').innerHTML = '<code>contact</code>: Navega a la sección "Contacto".';
        document.querySelector('footer p').textContent = '© 2024 Mi Portafolio';
    }
});
