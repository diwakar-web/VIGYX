import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaEnvelope, FaEllipsisV, FaUserCircle, FaSearchPlus, FaArrowsAlt, FaBars, FaTimes } from 'react-icons/fa';

const Home = () => {
  const [screensVisible, setScreensVisible] = useState(4);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const zoomRef = useRef(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const [highlightTargets, setHighlightTargets] = useState({
    man: false,
    woman: false,
    girl: false,
    boy: false,
  });
  const [highlightObjects, setHighlightObjects] = useState({
    car: false,
    'motor cycle': false,
    bus: false,
    truck: false,
  });
  
  const [cards, setCards] = useState([
    { id: 1, videoId: 'M3EYAY2MftI' },
    { id: 2, videoId: 'rnXIjl_Rzy4' },
    { id: 3, videoId: 'u8CbGedbI08' },
    { id: 4, videoId: '1rWzQP_ZYxc' },
    { id: 5, videoId: '8JCk5M_xrBs' },
    { id: 6, videoId: 'rnNPl27Arpk' },
    { id: 7, videoId: 'gFRtAAmiFbE&list=PLxtg5zfgORZr8KB1VglBvI6czMJpPL-rx' },
    { id: 8, videoId: '3nyPER2kzqk' }, 
  ]);
  const [zoomedCard, setZoomedCard] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [movingCardId, setMovingCardId] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleScreenChange = (val) => {
    setScreensVisible(val);
  };

  const handleHighlightChange = (target) => {
    setHighlightTargets(prev => ({ ...prev, [target]: !prev[target] }));
  };

  const handleObjectChange = (obj) => {
    setHighlightObjects(prev => ({ ...prev, [obj]: !prev[obj] }));
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleZoom = (e, id) => {
    e.stopPropagation();
    setZoomedCard(id);
    setActiveMenu(null);
    setIsMoving(false);
  };

  const handleMove = (e, id) => {
    e.stopPropagation();
    setIsMoving(true);
    setMovingCardId(id);
    setActiveMenu(null);
  };

  const handleCardClick = (id) => {
    if (zoomedCard) {
      setZoomedCard(null);
      return;
    }
    
    if (isMoving && movingCardId !== null) {
      // Swap movingCardId and id
      const newCards = [...cards];
      const idx1 = newCards.findIndex(c => c.id === movingCardId);
      const idx2 = newCards.findIndex(c => c.id === id);
      const temp = newCards[idx1];
      newCards[idx1] = newCards[idx2];
      newCards[idx2] = temp;
      setCards(newCards);
      setIsMoving(false);
      setMovingCardId(null);
    } else if (!isMoving) {
      setZoomedCard(id);
    }
  };

  const closeZoom = () => {
    if (zoomedCard) {
      setZoomedCard(null);
    }
  };

  return (
    <div className="vigyx-container" onClick={closeZoom}>
      {(zoomedCard || showDisclaimer) && <div className="blur-overlay"></div>}

      {showDisclaimer && (
        <div className="disclaimer-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <h2 className="cyber-heading">SECURITY ACCESS PROTOCOL</h2>
            <p>
              VIGYX is a conceptual group project developed for educational and research purposes. 
              We deeply respect individual privacy and ethical data practices.
            </p>
            <p className="sub-text">
              All video feeds used here are publicly available streams integrated solely to 
              demonstrate the capabilities of our intruder detection interface. This system 
              is not intended for unauthorized surveillance or malicious use.
            </p>
            <button className="accept-btn" onClick={() => setShowDisclaimer(false)}>
              I UNDERSTAND & PROCEED
            </button>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-left">
          <button className="hamburger-btn" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(!isSidebarOpen); }}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="logo-container">
            <h1 className="logo">VIGYX</h1>
            <span className="subtitle">Next Gen Intruder Detection System</span>
          </div>
        </div>
        <div className="user-account">
          <div className="user-icon">
            <FaUserCircle size={28} />
            <span className="user-name">Admin</span>
          </div>
          <div className="dropdown-menu">
            <ul>
              <li>User Profile</li>
              <li>Switch Account</li>
              <li>Add CCTV</li>
              <li>Logout</li>
              <li className="danger">Remove Account</li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="filter-section">
            <h3 className="cyber-heading">How many screens should be visible on main screen at once?</h3>
            <div className="checkbox-group">
              {[2, 4, 6, 8].map(num => (
                <label key={num} className="cyber-radio">
                  <input 
                    type="radio" 
                    name="screens" 
                    checked={screensVisible === num} 
                    onChange={() => handleScreenChange(num)}
                  />
                  <span className="checkmark"></span>
                  {num} Screens
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="cyber-heading">Whom to highlight?</h3>
            <div className="checkbox-group">
              {['man', 'woman', 'girl', 'boy'].map(target => (
                <label key={target} className="cyber-checkbox">
                  <input 
                    type="checkbox" 
                    checked={highlightTargets[target]} 
                    onChange={() => handleHighlightChange(target)}
                  />
                  <span className="check-box"></span>
                  {target.charAt(0).toUpperCase() + target.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="cyber-heading">Which object to highlight?</h3>
            <div className="checkbox-group">
              {['car', 'motor cycle', 'bus', 'truck'].map(obj => (
                <label key={obj} className="cyber-checkbox">
                  <input 
                    type="checkbox" 
                    checked={highlightObjects[obj]} 
                    onChange={() => handleObjectChange(obj)}
                  />
                  <span className="check-box"></span>
                  {obj.charAt(0).toUpperCase() + obj.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* CCTV Grid */}
        <section className={`cctv-grid grid-${screensVisible}`}>
          {cards.slice(0, screensVisible).map((card) => (
            <div 
              key={card.id} 
              className={`cctv-card 
                ${zoomedCard === card.id ? 'zoomed' : ''} 
                ${isMoving ? 'shaking' : ''} 
                ${movingCardId === card.id ? 'selected-move' : ''}`
              }
              onClick={(e) => { e.stopPropagation(); handleCardClick(card.id); }}
            >
              <div className="cctv-header">
                <span className="camera-name">CAM {card.id} <span className="rec-dot"></span></span>
                <div className="menu-container">
                  <button className="menu-btn" onClick={(e) => toggleMenu(e, card.id)}>
                    <FaEllipsisV />
                  </button>
                  {activeMenu === card.id && (
                    <div className="card-menu">
                      <button onClick={(e) => handleZoom(e, card.id)}><FaSearchPlus /> Zoom In</button>
                      <button onClick={(e) => handleMove(e, card.id)}><FaArrowsAlt /> Move</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="cctv-content">
                <iframe
                  className="cctv-iframe"
                  src={`https://www.youtube-nocookie.com/embed/${card.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${card.videoId}&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
                  title={`CCTV Feed ${card.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="click-overlay"></div>
                <div className="feed-info">
                  <span className="timestamp">REC {currentTime}</span>
                  <div className="highlight-boxes">
                    {/* Placeholder for highlighted targets */}
                    {Object.entries(highlightTargets).map(([target, isActive]) => 
                      isActive ? <span key={target} className="target-box">{target.toUpperCase()}</span> : null
                    )}
                    {Object.entries(highlightObjects).map(([obj, isActive]) => 
                      isActive ? <span key={obj} className="target-box">{obj.toUpperCase()}</span> : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <div className="footer-disclaimer">
        This project is a collaborative group effort. We respect everyone's privacy and adhere to ethical security research guidelines.
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="#" className="social-icon"><FaGithub /></a>
          <a href="#" className="social-icon"><FaLinkedin /></a>
          <a href="#" className="social-icon"><FaWhatsapp /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaEnvelope /></a>
        </div>
        <p className="copyright">© 2026 VIGYX Security Systems. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
