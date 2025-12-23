// Footer functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Update copyright year
    function updateCopyrightYear() {
        const copyrightElement = document.querySelector('.copyright');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = `© ${currentYear} Alejandro Martínez. Todos los derechos reservados.`;
        }
    }

    // Animate footer elements on scroll
    function animateFooter() {
        const footerElements = document.querySelectorAll('.footer-brand, .footer-links, .footer-contact, .footer-bottom');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        footerElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        });
    }

    // Add smooth scroll to footer links
    function initFooterLinks() {
        const footerLinks = document.querySelectorAll('.footer-link');
        
        footerLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    // Add hover effect to social links
    function initSocialLinks() {
        const socialLinks = document.querySelectorAll('.footer-social a');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }

    // Handle legal links (placeholder for future functionality)
    function initLegalLinks() {
        const legalLinks = document.querySelectorAll('.legal-link');
        
        legalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Check if it's a placeholder link
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    console.log(`Legal link clicked: ${this.textContent}`);
                    // Here you could show a modal or navigate to a legal page
                }
            });
        });
    }

    // Initialize all functions
    function init() {
        updateCopyrightYear();
        animateFooter();
        initFooterLinks();
        initSocialLinks();
        initLegalLinks();
    }

    // Start when DOM is fully loaded
    init();
});