import React from 'react';

import './NotFound.scss';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-404">404</div>
      <div className="notfound-title">Page not found</div>
      <div className="notfound-desc">The page you're looking for does not seem to exist</div>
      <a href="/" className="notfound-btn">Take me home</a>
    </div>
  );
} 