document.querySelectorAll('.team-member').forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });