function toggleMenu() {
  var navMenu = document.querySelector('.nav-menu');
  var menuButton = document.getElementById('menu-button');

  navMenu.classList.toggle('active');

  // If the nav menu is active, change the button text to 'X', otherwise change it back to '☰'
  if (navMenu.classList.contains('active')) {
      menuButton.textContent = 'X';
  } else {
      menuButton.textContent = '☰';
  }
}


function toggleDropdown(event) {
  var dropdown = event.target.parentElement;
  dropdown.classList.toggle('active');

  // If the dropdown is active, add an event listener to the document
  if (dropdown.classList.contains('active')) {
      // This function will be called whenever you click anywhere in the document
      var closeDropdown = function(event) {
          // If the click was not inside the dropdown, close the dropdown
          if (!dropdown.contains(event.target)) {
              dropdown.classList.remove('active');
              // Remove the event listener now that the dropdown is closed
              document.removeEventListener('click', closeDropdown);
          }
      };

      // Add the event listener
      document.addEventListener('click', closeDropdown);
  }
}



document.addEventListener("DOMContentLoaded", function() {
    var headerHeight = document.querySelector('header').offsetHeight;
  
    // Handle click events
    document.querySelectorAll('#sidebar ul li a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove 'active' class from all sidebar links
        document.querySelectorAll('#sidebar ul li a').forEach(link => {
          link.classList.remove('active');
        });
  
        // Add 'active' class to the clicked link
        this.classList.add('active');
        
        var targetElement = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      });
    });
  
   // Handle scroll events
   window.addEventListener('scroll', function() {
    var fromTop = window.scrollY + headerHeight;

    // Check each subchapter
    document.querySelectorAll('#sidebar ul li a[href^="#"]').forEach(link => {
        var section = document.querySelector(link.getAttribute('href'));

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            // Remove 'active' class from all sidebar links
            document.querySelectorAll('#sidebar ul li a').forEach(link => {
                link.classList.remove('active');
            });

            // Add 'active' class to the in-view section's link
            link.classList.add('active');
        }
     });
    });
});
  
  