// Ejecutar código del editor en el iframe como texto
document.getElementById("runBtn").addEventListener("click", function () {
  const code = document.getElementById("gitEditor").value;
  const previewFrame = document.getElementById("preview");
  const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;

  preview.open();
  preview.write(`<pre>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`);
  preview.close();
});

// Copiar el contenido del editor al portapapeles
document.getElementById("copyBtn").addEventListener("click", function () {
  const textarea = document.getElementById("gitEditor");
  textarea.select();
  document.execCommand("copy");
  alert("Código copiado al portapapeles");
});

// Toggle sidebar en pantallas pequeñas
document.getElementById("toggleSidebar").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
});
