document.addEventListener('DOMContentLoaded', function() {
    function initSlider(sliderContainer) {
        let slideIndex = 0;
        let currentAngle = 0;
        const image = sliderContainer.querySelector('.eng-cycle');
        const slides = sliderContainer.querySelectorAll('.slide');
        const colors = ["#06D7FC47", "#D004FB25", "#FBD60447", "#F5188a30"]; // colors for each slide

        image.style.transition = 'transform 1s ease';
        sliderContainer.style.transition = 'background-color 1s ease';

        function showSlide(n) {
            slideIndex = n;

            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }

            slides[slideIndex].style.display = 'block';
            image.style.transform = `rotate(${currentAngle}deg)`;
            sliderContainer.style.backgroundColor = colors[slideIndex]; // Fixed variable name from currentIndex to slideIndex
        }

        function prevSlide() {
            currentAngle += 90; // Adjusted to correctly rotate in the opposite direction
            if (slideIndex === 0) {
                showSlide(slides.length - 1);
            } else {
                showSlide(slideIndex - 1);
            }
        }

        function nextSlide() {
            currentAngle -= 90;
            if (slideIndex === slides.length - 1) {
                showSlide(0);
            } else {
                showSlide(slideIndex + 1);
            }
        }

        showSlide(slideIndex);

        const prevButton = sliderContainer.querySelector('.prev-button');
        const nextButton = sliderContainer.querySelector('.next-button');

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    const sliderContainers = document.querySelectorAll('.slider-container');
    sliderContainers.forEach(initSlider);
});