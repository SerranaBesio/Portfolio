// =========================================================
// FUNCIONALIDAD DEL VALUE PROPOSITION CANVAS - OPTIMIZADA
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // CONFIGURAR ACORDEÓN DEL VALUE CANVAS
    // -----------------------------------------------------
    const valueItems = document.querySelectorAll('.value-accordion-item');

    valueItems.forEach(item => {
        const button = item.querySelector('.value-accordion-button');
        const content = item.querySelector('.value-accordion-content');
        if (!button || !content) return;

        // Accesibilidad inicial
        button.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');

        // Click: alternar solo el acordeón actual (sin cerrar otros)
        button.addEventListener('click', () => {
            const isActive = item.classList.toggle('active');
            button.setAttribute('aria-expanded', isActive);
            content.setAttribute('aria-hidden', !isActive);
        });
    });

    // -----------------------------------------------------
    // SCROLL SUAVE EN NAVEGACIÓN DEL HEADER
    // -----------------------------------------------------
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');

            // Si es un enlace externo o a otra página, dejar comportamiento normal
            if (!href.startsWith('#') || href.includes('index.html')) return;

            // Scroll suave a sección interna
            e.preventDefault();
            const target = document.querySelector(href);
            if (target && header) {
                const offset = target.offsetTop - header.offsetHeight - 20;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // -----------------------------------------------------
    // EFECTO DE SCROLL EN EL HEADER
    // -----------------------------------------------------
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }
});
