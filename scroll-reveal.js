document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll(
        '#inicio > .section-title, #inicio > .columnas > .columna, #inicio > .saber-mas'
    );

    if (
        !revealItems.length ||
        !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -24px 0px'
    });

    revealItems.forEach((item, index) => {
        item.classList.add('scroll-reveal', index % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right');
        item.style.setProperty('--scroll-reveal-delay', `${(index % 3) * 70}ms`);
        observer.observe(item);
    });

    document.documentElement.classList.add('scroll-reveal-enabled');
});
