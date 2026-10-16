// ============================================
// Math & CS Hub — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============ Hamburger Menu ============
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {

        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });

    }

});
