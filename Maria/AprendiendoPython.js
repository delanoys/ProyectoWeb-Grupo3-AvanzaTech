document.addEventListener('DOMContentLoaded', function() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Interactive Box Model
    const interactiveBox = document.querySelector('.interactive-box-model');
    const boxContent = document.querySelector('.box-content-example');
    
    document.querySelectorAll('.box-model-controls button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            
            switch(action) {
                case 'multiparadigma':
                    boxContent.textContent = 'Soporta la programación imperativa, programación orientada a objetos y funcional.';
                    break;
                case 'multiplataforma':
                    boxContent.textContent = 'Se puede encontrar un intérprete para Windows, Linux y Mac OS. Además, se puede reutilizar el mismo código.';
                    break;
                case 'tipado':
                    boxContent.textContent = 'El tipo de las variables se decide en tiempo de ejecución.';
                    break;
                case 'fuertemente':
                    boxContent.textContent = 'No se puede usar una variable en un contexto fuera de su tipo. Si se quisiera, habría que hacer una conversión de tipos.';
                    break;
                case 'interpretado':
                    boxContent.textContent = 'El código no se compila a lenguaje máquina.';
                    break;
                case 'reset':
                    interactiveBox.style.margin = '40px auto';
                    interactiveBox.style.padding = '30px';
                    interactiveBox.style.border = '2px dashed var(--primary-color)';
                    boxContent.textContent = 'Haz clic en los botones de abajo';
                    break;
            }
        });
    });
    
    // Demo interactivo de animaciones
    document.querySelectorAll('.animated-box').forEach(box => {
        box.addEventListener('click', function() {
            this.style.animationPlayState = 
                this.style.animationPlayState === 'paused' ? 'running' : 'paused';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`¡Gracias por suscribirte con ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
    
    // Highlight current section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
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
    
    // Copy code functionality
    document.querySelectorAll('pre code').forEach(codeBlock => {
        codeBlock.addEventListener('click', function() {
            const range = document.createRange();
            range.selectNodeContents(this);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            try {
                document.execCommand('copy');
                const originalText = this.textContent;
                this.textContent = '¡Copiado!';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1500);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
        });
    });
});