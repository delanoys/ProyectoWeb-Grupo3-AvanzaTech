// aprendiendoHtml.js

// Ejecuta el código HTML dentro del iframe preview
function ejecutarCodigo() {
  const editor = document.getElementById('htmlEditor');
  const preview = document.getElementById('preview');
  const contenido = editor.value;
  preview.srcdoc = contenido;
}

// Copiar contenido del editor al portapapeles
function copiarCodigo() {
  const editor = document.getElementById('htmlEditor');
  editor.select();
  editor.setSelectionRange(0, 99999); // Para móviles
  navigator.clipboard.writeText(editor.value).then(() => {
    alert('Código copiado al portapapeles');
  }, () => {
    alert('No se pudo copiar el código');
  });
}

// Alternar modo claro/oscuro
function toggleTheme() {
  const body = document.body;
  const checkbox = document.getElementById('toggleTheme');
  if (checkbox.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

// Carga la preferencia guardada del tema al iniciar
function cargarTema() {
  const theme = localStorage.getItem('theme');
  const checkbox = document.getElementById('toggleTheme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    checkbox.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    checkbox.checked = false;
  }
}

// Scroll suave para enlaces de navegación
function smoothScroll() {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarTema();
  smoothScroll();

  document.getElementById('runBtn').addEventListener('click', ejecutarCodigo);
  document.getElementById('copyBtn').addEventListener('click', copiarCodigo);
  document.getElementById('toggleTheme').addEventListener('change', toggleTheme);
});
