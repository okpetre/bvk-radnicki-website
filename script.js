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
});