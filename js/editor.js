// Auto-resize para los textareas de código
function autoResizeTextarea(textarea) {
    // Resetear altura para calcular el tamaño real del contenido
    textarea.style.height = 'auto';
    // Establecer la nueva altura basada en el scrollHeight
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// Función para manejar el cambio de pestañas
function switchTab(activeTab) {
    // Ocultar todos los textareas
    document.querySelectorAll('textarea').forEach(ta => {
        ta.classList.remove('active');
    });
    
    // Remover clase active de todas las pestañas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar el textarea correspondiente
    const targetTextarea = document.getElementById(activeTab);
    if (targetTextarea) {
        targetTextarea.classList.add('active');
        // Ajustar tamaño cuando se muestra
        setTimeout(() => autoResizeTextarea(targetTextarea), 10);
    }
    
    // Activar la pestaña clickeada
    document.querySelector(`[data-lang="${activeTab}"]`).classList.add('active');
}

// Event listeners para las pestañas
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        switchTab(lang);
    });
});

// Configurar auto-resize para todos los textareas
function setupAutoResize() {
    ['html', 'css', 'js'].forEach(id => {
        const textarea = document.getElementById(id);
        if (textarea) {
            // Ajusta el tamaño al cargar
            autoResizeTextarea(textarea);
            
            // Ajusta el tamaño al escribir
            textarea.addEventListener('input', function() {
                autoResizeTextarea(this);
            });
            
            // Ajusta el tamaño al pegar contenido
            textarea.addEventListener('paste', function() {
                setTimeout(() => {
                    autoResizeTextarea(this);
                }, 10);
            });
            
            // Ajusta el tamaño cuando se hace foco (útil para cambio de pestañas)
            textarea.addEventListener('focus', function() {
                setTimeout(() => {
                    autoResizeTextarea(this);
                }, 10);
            });
        }
    });
}

// Función para ejecutar el código
function runCode() {
    const html = document.getElementById('html').value;
    const css = document.getElementById('css').value;
    const js = document.getElementById('js').value;
    
    const preview = document.getElementById('preview');
    const previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;
    
    preview.srcdoc = previewContent;
}

// Función placeholder para descargar ZIP
function downloadZip() {
    // Implementar lógica de descarga ZIP
    alert('Función de descarga ZIP - por implementar');
}

// Inicialización al cargar la página
function initializeEditor() {
    // Configurar auto-resize
    setupAutoResize();
    
    // Ajustar el textarea activo inicial
    const activeTextarea = document.querySelector('textarea.active');
    if (activeTextarea) {
        autoResizeTextarea(activeTextarea);
    }
}

// Event listener para inicializar cuando se cargue la página
window.addEventListener('load', initializeEditor);