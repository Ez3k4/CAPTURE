document.addEventListener("DOMContentLoaded", function() {
    // Select all images with the class 'jump-on-hover'
    const images = document.querySelectorAll('.jump-on-hover');

    // Iterate over each image and add hover event listeners
    images.forEach(img => {
        // Add mouseenter event to animate the image upwards
        img.addEventListener('mouseenter', () => {
            gsap.to(img, { y: -10, duration: 0.3, ease: "power1.out" });
        });

        // Add mouseleave event to animate the image back to its original position
        img.addEventListener('mouseleave', () => {
            gsap.to(img, { y: 0, duration: 0.3, ease: "power1.out" });
        });
    });
});