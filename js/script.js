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

    const animation = () => {
        setCarouselPosition();
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    };

    const handleMouseDown = (event) => {
        isDragging = true;
        startPos = event.clientX;
        prevTranslate = currentTranslate;
        carousel.style.transition = 'none';
        animationID = requestAnimationFrame(animation);
        carousel.classList.add('grabbing');
    };

    const handleTouchStart = (event) => {
        isDragging = true;
        startPos = event.touches[0].clientX;
        prevTranslate = currentTranslate;
        carousel.style.transition = 'none';
        animationID = requestAnimationFrame(animation);
        carousel.classList.add('grabbing');
    };

    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            cancelAnimationFrame(animationID);
            carousel.classList.remove('grabbing');
            carousel.style.transition = 'transform 0.3s ease-out';
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -50) moveToNext();
            else if (movedBy > 50) moveToPrev();
            else setPositionByIndex();
        }
    };

    const handleTouchEnd = () => {
        if (isDragging) {
            isDragging = false;
            cancelAnimationFrame(animationID);
            carousel.classList.remove('grabbing');
            carousel.style.transition = 'transform 0.3s ease-out';
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -50) moveToNext();
            else if (movedBy > 50) moveToPrev();
            else setPositionByIndex();
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const currentPosition = event.clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    };

    const handleTouchMove = (event) => {
        if (isDragging) {
            const currentPosition = event.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    };

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
});
