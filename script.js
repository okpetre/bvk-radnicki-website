document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    function toggleBackToTopButton() {
        // Show button only when scrolled near the bottom of the page
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) { // 50px buffer from the bottom
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }

    // Initial check on load
    toggleBackToTopButton();

    // Handle scroll instruction visibility
    const scrollInstructions = document.querySelectorAll('.scroll-instruction');

    const updateScrollInstructionVisibility = () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            scrollInstructions.forEach(instruction => {
                instruction.style.display = 'block';
            });
        } else {
            scrollInstructions.forEach(instruction => {
                instruction.style.display = 'none';
            });
        }
    };

    // Initial check
    updateScrollInstructionVisibility();

    // Update on resize
    window.addEventListener('resize', updateScrollInstructionVisibility);

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    });

    // Function to limit the results table to the last 5 rows
    const limitResultsTableRows = () => {
        const resultsTableBody = document.querySelector('.results-table tbody');
        if (resultsTableBody) {
            const rows = resultsTableBody.querySelectorAll('tr');
            if (rows.length > 5) {
                for (let i = 0; i < rows.length - 5; i++) {
                    resultsTableBody.removeChild(rows[i]);
                }
            }
        }
    };

    // News Carousel functionality
    const newsCarousel = document.querySelector('.news-carousel-inner');
    const newsItems = document.querySelectorAll('.news-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    const totalNews = newsItems.length;

    const showNews = (index) => {
        if (index >= totalNews) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalNews - 1;
        }
        newsCarousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    };

    const nextNews = () => {
        currentIndex++;
        showNews(currentIndex);
    };

    const prevNews = () => {
        currentIndex--;
        showNews(currentIndex);
    };

    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextNews, 5000); // Change slide every 5 seconds

    // Pause auto-slide on hover
    newsCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    newsCarousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextNews, 5000);
    });

    // Navigation button event listeners
    prevButton.addEventListener('click', () => {
        prevNews();
        clearInterval(autoSlideInterval); // Stop auto-slide on manual navigation
        autoSlideInterval = setInterval(nextNews, 5000); // Restart auto-slide
    });

    nextButton.addEventListener('click', () => {
        nextNews();
        clearInterval(autoSlideInterval); // Stop auto-slide on manual navigation
        autoSlideInterval = setInterval(nextNews, 5000); // Restart auto-slide
    });

    // Initial display
    showNews(currentIndex);

    // Mobile Navigation Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');

    if (hamburgerMenu && mobileNavMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileNavMenu.classList.toggle('active');
        });

        // Close mobile nav when a link is clicked
        mobileNavMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            });
        });
    }

    // Handle clicks on call-to-action items
    const callToActionItems = document.querySelectorAll('.call-to-action-item');

    callToActionItems.forEach(item => {
        item.style.cursor = 'pointer'; // Indicate that the item is clickable
        item.addEventListener('click', function() {
            const altText = this.querySelector('img').alt;
            if (altText === 'Upis u skolicu plivanja') {
                window.location.href = 'skolica-info.html';
            } else if (altText === 'Postani deo BVK Radnicki') {
                window.location.href = 'team-info.html';
            }
        });
    });

    // Initial call to limit the results table rows
    limitResultsTableRows();
});