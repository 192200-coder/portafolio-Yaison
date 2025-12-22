// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for scroll-to-top button
    const scrollTopStyle = document.createElement('style');
    scrollTopStyle.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            background: var(--gradient-primary);
            color: var(--black);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: var(--shadow-primary);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .scroll-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 40px rgba(251, 191, 36, 0.4);
        }
        
        .spinner {
            display: none;
            width: 1rem;
            height: 1rem;
            border: 2px solid var(--black);
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(scrollTopStyle);

    // Add scroll-to-top button if it doesn't exist
    if (!document.getElementById('scroll-top')) {
        const scrollTopBtn = document.createElement('a');
        scrollTopBtn.id = 'scroll-top';
        scrollTopBtn.href = '#inicio';
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
        document.body.appendChild(scrollTopBtn);
    }

    // Initialize all features
    initializeFeatures();
});

function initializeFeatures() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .value-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });

    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('submit-btn')) return;
            
            const originalText = this.innerHTML;
            this.innerHTML = `
                <div class="spinner" style="display: inline-block; margin-right: 0.5rem;"></div>
                <span>Procesando...</span>
            `;
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });

    // Add smooth transitions for section changes
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.transition = 'opacity 0.3s ease';
    });

    // Add tooltips for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.setAttribute('title', link.querySelector('i').className.split(' ')[1].replace('-fill', '').replace('ri-', ''));
    });

    // Add image lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes modals/menus
        if (e.key === 'Escape') {
            const openMenus = document.querySelectorAll('.show');
            openMenus.forEach(menu => menu.classList.remove('show'));
        }
        
        // Tab key navigation support
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add CSS for keyboard navigation
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        .keyboard-navigation :focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-content {
                grid-template-columns: 1fr;
            }
            
            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
        }
        
        /* Print styles */
        @media print {
            .scroll-top,
            .scroll-down,
            .nav-toggle,
            .nav-close,
            .hero-buttons,
            .contact-form,
            .social-links {
                display: none !important;
            }
            
            body {
                color: #000;
                background: #fff;
            }
            
            .section {
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(keyboardStyle);

    // Initialize tooltips
    initTooltips();
}

function initTooltips() {
    // Simple tooltip implementation
    const elementsWithTooltip = document.querySelectorAll('[title]');
    
    elementsWithTooltip.forEach(el => {
        el.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
            tooltip.style.background = 'var(--black-90)';
            tooltip.style.color = 'var(--white)';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = '0.25rem';
            tooltip.style.fontSize = '0.875rem';
            tooltip.style.zIndex = '9999';
            tooltip.style.pointerEvents = 'none';
            
            document.body.appendChild(tooltip);
            
            // Remove tooltip on mouse leave
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}
