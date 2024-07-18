document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('reviews-carousel');

  

    reviewsData.forEach((review) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';

        const clientInfo = document.createElement('div');
        clientInfo.className = 'client-info';

        const avatar = document.createElement('img');
        avatar.className = 'avatar';
        avatar.src = review.avatar;


        const clientName = document.createElement('span');
        clientName.className = 'client-name';
        clientName.textContent = review.name;

        clientInfo.appendChild(avatar);
        clientInfo.appendChild(clientName);

        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.textContent = review.comment;

        const stars = document.createElement('div');
        stars.className = 'stars';
        stars.innerHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        reviewCard.appendChild(clientInfo);
        reviewCard.appendChild(comment);
        reviewCard.appendChild(stars);
        carousel.appendChild(reviewCard);
    });

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    const reviewsLength = reviewsData.length;

    const setPositionByIndex = () => {
        currentTranslate = currentIndex * -carousel.offsetWidth;
        prevTranslate = currentTranslate;
        setCarouselPosition();
    };

    const setCarouselPosition = () => {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    };

    const moveToNext = () => {
        if (currentIndex < reviewsLength - 1) {
            currentIndex++;
            setPositionByIndex();
        }
    };

    const moveToPrev = () => {
        if (currentIndex > 0) {
            currentIndex--;
            setPositionByIndex();
        }
    };

    carousel.addEventListener('mousedown', (event) => {
        isDragging = true;
        startPos = event.clientX;
        animationID = requestAnimationFrame(animation);
        carousel.classList.add('grabbing');
    });

    carousel.addEventListener('touchstart', (event) => {
        isDragging = true;
        startPos = event.touches[0].clientX;
        animationID = requestAnimationFrame(animation);
        carousel.classList.add('grabbing');
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            cancelAnimationFrame(animationID);
            carousel.classList.remove('grabbing');
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -5) moveToNext();
            if (movedBy > 5) moveToPrev();
            else setPositionByIndex();
        }
    });

    window.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            cancelAnimationFrame(animationID);
            carousel.classList.remove('grabbing');
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -50) moveToNext();
            if (movedBy > 50) moveToPrev();
            else setPositionByIndex();
        }
    });

    window.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const currentPosition = event.clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    });

    window.addEventListener('touchmove', (event) => {
        if (isDragging) {
            const currentPosition = event.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    });

    const animation = () => {
        setCarouselPosition();
        if (isDragging) requestAnimationFrame(animation);
    };
});
