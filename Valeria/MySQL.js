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
                    boxContent.textContent = 'Una vez creada la tabla, puedes agregar datos utilizando la instrucción INSERT INTO.';
                    break;
                case 'multiplataforma':
                    boxContent.textContent = 'Para recuperar datos de la tabla, puedes utilizar la instrucción SELECT.';
                    break;
                case 'tipado':
                    boxContent.textContent = 'Si deseas obtener registros que cumplan ciertas condiciones, puedes usar la cláusula WHERE.';
                    break;
                case 'fuertemente':
                    boxContent.textContent = 'Para modificar los datos existentes en una tabla, utiliza la instrucción UPDATE junto con la cláusula WHERE para especificar qué registros actualizar.';
                    break;
                case 'DELETE':
                    boxContent.textContent = 'Para eliminar registros de una tabla, utiliza la instrucción DELETE junto con la cláusula WHERE para especificar qué registros eliminar.';
                    break;

                case 'LIMIT':
                    boxContent.textContent = 'Si deseas obtener solo un número específico de registros, puedes usar la cláusula LIMIT.';
                    break;

                case 'ORDER BY':
                    boxContent.textContent = 'Para ordenar los resultados en función de una o más columnas, utiliza la cláusula ORDER BY';
                    break;
                case 'GROUP BY':
                    boxContent.textContent = 'Si deseas realizar operaciones agregadas, como sumas o conteos, puedes utilizar la cláusula GROUP BY.';
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