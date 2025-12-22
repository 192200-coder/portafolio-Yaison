// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll header background
    function scrollHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Show/hide mobile menu
    function showMenu() {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideMenu() {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Set active nav link based on scroll position
    function setActiveNavLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll progress
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const scrollBar = document.querySelector('.scroll-bar');
        if (scrollBar) {
            scrollBar.style.width = scrolled + '%';
        }
    }

    // Event Listeners
    window.addEventListener('scroll', scrollHeader);
    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('scroll', updateScrollProgress);

    if (navToggle) {
        navToggle.addEventListener('click', showMenu);
    }

    if (navClose) {
        navClose.addEventListener('click', hideMenu);
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hideMenu();
            
            // Update active link immediately
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && 
            !navToggle.contains(event.target) && 
            navMenu.classList.contains('show')) {
            hideMenu();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('show')) {
            hideMenu();
        }
    });

    // Initialize
    scrollHeader();
    setActiveNavLink();
    updateScrollProgress();
});
