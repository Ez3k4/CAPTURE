  document.addEventListener('DOMContentLoaded', function() {
    var icons = document.querySelectorAll('.icon');
    icons.forEach(function(icon) {
      var service = icon.getAttribute('data-service');
      if (service) {  
        fetch('https://static.igem.wiki/teams/5057/social-icons/' + service + '.svg')
          .then(function(response) {
            return response.text();
          })
          .then(function(svg) {
            icon.innerHTML = svg;
          })
          .catch(function(error) {
            console.log('Error fetching SVG:', error);
          });
      }  
    });
  });


