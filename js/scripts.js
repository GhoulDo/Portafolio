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
});
