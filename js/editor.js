const tabs = document.querySelectorAll('.tab');
const editors = {
  html: document.getElementById('html'),
  css: document.getElementById('css'),
  js: document.getElementById('js')
};

// Cambiar de pestaña
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.tab.active').classList.remove('active');
    document.querySelector('textarea.active').classList.remove('active');

    tab.classList.add('active');
    editors[tab.dataset.lang].classList.add('active');
  });
});

// Guardar cambios en localStorage automáticamente
Object.entries(editors).forEach(([lang, textarea]) => {
  textarea.value = localStorage.getItem(`code-${lang}`) || getDefault(lang);

  textarea.addEventListener('input', () => {
    localStorage.setItem(`code-${lang}`, textarea.value);
  });
});

function getDefault(lang) {
  const defaults = {
    html: `<h1>Hola mundo</h1>\n<p>Este es un párrafo de prueba.</p>`,
    css: `body { font-family: sans-serif; background: #fefefe; }\nh1 { color: teal; }`,
    js: `console.log("Hola desde JavaScript");\n`
  };
  return defaults[lang];
}

// Ejecutar el código

/**
 * Ejecuta el código HTML, CSS y JavaScript ingresado por el usuario en un iframe de vista previa.
 * Combina el contenido de los editores y lo inserta en el iframe con id 'preview'.
 * Ajusta automáticamente la altura del iframe según el contenido renderizado.
 * Maneja posibles errores relacionados con políticas de seguridad al acceder al contenido del iframe.
 *
 * @function
 * @returns {void}
 */
function runCode() {
  const html = editors.html.value;
  const css = `<style>${editors.css.value}</style>`;
  const js = `<script>${editors.js.value}<\/script>`;
  const output = html + css + js;

  const preview = document.getElementById('preview');
  preview.srcdoc = output;

  // Ajustar el alto del iframe automáticamente según el contenido
  preview.onload = function () {
    try {
      const doc = preview.contentDocument || preview.contentWindow.document;
      setTimeout(() => {
        const height = doc.documentElement.scrollHeight;
        preview.style.height = height + 'px';
      }, 50);
    } catch (e) {
      // Si hay un error (por ejemplo, por políticas de seguridad), no hacer nada
    }
  };
}

// Ajustar automáticamente el tamaño del textarea y ocupar el ancho máximo
Object.values(editors).forEach(textarea => {
  textarea.style.width = '100%';
  textarea.style.boxSizing = 'border-box';
  textarea.style.resize = 'none';

  function autoResize() {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  textarea.addEventListener('input', autoResize);
  // Inicializar tamaño al cargar
  autoResize();
});

// Descargar como zip
function downloadZip() {
  const zip = new JSZip();

  zip.file("index.html", editors.html.value);
  zip.file("style.css", editors.css.value);
  zip.file("script.js", editors.js.value);

  zip.generateAsync({ type: "blob" })
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "mi_proyecto.zip";
      link.click();
      URL.revokeObjectURL(link.href);
    });
}

 window.onload = runCode;

