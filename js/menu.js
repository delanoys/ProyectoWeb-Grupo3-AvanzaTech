document.querySelectorAll('.menu-container').forEach(container => {
  const menuItems = container.querySelector('.menu-items');
  let hideTimeout;

  container.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    menuItems.classList.add('menu-visible');
  });

  container.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      menuItems.classList.remove('menu-visible');
    }, 300); // Puedes ajustar el retraso aquí
  });
});
