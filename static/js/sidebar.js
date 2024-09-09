

document.addEventListener("DOMContentLoaded", function() {
     let headerHeight = document.querySelector('header').offsetHeight;
  
    // Handle click events
    document.querySelectorAll('#sidebar ul li a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault(); // prevents default behaviour to make modifying possible
        
        // Remove 'active' class from all sidebar links
        document.querySelectorAll('#sidebar ul li a').forEach(link => {
          link.classList.remove('active');
        });

        // Add 'active' class to the clicked link
        this.classList.add('active');

        var targetElement = document.querySelector(this.getAttribute('href'));
        const parentOfTarget = targetElement.closest(".has-subpoints")
        console.log(parentOfTarget)

        // defines how the and where to scroll
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });

        //logs clicked class as poc that selection is working 
        console.log(targetElement)
      });
    });


    // toggle function for submenu
    const pointsWithSubpoints = document.querySelectorAll('#sidebar li.has-subpoints > a');
    console.log(pointsWithSubpoints)

    pointsWithSubpoints.forEach(point => {
      point.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent the default anchor behavior
          const subpoints = point.nextElementSibling;

          if (subpoints && subpoints.classList.contains('subpoints')) {
              subpoints.classList.toggle('visible');
          }
      });
  });

    // Handle scroll events
    var sections = document.querySelectorAll('main section');
    var sidebarLinks = document.querySelectorAll('#sidebar ul li a');
    console.log(sections, sidebarLinks)

    var observerOptions = {
      root: null,
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0.5 // Adjust this value as needed
    };
  
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove 'active' class from all sidebar links
          sidebarLinks.forEach(link => {
            link.classList.remove('active');
          });
  
          // Add 'active' class to the corresponding sidebar link
          var activeLink = document.querySelector(`#sidebar ul li a[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);
  
    // Observe each section
    sections.forEach(section => {
      observer.observe(section);
    });
  });

  
