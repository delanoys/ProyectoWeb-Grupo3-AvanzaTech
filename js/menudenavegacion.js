// menudenavegacion.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-navegacion');
    const menuLinks = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('.tarjeta-git');
    
    // Función para colapsar/expandir el menú
    function toggleMenu() {
        menuNav.classList.toggle('colapsado');
        localStorage.setItem('menuCollapsed', menuNav.classList.contains('colapsado'));
    }
    
    // Función para resaltar el enlace activo
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id') || '';
            }
        });
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Solo aplica para enlaces internos (#)
            if (href.startsWith('#')) {
                link.classList.remove('active');
                if (href.includes(current)) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Función para manejar el clic en los enlaces
    function setupMenuLinks() {
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Solo manejar enlaces internos (con #)
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                        
                        if (window.innerWidth <= 1024) {
                            toggleMenu();
                        }
                    }
                }
                // Los enlaces externos (como infocod.html) se comportarán normalmente
            });
        });
    }
    
    // Función para asignar IDs a las secciones
    function assignSectionIds() {
        const defaultIds = [
            'comandos-recientes',
            'iniciando-repo',
            'actualizar-ramas',
            'eliminar-ramas',
            'descartar-cambios',
            'push-ramas',
            'tags-git'
        ];
        
        sections.forEach((section, index) => {
            if (!section.id && defaultIds[index]) {
                section.id = defaultIds[index];
            }
        });
    }
    
    // Función para cargar el estado del menú
    function loadMenuState() {
        if (localStorage.getItem('menuCollapsed') === 'true') {
            menuNav.classList.add('colapsado');
        }
    }
    
    // Inicialización
    function init() {
        assignSectionIds();
        loadMenuState();
        setupMenuLinks();
        
        menuToggle.addEventListener('click', toggleMenu);
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }
    
    init();
});

// // menudenavegacion.js
// document.addEventListener('DOMContentLoaded', function() {
//     // Elementos del DOM
//     const menuToggle = document.querySelector('.menu-toggle');
//     const menuNav = document.querySelector('.menu-navegacion');
//     const menuLinks = document.querySelectorAll('.menu-link');
//     const sections = document.querySelectorAll('.tarjeta-git');
    
//     // Función para colapsar/expandir el menú
//     function toggleMenu() {
//         menuNav.classList.toggle('colapsado');
        
//         // Guardar preferencia en localStorage
//         const isCollapsed = menuNav.classList.contains('colapsado');
//         localStorage.setItem('menuCollapsed', isCollapsed);
//     }
    
//     // Función para resaltar el enlace activo
//     function updateActiveLink() {
//         let current = '';
        
//         sections.forEach(section => {
//             const sectionTop = section.offsetTop;
//             const sectionHeight = section.clientHeight;
            
//             if (window.pageYOffset >= (sectionTop - 300)) {
//                 current = section.getAttribute('id') || '';
//             }
//         });
        
//         menuLinks.forEach(link => {
//             link.classList.remove('active');
//             if (link.getAttribute('href').includes(current)) {
//                 link.classList.add('active');
//             }
//         });
//     }
    
//     // Función para asignar IDs a las secciones si no los tienen
//     function assignSectionIds() {
//         sections.forEach((section, index) => {
//             if (!section.id) {
//                 const defaultIds = [
//                     'comandos-recientes',
//                     'iniciando-repo',
//                     'actualizar-ramas',
//                     'eliminar-ramas',
//                     'descartar-cambios',
//                     'push-ramas',
//                     'tags-git'
//                 ];
//                 section.id = defaultIds[index] || `section-${index}`;
//             }
//         });
//     }
    
//     // Función para cargar el estado del menú desde localStorage
//     function loadMenuState() {
//         const isCollapsed = localStorage.getItem('menuCollapsed') === 'true';
//         if (isCollapsed) {
//             menuNav.classList.add('colapsado');
//         }
//     }
    
//     // Función para manejar el clic en los enlaces del menú (scroll suave)
//     function setupSmoothScrolling() {
//         menuLinks.forEach(link => {
//             link.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 const targetId = this.getAttribute('href');
//                 const targetElement = document.querySelector(targetId);
                
//                 if (targetElement) {
//                     window.scrollTo({
//                         top: targetElement.offsetTop - 100,
//                         behavior: 'smooth'
//                     });
                    
//                     // Cerrar menú en móvil si está abierto
//                     if (window.innerWidth <= 1024 && !menuNav.classList.contains('colapsado')) {
//                         toggleMenu();
//                     }
//                 }
//             });
//         });
//     }
    
//     // Inicialización
//     function init() {
//         assignSectionIds();
//         loadMenuState();
//         setupSmoothScrolling();
        
//         // Event listeners
//         menuToggle.addEventListener('click', toggleMenu);
//         window.addEventListener('scroll', updateActiveLink);
        
//         // Actualizar estado inicial
//         updateActiveLink();
//     }
    
//     // Iniciar todo
//     init();
// });