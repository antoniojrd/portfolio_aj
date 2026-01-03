// Mobile Menu Logic
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('main-nav').querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('active');

        // Toggle icon between bars and times (X)
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Typing Effect
/*const typingElement = document.getElementById('hero-typing');
if (typingElement) {
    const texts = ["Full Stack Developer", "UI/UX Enthusiast", "Creative Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before new text
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
}
*/
// Typing Effect com async/await

const typingElement = document.getElementById('hero-typing');

if (typingElement) {
    const texts = ["Full Stack Developer", "UI/UX Enthusiast", "Creative Problem Solver"];

    // Função auxiliar para esperar um tempo
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeEffect() {
        let textIndex = 0;

        while (true) { // loop infinito
            const currentText = texts[textIndex];

            // Digitar letra por letra
            for (let i = 1; i <= currentText.length; i++) {
                typingElement.textContent = currentText.substring(0, i);
                await wait(100); // velocidade da digitação
            }

            await wait(2000); // pausa ao terminar

            // Apagar letra por letra
            for (let i = currentText.length; i >= 0; i--) {
                typingElement.textContent = currentText.substring(0, i);
                await wait(50); // velocidade da exclusão
            }

            await wait(500); // pausa antes do próximo texto

            // Avança para o próximo texto
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    // Inicia o efeito
    typeEffect();
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Active Link Highlight
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 }); // Highlight when 50% visible

sections.forEach(section => {
    navObserver.observe(section);
});

// Smooth Scroll for Anchor Links (with header offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 85;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
