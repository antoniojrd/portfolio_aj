const toggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');
const header = document.querySelector('.site-header');

if (toggle && navList) {
    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        navList.classList.toggle('active');
    });

    // fecha o menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Adiciona sombra ao header ao rolar
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled');
});

// Scroll suave com offset para header fixo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // altura do header fixo
            const targetPos = target.offsetTop - offset;
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});

// Reveals com Intersection Observer
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // opcional: parar de observar após entrar
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

reveals.forEach(r => io.observe(r));

// Marca o link ativo simples (por seção visível)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));
