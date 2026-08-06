import React from 'react';
import '../components/component_styles/ContactPage.css';
import discordSvg from '/assets/Discord-Symbol-White-min.png';
import githubSvg from '/assets/github-mark-white-min.png';
import instagramSvg from '/assets/instagram.svg';

const ContactPage = () => {
  return (
    <main className="contact-page">
      <div className="grid-bg"></div>
      
      <section className="contact-hero">
        <div className="contact-content">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            I'm always interested in hearing about new projects and opportunities.
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <h3>Email</h3>
              <a href="mailto:contact@example.com" className="contact-link">
                your-email@example.com
              </a>
            </div>

            <div className="contact-divider"></div>

            <div className="contact-method">
              <h3>Connect</h3>
              <div className="social-links">
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Discord"
                >
                  <img src={discordSvg} alt="Discord" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  <img src={githubSvg} alt="GitHub" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Instagram"
                >
                  <img src={instagramSvg} alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
