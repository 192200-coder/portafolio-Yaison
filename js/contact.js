// Contact section functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form submission
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.submit-btn');
                const spinner = submitBtn.querySelector('.spinner');
                const submitText = submitBtn.querySelector('span');
                
                // Show loading state
                submitBtn.disabled = true;
                spinner.style.display = 'inline-block';
                submitText.textContent = 'Enviando...';
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showNotification('¡Mensaje enviado! Me pondré en contacto pronto.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    spinner.style.display = 'none';
                    submitText.textContent = 'Enviar mensaje';
                }, 1500);
            });
        }
    }

    // Form validation
    function initFormValidation() {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    if (this.checkValidity()) {
                        this.style.borderColor = '#10b981';
                    } else {
                        this.style.borderColor = '#ef4444';
                    }
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    // Animate contact items on scroll
    function animateContactItems() {
        const contactItems = document.querySelectorAll('.contact-item, .social-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-in-up');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        contactItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.top = '2rem';
        notification.style.right = '2rem';
        notification.style.padding = '1rem 1.5rem';
        notification.style.background = type === 'success' ? '#10b981' : '#3b82f6';
        notification.style.color = '#fff';
        notification.style.borderRadius = '0.5rem';
        notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        notification.style.zIndex = '10000';
        notification.style.animation = 'slideInRight 0.3s ease-out';
        
        // Add to body
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize all functions
    function init() {
        initContactForm();
        initFormValidation();
        animateContactItems();
    }

    // Start when DOM is fully loaded
    init();
});