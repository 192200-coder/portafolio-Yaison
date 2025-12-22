// Skills section functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Animated skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    bar.style.width = width + '%';
                    observer.unobserve(bar);
                }
            }, { threshold: 0.3 });
            
            observer.observe(bar);
        });
    }

    // Animate skill items on scroll
    function animateSkillItems() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillCategories.forEach(category => {
            observer.observe(category);
        });
    }

    // Add hover effect to tech tags
    function initTechTags() {
        const techTags = document.querySelectorAll('.tech-tag');
        
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }

    // Initialize all functions
    function init() {
        animateSkillBars();
        animateSkillItems();
        initTechTags();
    }

    // Start when DOM is fully loaded
    init();
});