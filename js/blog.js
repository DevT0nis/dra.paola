document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards-blog');
    const cards = document.querySelectorAll('.card-conteudo');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
    let totalWidth = cardWidth * cards.length;
    let currentPosition = 0;

    // Clone cards for infinite scroll
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        cardsContainer.appendChild(clone);
    });

    function updateCarousel() {
        if (currentPosition < -totalWidth) {
            currentPosition += totalWidth;
            cardsContainer.style.transition = 'none';
            cardsContainer.style.transform = `translateX(${currentPosition}px)`;
            setTimeout(() => {
                cardsContainer.style.transition = 'transform 0.3s ease-in-out';
            }, 10);
        } else if (currentPosition > 0) {
            currentPosition -= totalWidth;
            cardsContainer.style.transition = 'none';
            cardsContainer.style.transform = `translateX(${currentPosition}px)`;
            setTimeout(() => {
                cardsContainer.style.transition = 'transform 0.3s ease-in-out';
            }, 10);
        }

        cardsContainer.style.transform = `translateX(${currentPosition}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentPosition += cardWidth;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentPosition -= cardWidth;
        updateCarousel();
    });

    // Update on window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
        totalWidth = cardWidth * cards.length;
        currentPosition = 0;
        updateCarousel();
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    cardsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    cardsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            currentPosition -= cardWidth;
            updateCarousel();
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            currentPosition += cardWidth;
            updateCarousel();
        }
    }
});