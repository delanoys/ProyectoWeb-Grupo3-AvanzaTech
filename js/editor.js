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
function runCode() {
  const html = editors.html.value;
  const css = `<style>${editors.css.value}</style>`;
  const js = `<script>${editors.js.value}<\/script>`;
  const output = html + css + js;

  document.getElementById('preview').srcdoc = output;
}

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