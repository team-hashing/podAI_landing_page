document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const progressCircle = document.getElementById('progress-circle');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const playButton = document.getElementById('play-button');
    let currentSlide = 0;
    let isDragging = false;
    let wasDragging = false;
    let isPlaying = false;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            console.log(index);
            slide.classList.toggle('active', i === index);
        });
    };

    const updateProgressBar = (index) => {
        const totalSlides = slides.length;
        const progressPercentage = (index / (totalSlides)) * 100;
        progressBar.style.width = `calc(${progressPercentage}%)`; // Adjust for circle width
        progressCircle.style.left = `calc(100%)`; // Adjust for circle width
    };

    const startPlaying = () => {
        playInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            updateProgressBar(currentSlide);
        }, 5000); // 5 seconds per slide
    };

    const stopPlaying = () => {
        clearInterval(playInterval);
    }

    const getSlideIndexFromPosition = (position) => {
        const totalSlides = slides.length;
        const progressBarWidth = progressBarContainer.clientWidth;
        const progressPercentage = (position / progressBarWidth) * 100;
        return Math.round((progressPercentage / 100) * (totalSlides - 1));
    };


    progressBarContainer.addEventListener('click', () => {
        if (wasDragging) {
            wasDragging = false;
            return;
        }
        const position = event.offsetX;
        const slideIndex = getSlideIndexFromPosition(position);
        currentSlide = slideIndex;
        progressCircle.style.left = `${position}px`;
        progressBar.style.width = `${position}px`;
        showSlide(currentSlide);
    });

    progressCircle.addEventListener('mousedown', () => {
        isDragging = true;
    });

    progressBarContainer.addEventListener('mousedown', () => {
        if (wasDragging) {
            wasDragging = false;
            return;
        }
        const position = event.offsetX;
        const slideIndex = getSlideIndexFromPosition(position);
        currentSlide = slideIndex;
        progressCircle.style.left = `${position}px`;
        progressBar.style.width = `${position}px`;
        showSlide(currentSlide);
        isDragging = true;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            wasDragging = true;
            const position = event.clientX - progressBarContainer.getBoundingClientRect().left;
            const progressBarWidth = progressBarContainer.clientWidth;
            const clampedPosition = Math.max(0, Math.min(progressBarWidth, position));
            const slideIndex = getSlideIndexFromPosition(clampedPosition);
            currentSlide = slideIndex;
            progressCircle.style.left = `${clampedPosition}px`;
            progressBar.style.width = `${clampedPosition}px`;
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === slideIndex);
            });
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    document.getElementById('forward-button').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        updateProgressBar(currentSlide);
    });

    document.getElementById('backward-button').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        updateProgressBar(currentSlide);
    });


    playButton.addEventListener('click', () => {
        if (isPlaying) {
            stopPlaying();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            startPlaying();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });


    // Initialize the first slide
    showSlide(currentSlide);
});



require('dotenv').config();

const publicKey = process.env.EMAILJS_PUBLIC_KEY;
const template = process.env.EMAILJS_TEMPLATE;
const service = process.env.EMAILJS_SERVICE;

emailjs.init({
    publicKey: publicKey,
});


document.addEventListener('DOMContentLoaded', function () {
    const joinWaitlistBtns = document.getElementsByClassName('join-waitlist-btn');
    const popup = document.querySelector('.popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const waitlistForm = document.getElementById('waitlist-form');
    const greenOverlay = document.querySelector('.green-overlay');
    const popupSections = document.querySelector('.popup-sections');

    // Check if the user is already in the waitlist
    if (localStorage.getItem('inWaitlist') === 'true') {
        Array.from(joinWaitlistBtns).forEach(btn => {
            btn.classList.add('in-waitlist-btn');
            btn.classList.remove('join-waitlist-btn');
            btn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i> In Waitlist';
        });
    }

    for (let i = 0; i < joinWaitlistBtns.length; i++) {
        joinWaitlistBtns[i].addEventListener('click', function () {
            popup.classList.remove('hidden');
        });
    }

    closePopupBtn.addEventListener('click', function () {
        popup.classList.add('hidden');
    });

    waitlistForm.addEventListener('submit', function (event) {
        event.preventDefault();
        popupSections.classList.add('success');
        greenOverlay.classList.add('fade-out');
        popupSections.innerHTML = popupSections.innerHTML + '<div class="success-message"><h1>Success!</h1><p>You have been added to the waitlist.</p><div>';


        emailjs.sendForm(service, template, form)
            .then(function () {
                Array.from(joinWaitlistBtns).forEach(btn => {
                    btn.classList.add('in-waitlist-btn');
                    btn.classList.remove('join-waitlist-btn');
                    btn.innerHTML = '<i class="fa-solid fa-check-to-slot"></i> In Waitlist';
                });
                localStorage.setItem('inWaitlist', 'true');
                setTimeout(() => {
                    popupSections.classList.remove('success');
                    popup.classList.add('hidden');
                }, 2000);
            }, function (error) {
                alert('An error occurred, please try again later.');
            });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date('October 31, 2024 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "EXPIRED";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
});

function shareOnFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), 'facebook-share-dialog', 'width=800,height=600');
}

function shareOnTwitter() {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '&url=' + encodeURIComponent(window.location.href), 'twitter-share-dialog', 'width=800,height=600');
}

function shareOnLinkedIn() {
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent(document.title), 'linkedin-share-dialog', 'width=800,height=600');
}