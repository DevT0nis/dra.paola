document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('reviews-carousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

     // Criação dos cards de avaliação
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

    // Clone do primeiro e último card
    const firstCard = carousel.firstElementChild.cloneNode(true);
    const lastCard = carousel.lastElementChild.cloneNode(true);

    carousel.appendChild(firstCard);
    carousel.insertBefore(lastCard, carousel.firstChild);

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 1; // Start no segundo card (original) para loop infinito
    const cardWidth = carousel.firstElementChild.offsetWidth;
    const totalCards = carousel.children.length;

    // Define a posição inicial
    const setPositionByIndex = () => {
        currentTranslate = currentIndex * -cardWidth;
        prevTranslate = currentTranslate;
        setCarouselPosition();
    };

    const setCarouselPosition = () => {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    };

    const moveToNext = () => {
        if (currentIndex >= totalCards - 1) {
            currentIndex = 1; // Pular para o primeiro card original
            setPositionByIndex();
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentTranslate = currentIndex * -cardWidth;
                setCarouselPosition();
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                }, 20);
            }, 500);
        } else {
            currentIndex++;
            setPositionByIndex();
        }
    };

    const moveToPrev = () => {
        if (currentIndex <= 0) {
            currentIndex = totalCards - 2; // Ir para o último card original
            setPositionByIndex();
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentTranslate = currentIndex * -cardWidth;
                setCarouselPosition();
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                }, 20);
            }, 500);
        } else {
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

    prevButton.addEventListener('click', moveToPrev);
    nextButton.addEventListener('click', moveToNext);

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Inicializa o carrossel
    setPositionByIndex();
});


