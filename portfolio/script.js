document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Close Mobile Menu on Link Click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 4. Update Active Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Theme Toggle (Dark/Light Mode)
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeBtn.classList.remove('fa-moon');
        themeBtn.classList.add('fa-sun');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.classList.remove('fa-sun');
                themeBtn.classList.add('fa-moon');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeBtn.classList.remove('fa-moon');
                themeBtn.classList.add('fa-sun');
            }
        });
    }

    // 6. Simple reveal animation on scroll (for elements without AOS)
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            
            // Basic inline CSS manipulation if we don't use AOS library
            // For a production site, including the AOS library is better.
            // Here we just add a simple fade-in effect if it's in view.
            if (!el.style.transition) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.8s ease';
            }

            if (revealTop < windowHeight - revealPoint) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
});
