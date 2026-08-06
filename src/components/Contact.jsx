import React from 'react';
import './component_styles/Contact.css';
import discordSvg from '/assets/Discord-Symbol-White-min.png';
import githubSvg from '/assets/github-mark-white-min.png';
import instagramSvg from '/assets/instagram.svg';

const Contact = () => {
  return (
    <div className="contact-container">
      <a 
        href="https://discord.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="contact-link discord"
        aria-label="Discord"
      >
        <img src={discordSvg} alt="Discord" />
      </a>
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="contact-link github"
        aria-label="GitHub"
      >
        <img src={githubSvg} alt="GitHub" />
      </a>
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="contact-link instagram"
        aria-label="Instagram"
      >
        <img src={instagramSvg} alt="Instagram" />
      </a>
    </div>
  );
};

export default Contact;
