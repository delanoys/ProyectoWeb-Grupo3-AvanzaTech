document.addEventListener('DOMContentLoaded', () => {
    // Mapa de temas a subtemas con IDs e íconos correspondientes
    const temasSubtemas = {
        'inicio': [
            { id: 'bienvenida', text: 'Bienvenida', icon: 'fas fa-home' }
        ],
        'introduccion-css': [
            { id: 'que-es-css', text: '¿Qué es CSS?', icon: 'fas fa-info' },
            { id: 'historia-evolucion', text: 'Historia y evolución de CSS', icon: 'fas fa-history' },
            { id: 'ventajas-css', text: 'Ventajas de usar CSS', icon: 'fas fa-check-circle' },
            { id: 'integracion-html', text: 'Cómo se integra con HTML', icon: 'fas fa-code' },
            { id: 'tipos-css', text: 'Tipos de CSS', icon: 'fas fa-list' }
        ],
        'selectores-especificidad': [
            { id: 'tipos-selectores', text: 'Tipos de selectores', icon: 'fas fa-bullseye' },
            { id: 'combinadores', text: 'Combinadores', icon: 'fas fa-link' },
            { id: 'especificidad-important', text: 'Especificidad y !important', icon: 'fas fa-exclamation' }
        ],
        'propiedades-estilo': [
            { id: 'colores', text: 'Colores', icon: 'fas fa-palette' },
            { id: 'tipografia', text: 'Tipografía', icon: 'fas fa-font' },
            { id: 'fondos', text: 'Fondos', icon: 'fas fa-image' },
            { id: 'bordes', text: 'Bordes', icon: 'fas fa-border-all' },
            { id: 'margenes-padding', text: 'Márgenes y Padding', icon: 'fas fa-arrows-alt' },
            { id: 'sombra', text: 'Sombra', icon: 'fas fa-shadow' }
        ],
        'diseno-layout': [
            { id: 'box-model', text: 'Modelo de Caja', icon: 'fas fa-square-full' },
            { id: 'display', text: 'Display', icon: 'fas fa-eye' },
            { id: 'position', text: 'Position', icon: 'fas fa-arrows-alt' },
            { id: 'z-index-capas', text: 'Z-index y capas', icon: 'fas fa-layer-group' },
            { id: 'overflow-clipping', text: 'Overflow y clipping', icon: 'fas fa-crop' },
            { id: 'flexbox', text: 'Flexbox', icon: 'fas fa-th-large' },
            { id: 'grid', text: 'Grid', icon: 'fas fa-th' }
        ],
        'unidades-medidas': [
            { id: 'unidades-absolutas', text: 'Unidades absolutas', icon: 'fas fa-ruler' },
            { id: 'unidades-relativas', text: 'Unidades relativas', icon: 'fas fa-percentage' },
            { id: 'calc', text: 'Uso de calc()', icon: 'fas fa-calculator' },
            { id: 'escalabilidad-accesibilidad', text: 'Escalabilidad y accesibilidad', icon: 'fas fa-universal-access' }
        ],
        'responsividad-media-queries': [
            { id: 'diseno-responsive', text: 'Diseño responsive', icon: 'fas fa-mobile-alt' },
            { id: 'breakpoints', text: 'Breakpoints comunes', icon: 'fas fa-ruler-horizontal' },
            { id: 'media-queries', text: 'Sintaxis de media queries', icon: 'fas fa-code' },
            { id: 'mobile-first', text: 'Enfoque mobile-first', icon: 'fas fa-mobile' },
            { id: 'tecnicas-responsive', text: 'Técnicas responsive', icon: 'fas fa-tools' }
        ],
        'pseudo-clases-elementos': [
            { id: 'pseudo-clases', text: 'Pseudo-clases', icon: 'fas fa-code' },
            { id: 'pseudo-elementos', text: 'Pseudo-elementos', icon: 'fas fa-code-branch' },
        ],
        'animaciones-transiciones': [
            { id: 'transiciones', text: 'Transiciones CSS', icon: 'fas fa-exchange-alt' },
            { id: 'keyframes', text: '@keyframes', icon: 'fas fa-film' },
            { id: 'propiedades-animacion', text: 'Propiedades de animación', icon: 'fas fa-cog' },
            { id: 'estados-clave', text: 'Estados clave complejos', icon: 'fas fa-key' },
            { id: 'animaciones-multiples', text: 'Animaciones múltiples', icon: 'fas fa-clone' },
            { id: 'performance-animaciones', text: 'Performance y buenas prácticas', icon: 'fas fa-tachometer-alt' }
        ],
        'variables-personalizacion': [
            { id: 'sintaxis-variables', text: 'Sintaxis de variables', icon: 'fas fa-code' },
            { id: 'uso-var', text: 'Uso con var()', icon: 'fas fa-function' },
            { id: 'scope-variables', text: 'Scope local y global', icon: 'fas fa-globe' },
            { id: 'fallbacks', text: 'Fallbacks y valores por defecto', icon: 'fas fa-undo' },
            { id: 'organizacion-variables', text: 'Organización de variables', icon: 'fas fa-sitemap' }
        ],
        'herramientas-buenas-practicas': [
            { id: 'reset-normalize', text: 'Reset CSS vs Normalize.css', icon: 'fas fa-eraser' },
            { id: 'organizacion-cod', text: 'Organización del código', icon: 'fas fa-file-code' },
            { id: 'convenciones-nombres', text: 'Convenciones de nombres', icon: 'fas fa-tag' },
            { id: 'devtools', text: 'Uso de DevTools', icon: 'fas fa-wrench' },
            { id: 'minification-optimizacion', text: 'Minificación y optimización', icon: 'fas fa-compress' },
            { id: 'linters-stylelint', text: 'Uso de linters', icon: 'fas fa-check-circle' }
        ],
        'preprocesadores-css': [
            { id: 'que-es-preprocesador', text: '¿Qué es un preprocesador?', icon: 'fas fa-info-circle' },
            { id: 'scss-sass', text: 'SCSS/SASS', icon: 'fas fa-code' },
            { id: 'modularización', text: 'Beneficios de modularización', icon: 'fas fa-cubes' }
        ],
        'css-moderno-futuro': [
            { id: 'nuevas-funciones', text: 'Nuevas funciones', icon: 'fas fa-star' },
            { id: 'container-queries', text: 'Container queries', icon: 'fas fa-box' },
            { id: 'subgrid', text: 'Subgrid', icon: 'fas fa-th' },
            { id: 'state-queries', text: 'State queries', icon: 'fas fa-search' },
            { id: 'estrategias-actualización', text: 'Estrategias para mantenerse actualizado', icon: 'fas fa-sync' }
        ]
    };

    // Función para actualizar el subtema y mostrar solo la sección activa
    function updateContent(temaId) {
        // Actualizar la lista de subtemas
        const subtopicsList = document.querySelector('.subtopics-list');
        subtopicsList.innerHTML = ''; // Limpiar la lista existente

        const subtemas = temasSubtemas[temaId] || [];
        subtemas.forEach(subtema => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${subtema.id}`;
            a.innerHTML = `<i class="${subtema.icon}"></i> ${subtema.text}`;
            li.appendChild(a);
            subtopicsList.appendChild(li);
        });

        // Mostrar solo la sección correspondiente a temaId
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === temaId) {
                section.classList.add('active');
            }
        });

        // Actualizar el enlace activo en el menú principal
        const menuLinks = document.querySelectorAll('.main-menu-list a');
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${temaId}`) {
                link.classList.add('active');
            }
        });
    }

    // Inicializar con la sección "Inicio" activa
    updateContent('inicio');

    // Menu toggle para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.main-menu-list');

    if (menuToggle && menuList) {
        menuToggle.addEventListener('click', () => {
            menuList.classList.toggle('open');
            const isOpen = menuList.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen.toString());
        });

        menuToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuList.classList.toggle('open = !menuListopen;
                menuList.classList.toggle('open');
                menuToggle.setAttribute('aria-expanded', !menuListopen);
                menuToggle.setAttribute('aria-expanded', isOpen.toString());
            }
        });
    }

    // Actualizar contenido al hacer clic en un enlace del menú principal
    document.querySelectorAll('.main-menu-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId && temasSubtemas[targetId]) {
                updateContent(targetId);
            }
            // Desplazamiento suave
            const targetElement = document.querySelector(`#${targetId}`);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
            // Cerrar el menú en móviles
            if (menuList.classList.contains('open')) {
                menuList.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Botón de volver arriba
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Modelo de caja interactivo
    const interactiveBox = document.querySelector('.interactive-box-model');
    const boxContent = document.querySelector('.box-content-example');
    
    if (interactiveBox && boxContent) {
        document.querySelectorAll('.box-model-controls button').forEach(button => {
            button.addEventListener('click', function() {
                const action = this.dataset.action;
                
                switch(action) {
                    case 'margin':
                        interactiveBox.style.margin = '0px auto';
                        boxContent.textContent = 'Margin aplicado!';
                        break;
                    case 'padding':
                        interactiveBox.style.padding = '0px';
                        boxContent.textContent = 'Padding aplicado!';
                        break;
                    case 'border':
                        interactiveBox.style.border = '5px solid #ff6b6b';
                        boxContent.textContent = 'Borde aplicado!';
                        break;
                    case 'reset':
                        interactiveBox.style.margin = '0px auto';
                        interactiveBox.style.padding = '0px';
                        interactiveBox.style.border = '2px dashed var(--primary-color)';
                        boxContent.textContent = 'Contenido';
                        break;
                }
            });
        });
    }
    
    // Demo interactivo de animaciones
    document.querySelectorAll('.animated-box').forEach(box => {
        box.addEventListener('click', function() {
            this.style.animationPlayState = 
                this.style.animationPlayState === 'paused' ? 'running' : 'paused';
        });
    });
    
    // Desplazamiento suave para enlaces de navegación y subtemas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId === '') return;
            
            const targetElement = document.querySelector(`#${targetId}`);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`¡Gracias por suscribirte con ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
    
    // Copiar código
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
                }, 1000);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
        });
    });
});