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

    // 7. Dark/Light Theme Switcher
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const mobileThemeText = document.getElementById('mobileThemeText');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const mobileThemeIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    function updateThemeUI(theme) {
        const isDark = theme === 'dark';
        if (themeIcon) {
            themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        if (mobileThemeText) {
            mobileThemeText.textContent = isDark ? 'LIGHT MODE' : 'DARK MODE';
        }
    }

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // 8. Custom HTML5 Audio Player for Podcasts
    const globalAudio = document.getElementById('globalAudio');
    const globalPlayer = document.getElementById('globalPlayer');
    const playerPlayBtn = document.getElementById('playerPlayBtn');
    const playerCover = document.getElementById('playerCover');
    const playerTitle = document.getElementById('playerTitle');
    const playerCurrentTime = document.getElementById('playerCurrentTime');
    const playerDuration = document.getElementById('playerDuration');
    const playerProgressBar = document.getElementById('playerProgressBar');
    const episodeCards = document.querySelectorAll('.podcast-episode-card');

    let currentTrackCard = null;

    // Helper: format time from seconds to M:SS
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Function to play a specific episode card
    function playEpisode(card) {
        const audioSrc = card.getAttribute('data-audio');
        const titleText = card.getAttribute('data-title') || card.querySelector('.story-card-title a').textContent;
        const imgEl = card.querySelector('.story-img');
        const imgSrc = imgEl ? imgEl.src : 'assets/logo.jpg';

        // Update active class on cards
        episodeCards.forEach(c => c.classList.remove('active-episode'));
        card.classList.add('active-episode');
        currentTrackCard = card;

        // Load new source if changed
        if (globalAudio.src !== audioSrc) {
            globalAudio.src = audioSrc;
            playerTitle.textContent = titleText;
            playerCover.src = imgSrc;
            globalAudio.load();
        }

        globalAudio.play()
            .then(() => {
                updatePlayState(true);
            })
            .catch(err => {
                console.error("Audio playback failed: ", err);
            });
    }

    // Update buttons & player wrapper UI based on play state
    function updatePlayState(isPlaying) {
        const icon = playerPlayBtn ? playerPlayBtn.querySelector('i') : null;
        if (isPlaying) {
            if (globalPlayer) globalPlayer.classList.add('active-playing');
            if (icon) icon.className = 'fa fa-pause';
            // Also update overlays on cards
            episodeCards.forEach(c => {
                const overlayIcon = c.querySelector('.card-play-icon-overlay i');
                if (c === currentTrackCard && overlayIcon) {
                    overlayIcon.className = 'fa fa-pause';
                } else if (overlayIcon) {
                    overlayIcon.className = 'fa fa-play';
                }
            });
        } else {
            if (globalPlayer) globalPlayer.classList.remove('active-playing');
            if (icon) icon.className = 'fa fa-play';
            episodeCards.forEach(c => {
                const overlayIcon = c.querySelector('.card-play-icon-overlay i');
                if (overlayIcon) overlayIcon.className = 'fa fa-play';
            });
        }
    }

    // Bind click events on cards
    episodeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent navigating if user clicked the title link directly
            if (e.target.tagName === 'A') {
                e.preventDefault();
            }
            
            if (currentTrackCard === card) {
                // If it is the active track, toggle play/pause
                if (globalAudio.paused) {
                    globalAudio.play().then(() => updatePlayState(true));
                } else {
                    globalAudio.pause();
                    updatePlayState(false);
                }
            } else {
                playEpisode(card);
            }
        });
    });

    // Play/Pause button control
    if (playerPlayBtn && globalAudio) {
        playerPlayBtn.addEventListener('click', () => {
            const currentSrc = globalAudio.src;
            if (!currentSrc || currentSrc === window.location.href || currentSrc.endsWith('.html') || currentSrc === '') {
                // No audio loaded yet, play first card
                if (episodeCards.length > 0) {
                    playEpisode(episodeCards[0]);
                }
            } else {
                if (globalAudio.paused) {
                    globalAudio.play().then(() => updatePlayState(true));
                } else {
                    globalAudio.pause();
                    updatePlayState(false);
                }
            }
        });
    }

    // Audio time update updates progress bar
    if (globalAudio) {
        globalAudio.addEventListener('timeupdate', () => {
            const currentTime = globalAudio.currentTime;
            const duration = globalAudio.duration || 0;
            
            if (playerCurrentTime) playerCurrentTime.textContent = formatTime(currentTime);
            
            if (playerProgressBar) {
                if (duration > 0) {
                    playerProgressBar.value = (currentTime / duration) * 100;
                } else {
                    playerProgressBar.value = 0;
                }
            }
        });

        globalAudio.addEventListener('loadedmetadata', () => {
            if (playerDuration) playerDuration.textContent = formatTime(globalAudio.duration);
        });

        globalAudio.addEventListener('durationchange', () => {
            if (playerDuration) playerDuration.textContent = formatTime(globalAudio.duration);
        });

        globalAudio.addEventListener('ended', () => {
            updatePlayState(false);
            if (playerProgressBar) playerProgressBar.value = 0;
            if (playerCurrentTime) playerCurrentTime.textContent = "0:00";
        });
    }

    // Drag / Seek control on progress bar
    if (playerProgressBar && globalAudio) {
        playerProgressBar.addEventListener('input', () => {
            const duration = globalAudio.duration || 0;
            if (duration > 0) {
                globalAudio.currentTime = (playerProgressBar.value / 100) * duration;
            }
        });
    }

});
