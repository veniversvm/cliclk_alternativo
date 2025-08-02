// public/scripts/toggle.js

function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');

  // Si los elementos no existen (ej. en vista de escritorio), no hacemos nada.
  if (!hamburgerBtn || !sidebar || !overlay) {
    return;
  }

  const toggleSidebar = () => {
    const isOpen = sidebar.classList.contains('is-open');
    hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
    sidebar.classList.toggle('is-open');
    hamburgerBtn.classList.toggle('is-active');
    
    // El overlay se gestiona por CSS, pero si quisiéramos controlarlo con JS:
    // document.body.classList.toggle('sidebar-open');
  };

  const closeSidebar = () => {
    if (sidebar.classList.contains('is-open')) {
      toggleSidebar();
    }
  };

  // Event listener para el botón de hamburguesa
  hamburgerBtn.addEventListener('click', toggleSidebar);
  
  // Event listener para el overlay (para cerrar el menú al hacer clic fuera)
  overlay.addEventListener('click', closeSidebar);

  // Event listener para los enlaces del menú (para cerrar el menú después de navegar)
  const menuLinks = sidebar.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
}

// 1. Ejecutamos la función en la carga inicial de la página
initMobileMenu();

// 2. ¡LA CLAVE! Ejecutamos la función de nuevo después de cada navegación de Astro
document.addEventListener('astro:after-swap', initMobileMenu);