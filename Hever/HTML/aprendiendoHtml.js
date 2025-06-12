document.addEventListener('DOMContentLoaded', function() {
    // Botón para volver arriba
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Resaltar sección activa en la navegación
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
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
    
    // Agregar clase active al primer enlace por defecto
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Resaltar código al hacer clic
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
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
        });
    });

    // Paleta ampliada de colores CSS
    const colors = [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" },
        { name: "Green", hex: "#008000" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Yellow", hex: "#FFFF00" },
        { name: "Cyan", hex: "#00FFFF" },
        { name: "Magenta", hex: "#FF00FF" },
        { name: "Orange", hex: "#FFA500" },
        { name: "Purple", hex: "#800080" },
        { name: "Pink", hex: "#FFC0CB" },
        { name: "Brown", hex: "#A52A2A" },
        { name: "Gray", hex: "#808080" },
        // { name: "LightGray", hex: "#D3D3D3" },
        // { name: "DarkBlue", hex: "#00008B" },
        // { name: "DarkGreen", hex: "#006400" },
        // { name: "Gold", hex: "#FFD700" },
        // { name: "Tomato", hex: "#FF6347" },
        // { name: "SkyBlue", hex: "#87CEEB" },
        // { name: "Lime", hex: "#00FF00" },
        // { name: "Indigo", hex: "#4B0082" },
        // { name: "Violet", hex: "#EE82EE" },
        // { name: "Coral", hex: "#FF7F50" },
        // { name: "Turquoise", hex: "#40E0D0" },
        // { name: "Salmon", hex: "#FA8072" },
        // { name: "Olive", hex: "#808000" },
        // { name: "Navy", hex: "#000080" },
        // { name: "Teal", hex: "#008080" },
        // { name: "Maroon", hex: "#800000" },
        // { name: "Silver", hex: "#C0C0C0" }
    ];

    function hexToRgb(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return `rgb(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255})`;
    }

    function createColorRow(color) {
        const rgb = hexToRgb(color.hex);
        return `<tr>
            <td><div class="color-preview" style="background:${color.hex}"></div></td>
            <td>${color.name}</td>
            <td><span class="copyable" data-copy="${color.hex}" title="Haz clic para copiar">${color.hex}</span></td>
            <td><span class="copyable" data-copy="${rgb}" title="Haz clic para copiar">${rgb}</span></td>
            <td>
                <input type="color" value="${color.hex}" class="color-selector" data-row="${color.name}">
            </td>
        </tr>`;
    }

    function renderColorTable() {
        const tbody = document.getElementById('colorTableBody');
        if (tbody) {
            tbody.innerHTML = colors.map(createColorRow).join('');
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // fallback
            const temp = document.createElement('textarea');
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
        }
    }

    function showCopyFeedback(el) {
        const original = el.textContent;
        el.textContent = "¡Copiado!";
        setTimeout(() => { el.textContent = original; }, 900);
    }

    // Inicialización de la paleta de colores
    renderColorTable();

    // Copiar código al hacer clic
    const colorTableBody = document.getElementById('colorTableBody');
    if (colorTableBody) {
        colorTableBody.addEventListener('click', function (e) {
            if (e.target.classList.contains('copyable')) {
                copyToClipboard(e.target.getAttribute('data-copy'));
                showCopyFeedback(e.target);
            }
        });

        // Cambiar color con el selector de cada fila
        colorTableBody.addEventListener('input', function (e) {
            if (e.target.classList.contains('color-selector')) {
                const row = e.target.closest('tr');
                const hex = e.target.value;
                const rgb = hexToRgb(hex);
                row.querySelector('.color-preview').style.background = hex;
                row.querySelectorAll('.copyable')[0].textContent = hex;
                row.querySelectorAll('.copyable')[0].setAttribute('data-copy', hex);
                row.querySelectorAll('.copyable')[1].textContent = rgb;
                row.querySelectorAll('.copyable')[1].setAttribute('data-copy', rgb);
            }
        });
    }

    // Selector de color personalizado
    const customColor = document.getElementById('customColor');
    const customColorCode = document.getElementById('customColorCode');
    const customColorPreview = document.getElementById('customColorPreview');

    function updateCustomColor() {
        if (customColor && customColorCode && customColorPreview) {
            const hex = customColor.value;
            customColorCode.textContent = hex;
            customColorPreview.style.background = hex;
            customColorCode.setAttribute('data-copy', hex);
        }
    }
    if (customColor) {
        updateCustomColor();
        customColor.addEventListener('input', updateCustomColor);
    }

    // Copiar color personalizado
    if (customColorCode && customColor) {
        customColorCode.addEventListener('click', function () {
            copyToClipboard(customColor.value);
            showCopyFeedback(customColorCode);
        });
    }

    
                            
                        
                        
});