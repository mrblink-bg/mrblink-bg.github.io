document.addEventListener('DOMContentLoaded', function () {

    // === Navbar scroll ===
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // === Mobile menu ===
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // === Active nav on scroll ===
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY + 120;
        sections.forEach(function (s) {
            var link = document.querySelector('.nav-link[href="#' + s.id + '"]');
            if (link) {
                var active = scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight;
                link.classList.toggle('active', active);
            }
        });
    });

    // === Fade-in on scroll ===
    var els = document.querySelectorAll('.service-card, .contact-card, .hours-card, .map-card, .about-image');
    els.forEach(function (el) { el.classList.add('fade-in'); });
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(function (el) { obs.observe(el); });

    // === Open / Closed ===
    var statusEl = document.getElementById('open-status');
    if (statusEl) {
        var now = new Date();
        var bel = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Belgrade' }));
        var day = bel.getDay();
        var mins = bel.getHours() * 60 + bel.getMinutes();
        var isOpen = false;
        if (day >= 1 && day <= 5) isOpen = mins >= 600 && mins < 1080;
        else if (day === 6) isOpen = mins >= 540 && mins < 900;
        statusEl.className = 'open-status ' + (isOpen ? 'open' : 'closed');
        statusEl.textContent = isOpen ? 'Trenutno otvoreno' : 'Trenutno zatvoreno';
    }
});
