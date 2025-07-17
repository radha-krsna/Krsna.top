document.addEventListener('DOMContentLoaded', () => {
    // Theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Auto-update footer year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
