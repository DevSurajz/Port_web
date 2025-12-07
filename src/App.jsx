import React, { useState, useEffect } from "react";

const styles = `
* { box-sizing: border-box; }
body { margin: 0; }

.app {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1b1f2a, #000);
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.app.light {
  background: radial-gradient(circle at top, #f5f7fb, #e5e7eb);
  color: #111;
}

.theme-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: 1px solid currentColor;
  color: inherit;
  padding: 8px 14px;
  border-radius: 20px;
  cursor: pointer;
}

.container {
  width: 100%;
  max-width: 520px;
}

.profile {
  text-align: center;
  margin-bottom: 28px;
}

.avatar-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}

.avatar-glow {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168,85,247,.6), transparent 70%);
  filter: blur(25px);
}

.avatar {
  width: 120px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.profile h1 {
  font-size: 1.8rem;
  margin: 12px 0 6px;
}

.profile p {
  opacity: .75;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 22px 0 34px;
}

.social {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(249, 240, 240, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.social:hover {
  transform: translateY(-6px) scale(1.08);
  background: rgba(255,255,255,.08);
}

.app.light .social {
  border-color: rgba(0,0,0,.25);
}

.links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-radius: 18px;
  text-decoration: none;
  color: inherit;
  background: linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.15);
  transition: .4s;
  -webkit-tap-highlight-color: transparent;
}

.link:hover {
  transform: translateY(-6px) rotateX(6deg);
  background: linear-gradient(145deg, rgba(99,102,241,.35), rgba(236,72,153,.35));
}

.app.light .link:hover {
  background: linear-gradient(145deg, rgba(59,130,246,.35), rgba(16,185,129,.35));
}

.link-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.link:active {
  transform: scale(0.97);
  opacity: 0.85;
}

.icon-box {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(0,0,0,.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.app.light .icon-box {
  background: rgba(230, 216, 216, 0.6);
}

.icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
}

.footer {
  margin-top: 40px;
  text-align: center;
  opacity: 0.6;
  font-size: 0.85rem;
}
`;

// Platform icons
const Globe = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15 15 0 0 1 0 20" />
  </svg>
);

const YouTube = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="4" />
    <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
  </svg>
);

const Instagram = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedIn = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="9" width="4" height="13" fill="currentColor" stroke="none" />
    <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
    <path d="M8 9h4v2a4 4 0 0 1 4-2c3 0 4 2 4 5v8h-4v-7c0-2-1-3-2-3s-2 1-2 3v7H8z" />
  </svg>
);

const Pinterest = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 21l2-7c-.5-1-.8-2.1-.8-3.2 0-3 2-5 4.6-5 3.6 0 5.4 2.3 5.4 4.8 0 2.9-1.5 5.4-3.7 5.4-.9 0-1.6-.7-1.4-1.6l.8-2.9c.2-.6.1-1.3-.5-1.3-.4 0-.7.4-.8.9l-1 3.6-.5 5.6z"/>
  </svg>
);

const Spotify = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.4 2 12s4.5 10 10 10 10-4.4 10-10S17.5 2 12 2zm4.6 14.5c-.2.3-.6.4-1 .2-2.7-1.6-6.2-2-10.3-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.5-.8 8.3-.4 11.3 1.4.4.2.5.7.3 1.1z"/>
  </svg>
);

const XIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.2 2h3.1l-7 8.2L22 22h-6.4l-5-6.7L4 22H1l7.5-8.8L2 2h6.5l4.6 6.1L18.2 2z"/>
  </svg>
);


const GitHub = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a10 10 0 0 0-3 19c.5.1.7-.2.7-.5v-2c-3 .7-3.6-1.3-3.6-1.3a3 3 0 0 0-1.3-1.7c-1-.7.1-.7.1-.7a2.4 2.4 0 0 1 1.7 1.2 2.5 2.5 0 0 0 3.4 1 2.5 2.5 0 0 1 .7-1.6c-2.4-.3-5-1.2-5-5.3a4 4 0 0 1 1-2.8 3.7 3.7 0 0 1 .1-2.8s.9-.3 2.9 1a10 10 0 0 1 5.3 0c2-1.3 2.9-1 2.9-1a3.7 3.7 0 0 1 .1 2.8 4 4 0 0 1 1 2.8c0 4.1-2.6 5-5 5.3a2.8 2.8 0 0 1 .8 2.2v3.2c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
  </svg>
);

const MediumIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="Medium"
  >
    <path d="M2 6.5c0-.3.1-.5.4-.7l4-3c.3-.2.7-.2 1 0l4.6 3.4 4.6-3.4c.3-.2.7-.2 1 0l4 3c.3.2.4.4.4.7v11c0 .3-.1.5-.4.7l-4 3c-.3.2-.7.2-1 0l-4.6-3.4-4.6 3.4c-.3.2-.7.2-1 0l-4-3c-.3-.2-.4-.4-.4-.7v-11zm6.5 1.2v8.6l3.5-2.6V5.1l-3.5 2.6zm9 0l-3.5-2.6v8.6l3.5 2.6V7.7z" />
  </svg>
);


export default function App() {
  const [light, setLight] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setShowBtn(window.scrollY < 80); // hide after 80px scroll
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <React.Fragment>
      <style>{styles}</style>
      <div className={`app ${light ? "light" : ""}`}>
        {showBtn && (
          <button className="theme-btn" onClick={() => setLight(!light)}>
            {light ? "🌙" : "☀️"}
          </button>
        )}

        <div className="container">
          <div className="profile">
            <div className="avatar-wrap">
              <div className="avatar-glow" />
              <img src="/suraj.jpeg" className="avatar" alt="Profile" />

            </div>
            <h1>Suraj indoriya</h1>
            <p>Hey mate! Explore the links and connect with me there.</p>
          </div>

          <div className="socials">

  <a
    className="social"
    href="https://github.com/DevSurajz"
    target="_blank"
    rel="noopener noreferrer"
  >
    <GitHub />
  </a>

  <a
    className="social"
    href="https://www.youtube.com/@TimeChronicles5"
    target="_blank"
    rel="noopener noreferrer"
  >
    <YouTube />
  </a>

  <a
    className="social"
    href="https://www.instagram.com/suraj_indoriya_/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Instagram />
  </a>

  <a
    className="social"
    href="https://www.linkedin.com/in/suraj-sharma-74b160304/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <LinkedIn />
  </a>

<a
    className="social"
    href="#"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Globe/>
  </a>


</div>

            


          <div className="links">
            {/* PRIMARY LINKS – replace # with your real URLs */}
            <a className="link" href="#">
              <div className="link-left">
                <div className="icon-box"><Globe /></div>
                Website
              </div>
            </a>

            <a className="link" href="https://www.youtube.com/@TimeChronicles5" target="_blank" 
            rel="noopener noreferrer"
                >
              <div className="link-left">
                <div className="icon-box"><YouTube /></div>
                YouTube
              </div>
            </a>

            <a className="link" href="https://www.instagram.com/suraj_indoriya_/" target="_blank" 
                      rel="noopener noreferrer"
                 >
              <div className="link-left">
                <div className="icon-box"><Instagram /></div>
                Instagram
              </div>
            </a>

            <a className="link" href="https://www.linkedin.com/in/suraj-sharma-74b160304/" target="_blank" 
                rel="noopener noreferrer"
               >
              <div className="link-left">
                <div className="icon-box"><LinkedIn /></div>
                LinkedIn
               </div>
            </a>

            <a className="link" href="https://github.com/DevSurajz" target="_blank" 
                rel="noopener noreferrer"
                    >
              <div className="link-left">
                <div className="icon-box"><GitHub /></div>
                GitHub
              </div>
            </a>

            {/* EXTRA BOXES */}
            <a className="link" href="https://in.pinterest.com/"target="_blank" 
               rel="noopener noreferrer"
                  >
              <div className="link-left">
                <div className="icon-box"><Pinterest/></div>
                Pinterest
              </div>
            </a>

            <a className="link" href="#">
              <div className="link-left">
                <div className="icon-box"><Globe /></div>
                Blog
              </div>
            </a>

            <a className="link" href="https://medium.com/@devveloxx" target="_blank" 
                 rel="noopener noreferrer"
                >
              <div className="link-left">
                <div className="icon-box"><MediumIcon/></div>
                Blog
              </div>
            </a>

            <a className="link" href="https://open.spotify.com/playlist/2uJMUAL125VqHIyne7etCC" target="_blank" 
                rel="noopener noreferrer"
                >
              <div className="link-left">
                <div className="icon-box"><Spotify /></div>
                Spotify
              </div>
            </a>

            <a className="link" href="https://x.com/Devyavz?t=ysNBzpwMblznZiYijYAQ5w&s=09" target="_blank" 
                rel="noopener noreferrer"
                  >
              <div className="link-left">
                <div className="icon-box"><XIcon/></div>
                X
              </div>
            </a>
          </div>

          <div className="footer">
            Connect with Suraj indoriya across all platforms.<br />
            © 2025 Lunar. All rights reserved.
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}


