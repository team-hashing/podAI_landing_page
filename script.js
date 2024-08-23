document.addEventListener('scroll', function () {
    const parallaxElements = document.querySelectorAll('.parallax');
    const scrollPosition = window.scrollY;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });

    // Existing scroll event logic
    const header = document.querySelector('.header');
    const reviews = document.querySelector('.reviews');
    const navbar = document.querySelector('nav');
    const progressBar = document.querySelector('.progress-bar');
    const headerHeight = header.offsetHeight;
    const reviewsTop = reviews.offsetTop;

    if (window.scrollY > headerHeight && window.scrollY < reviewsTop) {
        navbar.classList.add('scrolled');
        progressBar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        progressBar.classList.remove('scrolled');
    }

    // Update progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});


document.addEventListener('DOMContentLoaded', () => {
    const scrollSection = document.getElementById('scroll-section');
    const path = document.getElementById('scroll-path');
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const sectionTop = scrollSection.offsetTop;
        const sectionHeight = scrollSection.offsetHeight;

        // Calculate the start and end points for the drawing
        const startDrawingPoint = sectionTop - windowHeight;
        const endDrawingPoint = sectionTop + sectionHeight;

        if (scrollTop >= startDrawingPoint && scrollTop <= endDrawingPoint) {
            const scrollPercentage = (scrollTop - startDrawingPoint) / (endDrawingPoint - startDrawingPoint);
            const drawLength = pathLength * scrollPercentage;

            // Draw in reverse
            path.style.strokeDashoffset = pathLength - drawLength;

        } else if (scrollTop < startDrawingPoint) {
            path.style.strokeDashoffset = pathLength; // Fully hidden
        } else if (scrollTop > endDrawingPoint) {
            path.style.strokeDashoffset = 0; // Fully drawn
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollItems = document.querySelectorAll('.scroll-item');
    const scrollSection = document.getElementById('scroll-section');
    const scrollSvg = document.getElementById('scroll-svg');

    // Calculate the height of the SVG and set the height of the scroll-section
    const svgHeight = scrollSvg.getBoundingClientRect().height;
    scrollSection.style.height = `${svgHeight}px`;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    scrollItems.forEach(item => {
        observer.observe(item);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const concepts = ["Podcast Concept 1", "Podcast Concept 2", "Podcast Concept 3"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const display = document.getElementById('podcast-display');

    function type() {
        const current = concepts[index];
        const cursor = `<span class="blinking-cursor">|</span>`;
        if (isDeleting) {
            display.innerHTML = current.substring(0, charIndex--) + cursor;
            if (charIndex < 0) {
                isDeleting = false;
                index = (index + 1) % concepts.length;
            }
        } else {
            display.innerHTML = current.substring(0, charIndex++) + cursor;
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause before deleting
                return;
            }
        }
        setTimeout(type, isDeleting ? 100 : 200);
    }

    type();
});


document.addEventListener('DOMContentLoaded', () => {
    const reviewsText = [
        {
            name: 'John Doe',
            date: '2021-01-01',
            stars: 5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
        },
        {
            name: 'Jane Doe',
            date: '2021-01-02',
            stars: 4,
            review: 'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.'
        },
        {
            name: 'Alice Doe',
            date: '2021-01-03',
            stars: 3,
            review: 'Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.'
        }
    ];

    const reviewCard = document.getElementById('review-card');
    const reviewAuthor = document.getElementById('review-author');
    const reviewDate = document.getElementById('review-date');
    const reviewStars = document.getElementById('review-stars');
    const reviewText = document.getElementById('review-text');
    let currentReview = 0;

    showNextReview();
    function showNextReview() {
        reviewCard.classList.remove('fade-in');
        reviewCard.classList.add('fade-out');

        setTimeout(() => {
            currentReview = (currentReview + 1) % reviewsText.length;
            const review = reviewsText[currentReview];
            reviewAuthor.textContent = '- ' + review.name;
            reviewDate.textContent = review.date;
            reviewStars.innerHTML = '<i class="fas fa-star"></i>'.repeat(review.stars);
            reviewText.textContent = review.review;

            reviewCard.classList.remove('fade-out');
            reviewCard.classList.add('fade-in');
        }, 1000); // Match this duration with the fade-out animation duration
    }
});

require('dotenv').config();

const publicKey = process.env.EMAILJS_PUBLIC_KEY;
const template = process.env.EMAILJS_TEMPLATE;
const service = process.env.EMAILJS_SERVICE;

emailjs.init({
    publicKey: publicKey,
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = this;
    const button = document.getElementById('submit-button');


    emailjs.sendForm(service, template, form)
        .then(function () {
            showButtonMessage(button, 'success', 'Sent <i class="fas fa-check"></i>');
        }, function (error) {
            showButtonMessage(button, 'error', 'Error <i class="fas fa-times"></i>');
        });
});

function showButtonMessage(button, type, message) {
    button.classList.add(type);
    button.innerHTML = message;

    setTimeout(() => {
        button.classList.remove(type);
        button.innerHTML = 'Submit';
    }, 2000); // Duration of the color change
}


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

        const form = this;


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