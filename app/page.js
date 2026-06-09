'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // States for interactive components
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  
  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle'); // idle, loading, success

  // Navigation Links Active State
  const [activeLink, setActiveLink] = useState('home');

  // Refs for Slider Scrolling
  const storiesGridRef = useRef(null);
  const videosGridRef = useRef(null);
  const searchInputRef = useRef(null);

  // Scroll listener for sticky header and active navigation items
  useEffect(() => {
    const handleScroll = () => {
      // 1. Header scroll visual state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Active nav link state based on scroll position
      const sections = [
        { id: 'home', top: 0 },
        { id: 'featured', element: document.getElementById('featured') },
        { id: 'categories', element: document.getElementById('categories') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'videos', element: document.getElementById('videos') }
      ];

      let currentActive = 'home';
      
      sections.forEach((sec) => {
        if (sec.element) {
          const sectionTop = sec.element.offsetTop;
          if (window.scrollY >= (sectionTop - 180)) {
            currentActive = sec.id;
          }
        }
      });

      setActiveLink(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handler to close search overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchActive) {
        setSearchActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchActive]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300);
    }
  }, [searchActive]);

  // Horizontal Slider scroll helper
  const handleNextScroll = (gridRef) => {
    if (gridRef.current) {
      const grid = gridRef.current;
      const cardWidth = grid.firstElementChild.getBoundingClientRect().width;
      const gap = 24; // gap spacing specified in CSS
      const scrollAmount = cardWidth + gap;

      // Loop back to start if scrolled near the end
      if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
        grid.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        grid.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  // Newsletter Form Submit Handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('loading');

    setTimeout(() => {
      setEmail('');
      setSubscribeStatus('success');

      // Hide success message after 4 seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 4000);
    }, 1000);
  };

  return (
    <>
      {/* Header Navigation */}
      <header className={`main-header ${scrolled ? 'scrolled' : ''}`} id="mainHeader">
        <div className="header-container">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" id="logoLink" onClick={() => setActiveLink('home')}>
            <img src="/assets/logo.jpg" alt="Thai Local Tale Logo" className="logo-img" />
          </a>
          
          {/* Desktop Navigation Menu */}
          <nav className="nav-menu" id="navMenu">
            <ul>
              <li>
                <a 
                  href="#" 
                  className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveLink('home'); }}
                >
                  HOME
                </a>
              </li>
              <li>
                <a 
                  href="#featured" 
                  className={`nav-link ${activeLink === 'featured' ? 'active' : ''}`}
                >
                  STORIES
                </a>
              </li>
              <li>
                <a 
                  href="#categories" 
                  className={`nav-link ${activeLink === 'categories' ? 'active' : ''}`}
                >
                  PLACES
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                >
                  FOOD
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                >
                  CULTURE
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                >
                  ABOUT US
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Right-Side Utilities (Socials & Search) */}
          <div className="header-utilities">
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" id="fbLink">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" id="igLink">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" id="ttLink">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" id="ytLink">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <button 
              className="search-btn" 
              onClick={() => setSearchActive(true)} 
              aria-label="Search"
              id="searchToggle"
            >
              <i className="fa fa-search"></i>
            </button>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuActive(true)} 
              aria-label="Toggle Mobile Menu"
              id="mobileMenuToggle"
            >
              <i className="fa fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <div className={`search-overlay ${searchActive ? 'active' : ''}`} id="searchOverlay">
        <button 
          className="close-search-btn" 
          onClick={() => setSearchActive(false)} 
          aria-label="Close Search"
          id="closeSearch"
        >
          &times;
        </button>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="ค้นหาเรื่องราวท่องเที่ยว คัลเจอร์..." 
            id="searchInput" 
            ref={searchInputRef}
          />
          <button className="search-submit-btn" id="searchSubmit" aria-label="Submit Search">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuActive ? 'active' : ''}`} id="mobileMenuOverlay">
        <button 
          className="close-menu-btn" 
          onClick={() => setMobileMenuActive(false)} 
          aria-label="Close Menu"
          id="closeMobileMenu"
        >
          &times;
        </button>
        <div className="mobile-nav-links">
          <a 
            href="#" 
            className={`mobile-nav-link ${activeLink === 'home' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setMobileMenuActive(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            HOME
          </a>
          <a href="#featured" className="mobile-nav-link" onClick={() => setMobileMenuActive(false)}>STORIES</a>
          <a href="#categories" className="mobile-nav-link" onClick={() => setMobileMenuActive(false)}>PLACES</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuActive(false)}>FOOD</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuActive(false)}>CULTURE</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuActive(false)}>ABOUT US</a>
          <div className="mobile-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-tiktok"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="home">
        
        {/* Hero Banner Section */}
        <section className="hero-section" id="heroSection">
          <div className="hero-bg-overlay"></div>
          <div className="hero-content-container">
            <h1 className="hero-title" id="heroTitle">
              Your Story,<br />
              <span className="hero-title-accent">Our Thailand</span>
            </h1>
            <p className="hero-subtitle" id="heroSubtitle">
              Discover the beauty of Thailand through local stories, culture, people, and places you may never know.
            </p>
            <a href="#featured" className="btn btn-primary" id="exploreStoriesBtn">
              EXPLORE STORIES <i className="fa fa-arrow-right"></i>
            </a>
          </div>
        </section>

        {/* Featured Stories Section */}
        <section className="featured-section" id="featured">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">FEATURED STORIES</h2>
              <a href="#" className="view-all-link" id="viewAllStories">VIEW ALL <i className="fa fa-arrow-right"></i></a>
            </div>
            
            {/* Stories Carousel/Grid */}
            <div className="stories-slider-container">
              <div className="stories-grid" id="storiesGrid" ref={storiesGridRef}>
                
                {/* Card 1 */}
                <article className="story-card" id="storyCard1">
                  <div className="story-img-container">
                    <img src="https://images.unsplash.com/photo-1552596880-cd2b2a1a4570?q=80&w=800" alt="ตลาดน้ำในประเทศไทย" className="story-img" />
                    <span className="story-category-tag tag-culture">CULTURE</span>
                  </div>
                  <div className="story-content">
                    <h3 className="story-card-title"><a href="#">Floating Markets of Thailand</a></h3>
                    <p className="story-card-desc">A timeless way of life on the water, where tradition still floats every day.</p>
                    <div className="story-meta">
                      <span><i className="far fa-calendar"></i> May 12, 2024</span>
                      <span><i className="far fa-clock"></i> 6 min read</span>
                    </div>
                  </div>
                </article>

                {/* Card 2 */}
                <article className="story-card" id="storyCard2">
                  <div className="story-img-container">
                    <img src="https://images.unsplash.com/photo-1580983218765-f663becf485a?q=80&w=800" alt="อยุธยา เมืองมรดกโลก" className="story-img" />
                    <span className="story-category-tag tag-places">PLACES</span>
                  </div>
                  <div className="story-content">
                    <h3 className="story-card-title"><a href="#">Ayutthaya: The Ancient Glory</a></h3>
                    <p className="story-card-desc">Step back in time and explore the majestic legacy of Thailand's old capital.</p>
                    <div className="story-meta">
                      <span><i className="far fa-calendar"></i> Apr 28, 2024</span>
                      <span><i className="far fa-clock"></i> 5 min read</span>
                    </div>
                  </div>
                </article>

                {/* Card 3 */}
                <article className="story-card" id="storyCard3">
                  <div className="story-img-container">
                    <img src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800" alt="ขนมหวานไทย" className="story-img" />
                    <span className="story-category-tag tag-food">FOOD</span>
                  </div>
                  <div className="story-content">
                    <h3 className="story-card-title"><a href="#">The Charm of Thai Dessert</a></h3>
                    <p className="story-card-desc">Sweet, delicate, and full of story. Thai desserts are more than just food.</p>
                    <div className="story-meta">
                      <span><i className="far fa-calendar"></i> Apr 15, 2024</span>
                      <span><i className="far fa-clock"></i> 4 min read</span>
                    </div>
                  </div>
                </article>

              </div>
              
              {/* Slider Navigation Buttons */}
              <button 
                className="slider-nav-btn next-btn" 
                onClick={() => handleNextScroll(storiesGridRef)} 
                aria-label="Next stories"
                id="storySliderNext"
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Explore by Category Section */}
        <section className="categories-section" id="categories">
          <div className="section-container">
            <div className="category-divider">
              <span className="divider-line"></span>
              <h2 className="category-section-title">EXPLORE BY CATEGORY</h2>
              <span className="divider-line"></span>
            </div>
            
            <div className="categories-grid" id="categoriesGrid">
              {/* Places Category */}
              <a href="#" className="category-item" id="catPlaces">
                <div className="category-circle">
                  <svg viewBox="0 0 64 64" className="category-svg" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M32 4 L24 22 L40 22 Z M24 22 L16 36 L48 36 L40 22 Z M16 36 L6 52 L58 52 L48 36 Z M32 4 L32 10" />
                    <path d="M12 52 L12 60 L52 60 L52 52" />
                  </svg>
                </div>
                <span className="category-label">PLACES</span>
              </a>

              {/* Culture Category */}
              <a href="#" className="category-item" id="catCulture">
                <div className="category-circle">
                  <svg viewBox="0 0 64 64" className="category-svg" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 36 L32 12 L56 36" />
                    <path d="M18 26 L18 52 L46 52 L46 26" />
                    <path d="M32 12 L32 4" />
                    <path d="M26 38 L32 30 L38 38 Z" strokeWidth="1.5" />
                    <path d="M6 36 C9 36, 12 33, 12 30" />
                    <path d="M58 36 C55 36, 52 33, 52 30" />
                  </svg>
                </div>
                <span className="category-label">CULTURE</span>
              </a>

              {/* Food Category */}
              <a href="#" className="category-item" id="catFood">
                <div className="category-circle">
                  <svg viewBox="0 0 64 64" className="category-svg" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 26 C10 44, 54 44, 54 26 Z" />
                    <path d="M32 44 L32 54" />
                    <path d="M22 54 L42 54" />
                    <path d="M18 10 L50 20" />
                    <path d="M22 8 L54 18" />
                    <path d="M14 26 C22 20, 42 20, 50 26" />
                  </svg>
                </div>
                <span className="category-label">FOOD</span>
              </a>

              {/* People Category */}
              <a href="#" className="category-item" id="catPeople">
                <div className="category-circle">
                  <svg viewBox="0 0 64 64" className="category-svg" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M32 10 C20 10, 8 20, 8 26 L56 26 C56 20, 44 10, 32 10 Z" />
                    <circle cx="32" cy="38" r="8" />
                    <path d="M18 58 C18 48, 46 48, 46 58" />
                    <path d="M28 32 L32 26 L36 32" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="category-label">PEOPLE</span>
              </a>

              {/* Nature Category */}
              <a href="#" className="category-item" id="catNature">
                <div className="category-circle">
                  <svg viewBox="0 0 64 64" className="category-svg" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 52 C20 52, 24 44, 28 32 C30 26, 32 18, 30 10" />
                    <path d="M30 10 C34 6, 42 8, 46 12 M30 10 C24 8, 20 12, 18 18 M30 10 C34 16, 30 24, 28 28" strokeWidth="1.5" />
                    <path d="M48 52 C52 52, 54 48, 56 42 C57 38, 58 34, 56 30" />
                    <path d="M56 30 C58 28, 62 29, 64 31 M56 30 C53 29, 50 31, 49 34" stroke-width="1.5" />
                    <path d="M4 52 L60 52" />
                    <path d="M38 52 C44 48, 48 48, 54 52" />
                  </svg>
                </div>
                <span className="category-label">NATURE</span>
              </a>

              {/* Lifestyle Category */}
              <a href="#" className="category-item" id="catLifestyle">
                <div className="category-circle">
                  <svg viewBox="0 0 64 64" className="category-svg" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 44 L14 56 M24 46 L24 56 M44 46 L44 56 M52 42 L52 56" strokeWidth="3" strokeLinecap="round" />
                    <path d="M8 44 C8 32, 16 26, 26 24 C36 22, 48 24, 50 34 C52 38, 48 44, 42 46 C34 48, 22 46, 14 44 Z" fill="none" />
                    <path d="M50 34 C54 36, 58 38, 58 42 C58 46, 56 48, 54 50" />
                    <circle cx="44" cy="30" r="1.5" fill="currentColor" />
                    <path d="M8 40 C6 38, 4 30, 6 26" />
                  </svg>
                </div>
                <span className="category-label">LIFESTYLE</span>
              </a>
            </div>
          </div>
        </section>

        {/* About ThaiLocalTale Section */}
        <section className="about-section" id="about">
          <div className="about-grid">
            
            {/* Left: Content Column */}
            <div className="about-content-col">
              <h2 className="about-title">ABOUT THAILOCALTALE</h2>
              <p className="about-desc">
                We are storytellers who want to share the real Thailand — through the eyes of locals. From hidden places to untold stories, we believe every journey begins with a tale.
              </p>
              <a href="#" className="btn btn-outline" id="readStoryBtn">
                READ OUR STORY <i className="fa fa-arrow-right"></i>
              </a>
            </div>
            
            {/* Right: Polaroid & Collage Column */}
            <div className="about-visual-col">
              {/* Background Image of Boat */}
              <div className="visual-bg-container">
                <img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800" alt="เรือหางยาวในประเทศไทย" className="visual-bg-img" />
              </div>
              
              {/* Pinned Polaroid Photo */}
              <div className="polaroid-card" id="aboutPolaroid">
                <div className="polaroid-clip"><i className="fa fa-paperclip"></i></div>
                <div className="polaroid-img-container">
                  <img src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600" alt="วัดอรุณและรถตุ๊กตุ๊ก" className="polaroid-img" />
                </div>
                <div className="polaroid-caption">
                  <span>THAILAND</span>
                  <div className="polaroid-stamp">
                    <span className="stamp-outer">
                      <span className="stamp-inner">LOCAL STORIES</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Latest Videos Section */}
        <section className="videos-section" id="videos">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">LATEST VIDEOS</h2>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="view-all-link yt-link" id="viewAllYoutube">
                <i className="fab fa-youtube"></i> VIEW ALL ON YOUTUBE <i className="fa fa-arrow-right"></i>
              </a>
            </div>
            
            {/* Videos Grid / Scroll */}
            <div className="videos-slider-container">
              <div className="videos-grid" id="videosGrid" ref={videosGridRef}>
                
                {/* Video Card 1 */}
                <div className="video-card" id="videoCard1">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="video-thumb-container">
                    <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800" alt="เทศกาลลอยกระทง 2024" className="video-thumb" />
                    <span className="video-duration">8:45</span>
                    <div className="video-play-overlay"><i className="fa fa-play"></i></div>
                  </a>
                  <div className="video-info">
                    <h3 className="video-card-title">
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Loy Krathong Festival 2024</a>
                    </h3>
                    <p className="video-card-desc">A night of lights and gratitude.</p>
                  </div>
                </div>

                {/* Video Card 2 */}
                <div className="video-card" id="videoCard2">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="video-thumb-container">
                    <img src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=800" alt="เที่ยววัดเมืองเก่าเชียงใหม่" className="video-thumb" />
                    <span className="video-duration">10:12</span>
                    <div className="video-play-overlay"><i className="fa fa-play"></i></div>
                  </a>
                  <div className="video-info">
                    <h3 className="video-card-title">
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Chiang Mai Old City Walk</a>
                    </h3>
                    <p className="video-card-desc">Hidden temples and local cafés.</p>
                  </div>
                </div>

                {/* Video Card 3 */}
                <div className="video-card" id="videoCard3">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="video-thumb-container">
                    <img src="https://images.unsplash.com/photo-1589392682746-1596084e4f29?q=80&w=800" alt="เกาะหลีเป๊ะ สวรรค์แดนใต้" className="video-thumb" />
                    <span className="video-duration">9:31</span>
                    <div className="video-play-overlay"><i className="fa fa-play"></i></div>
                  </a>
                  <div className="video-info">
                    <h3 className="video-card-title">
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Koh Lipe – The Hidden Paradise</a>
                    </h3>
                    <p className="video-card-desc">White sand, clear sea, and slow life.</p>
                  </div>
                </div>

                {/* Video Card 4 */}
                <div className="video-card" id="videoCard4">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="video-thumb-container">
                    <img src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=800" alt="ปางช้างธรรมชาติ" className="video-thumb" />
                    <span className="video-duration">11:08</span>
                    <div className="video-play-overlay"><i className="fa fa-play"></i></div>
                  </a>
                  <div className="video-info">
                    <h3 className="video-card-title">
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Living with Elephants</a>
                    </h3>
                    <p className="video-card-desc">A bond beyond words in Thailand.</p>
                  </div>
                </div>

              </div>
              
              <button 
                className="slider-nav-btn next-btn" 
                onClick={() => handleNextScroll(videosGridRef)} 
                aria-label="Next videos"
                id="videoSliderNext"
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/assets/logo.jpg" alt="Thai Local Tale Footer Logo" className="footer-logo-img" />
            </a>
            <div className="footer-brand-info">
              <h3>ThaiLocalTale</h3>
              <p>Your story, Our Thailand.</p>
            </div>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          {/* Quick Links Col */}
          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
              <li><a href="#featured">Stories</a></li>
              <li><a href="#categories">Places</a></li>
              <li><a href="#about">Culture</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
          
          {/* Categories Col */}
          <div className="footer-col">
            <h4>CATEGORIES</h4>
            <ul className="footer-links">
              <li><a href="#categories">Places</a></li>
              <li><a href="#about">Culture</a></li>
              <li><a href="#about">Food</a></li>
              <li><a href="#about">People</a></li>
              <li><a href="#categories">Nature</a></li>
              <li><a href="#categories">Lifestyle</a></li>
            </ul>
          </div>
          
          {/* Newsletter Col */}
          <div className="footer-col newsletter-col">
            <h4>NEWSLETTER</h4>
            <p>Get the latest stories and travel inspiration from Thailand.</p>
            <form className="newsletter-form" id="newsletterForm" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                id="newsletterEmail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={subscribeStatus === 'loading'}
              />
              <button 
                type="submit" 
                className="subscribe-btn" 
                id="newsletterSubmitBtn"
                disabled={subscribeStatus === 'loading'}
              >
                {subscribeStatus === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </form>
            <div 
              className="newsletter-msg" 
              id="newsletterMsg"
              style={{ display: subscribeStatus === 'success' ? 'block' : 'none', opacity: subscribeStatus === 'success' ? 1 : 0 }}
            >
              Thank you for subscribing!
            </div>
          </div>
          
        </div>
        
        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>&copy; 2024 ThaiLocalTale. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms of Use</a>
            <span className="separator">|</span>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );
}
