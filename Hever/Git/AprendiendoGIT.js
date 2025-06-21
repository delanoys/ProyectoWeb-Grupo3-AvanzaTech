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
                case 'margin':
                    interactiveBox.style.margin = '60px auto';
                    boxContent.textContent = 'Margin aplicado';
                    break;
                case 'padding':
                    interactiveBox.style.padding = '50px';
                    boxContent.textContent = 'Padding aplicado';
                    break;
                case 'border':
                    interactiveBox.style.border = '5px solid #ff6b6b';
                    boxContent.textContent = 'Border aplicado';
                    break;
                case 'reset':
                    interactiveBox.style.margin = '40px auto';
                    interactiveBox.style.padding = '30px';
                    interactiveBox.style.border = '2px dashed var(--primary-color)';
                    boxContent.textContent = 'Contenido';
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