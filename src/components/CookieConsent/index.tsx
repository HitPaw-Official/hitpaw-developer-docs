import React, { useState, useEffect } from 'react';
import './styles.css';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function CookieConsent(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Only access localStorage on client side
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        // Show banner if choice is not made yet
        setIsOpen(true);
      }
    } catch (e) {
      // In case localStorage is blocked by browser settings
      console.warn('LocalStorage is not accessible. Defaulting cookie consent banner to closed.', e);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie-consent', 'accepted');
    } catch (e) {}

    // Update Google Analytics Consent Mode
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }

    triggerClose();
  };

  const handleReject = () => {
    try {
      localStorage.setItem('cookie-consent', 'rejected');
    } catch (e) {}

    // Keep Google Analytics Consent Mode as denied
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    }

    triggerClose();
  };

  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400); // matches CSS slideOut transition duration
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`cookie-consent-banner ${isClosing ? 'cookie-consent-closing' : ''}`}>
      <button 
        className="cookie-consent-close-btn" 
        onClick={handleReject} 
        aria-label="Close cookie consent banner"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <p className="cookie-consent-text">
        This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the{' '}
        <a 
          href="https://www.hitpaw.com/privacy-policy.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cookie-consent-link"
        >
          privacy policy
        </a>.
      </p>
      
      <div className="cookie-consent-actions">
        <button className="cookie-consent-btn cookie-consent-accept" onClick={handleAccept}>
          Accept
        </button>
        <button className="cookie-consent-btn cookie-consent-reject" onClick={handleReject}>
          Reject
        </button>
      </div>
    </div>
  );
}
