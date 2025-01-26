(function (d) {
    var createSlider = (container) => {
        var slider = container,
            slides = slider.querySelectorAll('.slide'),
            prevBtn = d.querySelector('.prev'),
            nextBtn = d.querySelector('.next'),
            currentIndex = 0,
            startX;

        const updateSliderPosition = () => {
            var slideWidth = slides[0].offsetWidth,
                gap = parseFloat(getComputedStyle(slider).gap),
                offset = currentIndex * (slideWidth + gap);

            slider.style.transform = `translateX(-${offset}px)`;
            slider.style.transition = 'transform 0.3s ease-in-out';

            // Update button visibility
            prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
            nextBtn.style.visibility = currentIndex === slides.length - 1 ? 'hidden' : 'visible';
        };

        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        // Touch events
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX;
            }, { passive: true });

            slider.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].pageX;
                const walk = endX - startX;

                if (Math.abs(walk) > 50) {
                    if (walk > 0 && currentIndex > 0) {
                        currentIndex--;
                    } else if (walk < 0 && currentIndex < slides.length - 1) {
                        currentIndex++;
                    }
                    updateSliderPosition();
                }
            }, { passive: true });
        }

        updateSliderPosition();
    };

    createSlider(d.querySelector('#testimonial'));
})(document);