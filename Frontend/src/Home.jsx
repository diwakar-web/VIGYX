import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaEnvelope, FaEllipsisV, FaUserCircle, FaSearchPlus, FaArrowsAlt } from 'react-icons/fa';

const Home = () => {
  const [screensVisible, setScreensVisible] = useState(4);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-GB'));
  
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
  
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
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
      const idx1 = newCards.indexOf(movingCardId);
      const idx2 = newCards.indexOf(id);
      newCards[idx1] = cards[idx2];
      newCards[idx2] = cards[idx1];
      setCards(newCards);
      setIsMoving(false);
      setMovingCardId(null);
    }
  };

  const closeZoom = () => {
    if (zoomedCard) {
      setZoomedCard(null);
    }
  };

  return (
    <div className="vigyx-container" onClick={closeZoom}>
      {zoomedCard && <div className="blur-overlay"></div>}
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo-container">
          <h1 className="logo">VIGYX</h1>
          <span className="subtitle">Next Gen Intruder Detection System</span>
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
        <aside className="sidebar">
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
        </aside>

        {/* CCTV Grid */}
        <section className={`cctv-grid grid-${screensVisible}`}>
          {cards.slice(0, screensVisible).map(id => (
            <div 
              key={id} 
              className={`cctv-card 
                ${zoomedCard === id ? 'zoomed' : ''} 
                ${isMoving ? 'shaking' : ''} 
                ${movingCardId === id ? 'selected-move' : ''}`
              }
              onClick={(e) => { e.stopPropagation(); handleCardClick(id); }}
            >
              <div className="cctv-header">
                <span className="camera-name">CAM {id} <span className="rec-dot"></span></span>
                <div className="menu-container">
                  <button className="menu-btn" onClick={(e) => toggleMenu(e, id)}>
                    <FaEllipsisV />
                  </button>
                  {activeMenu === id && (
                    <div className="card-menu">
                      <button onClick={(e) => handleZoom(e, id)}><FaSearchPlus /> Zoom In</button>
                      <button onClick={(e) => handleMove(e, id)}><FaArrowsAlt /> Move</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="cctv-content">
                {/* Fake CCTV feed look */}
                <div className="scan-line"></div>
                <div className="feed-info">
                  <span className="timestamp">REC {currentTime}</span>
                  <div className="highlight-boxes">
                    {/* Placeholder for highlighted targets */}
                    {Object.entries(highlightTargets).map(([target, isActive]) => 
                      isActive ? <span key={target} className="target-box">{target.toUpperCase()}</span> : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

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
