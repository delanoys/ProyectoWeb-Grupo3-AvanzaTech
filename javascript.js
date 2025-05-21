// Initialize Feather icons
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather icons
  feather.replace();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      // Create mobile menu if it doesn't exist
      if (!document.querySelector('.mobile-nav')) {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Clone the navigation links
        const navLinks = mainNav.cloneNode(true);
        mobileNav.appendChild(navLinks);
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-nav-close';
        closeButton.innerHTML = '<i data-feather="x"></i>';
        closeButton.addEventListener('click', function() {
          document.body.classList.remove('mobile-nav-open');
          setTimeout(() => {
            mobileNav.style.display = 'none';
          }, 300);
        });
        
        mobileNav.prepend(closeButton);
        document.body.appendChild(mobileNav);
        
        // Initialize Feather icons for the new elements
        feather.replace();
        
        // Add styles for mobile navigation
        const style = document.createElement('style');
        style.textContent = `
          .mobile-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 100;
            padding: 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            display: none;
          }
          
          .mobile-nav-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
          }
          
          .mobile-nav .main-nav {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 3rem;
          }
          
          .mobile-nav .nav-link {
            font-size: 1.25rem;
            margin-left: 0;
          }
          
          body.mobile-nav-open .mobile-nav {
            transform: translateX(0);
          }
        `;
        
        document.head.appendChild(style);
      }
      
      // Show mobile menu
      const mobileNav = document.querySelector('.mobile-nav');
      mobileNav.style.display = 'block';
      
      // Delay to ensure display block is applied before animation
      setTimeout(() => {
        document.body.classList.add('mobile-nav-open');
      }, 10);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Close mobile menu if open
          if (document.body.classList.contains('mobile-nav-open')) {
            document.body.classList.remove('mobile-nav-open');
            setTimeout(() => {
              document.querySelector('.mobile-nav').style.display = 'none';
            }, 300);
          }
          
          // Scroll to the target element
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add scroll event listener for header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }
});