// Mostrar botón de scroll cuando el usuario se desplaza
const scrollBtn = document.getElementById('scrollTopBtn');

window.onscroll = () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
};

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Simulación de ejecución de comandos Git
function ejecutarCodigoGit() {
  const codigo = document.getElementById('gitEditor').value;
  const salida = `
    <h3>Resultado Simulado:</h3>
    <pre>${codigo.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    <p>(Nota: Esta es una simulación visual. Git no se ejecuta en el navegador)</p>
  `;
  document.getElementById('previewGit').srcdoc = salida;
}

// Mostrar/ocultar sidebar en móviles
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

toggleSidebar.addEventListener('click', () => {
  sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
});

