// Funcionalidad de la Sección Inicio
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de escritura para el título
    const titulo = document.querySelector('.inicio-content h1');
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        
        let i = 0;
        function escribir() {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(escribir, 50);
            }
        }
        escribir();
    }
    
    // Animación para los botones
    const botones = document.querySelectorAll('.btn');
    botones.forEach(boton => {
        boton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        boton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto de aparición para la sección
    const inicioSection = document.getElementById('inicio');
    if (inicioSection) {
        inicioSection.style.opacity = '0';
        inicioSection.style.transform = 'translateY(20px)';
        inicioSection.style.transition = 'opacity 0.8s, transform 0.8s';
        
        setTimeout(() => {
            inicioSection.style.opacity = '1';
            inicioSection.style.transform = 'translateY(0)';
        }, 300);
    }
});
