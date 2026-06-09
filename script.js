/**
 * Thai Local Tale - Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header scroll effect
    const mainHeader = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // 2. Search Overlay Toggle
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300); // Focus input after transition
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // Close search overlay on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
        });
    });

    // 4. Horizontal Smooth Scrolling for Slider/Grid Elements (Mobile & Desktop)
    const setupSlider = (gridId, nextBtnId) => {
        const grid = document.getElementById(gridId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (grid && nextBtn) {
            nextBtn.addEventListener('click', () => {
                const cardWidth = grid.firstElementChild.getBoundingClientRect().width;
                const gap = parseInt(window.getComputedStyle(grid).gap) || 24;
                const scrollAmount = cardWidth + gap;
                
                // If we've reached near the end of scroll, loop back to the start
                if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
                    grid.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    grid.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            });
        }
    };

    setupSlider('storiesGrid', 'storySliderNext');
    setupSlider('videosGrid', 'videoSliderNext');

    // 5. Newsletter Subscription Handling
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterMsg = document.getElementById('newsletterMsg');
    const newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show subscription feedback
            newsletterSubmitBtn.disabled = true;
            newsletterSubmitBtn.textContent = 'SUBSCRIBING...';
            
            setTimeout(() => {
                // Success visual state
                newsletterEmail.value = '';
                newsletterSubmitBtn.disabled = false;
                newsletterSubmitBtn.textContent = 'SUBSCRIBE';
                
                newsletterMsg.style.display = 'block';
                newsletterMsg.style.opacity = '0';
                
                // Fade in feedback msg
                setTimeout(() => {
                    newsletterMsg.style.transition = 'opacity 0.4s ease';
                    newsletterMsg.style.opacity = '1';
                }, 50);

                // Auto fade out feedback msg after 4 seconds
                setTimeout(() => {
                    newsletterMsg.style.opacity = '0';
                    setTimeout(() => {
                        newsletterMsg.style.display = 'none';
                    }, 400);
                }, 4000);
            }, 1000);
        });
    }

    // 6. Sticky Active State Navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId) && currentSectionId !== '') {
                link.classList.add('active');
            } else if (currentSectionId === '' && link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    });

});
