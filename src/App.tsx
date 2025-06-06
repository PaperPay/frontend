import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import PayoutLogin from './pages/PayoutLogin';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './App.scss';
import paperpayLogo from './assets/paperpay.png';
import paperpayWhiteLogo from './assets/paperpay-white.png';
import paymentGatewayImg from './assets/payment-gateway.png';
import globalPayoutImg from './assets/global-payout.png';

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
};

function ProductModal({ open, onClose }: ProductModalProps) {
  const navigate = useNavigate();
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h3 className="modal-title">Choose a product to continue</h3>
        <div className="modal-options">
          <div className="modal-option">
            <span className="modal-icon" role="img" aria-label="Accept Payments">🧾</span>
            <div>
              <div className="modal-option-title">Accept Payments</div>
              <div className="modal-option-desc">Accept crypto payments via links, invoices, or API.</div>
            </div>
          </div>
          <div className="modal-divider" />
          <div className="modal-option" onClick={() => { onClose(); navigate('/payout'); }}>
            <span className="modal-icon" role="img" aria-label="Send Payout">🏦</span>
            <div>
              <div className="modal-option-title">Send Payout / Offramp Crypto</div>
              <div className="modal-option-desc">Transfer funds to vendors, contractors, and employees.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-border-wrap">
      {/* Header (sticky, full width) */}
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner header-flex">
          <div className="header-section logo">
            <div className="logo-img">
              <img
                src={paperpayLogo}
                alt="PaperPay Logo"
                className="header-logo header-logo-dark"
              />
              <img
                src={paperpayWhiteLogo}
                alt="PaperPay Logo"
                className="header-logo header-logo-light"
              />
            </div>
            <div className="logo-text">
              PaperPay
            </div>
          </div>
          <nav className="header-section nav-links">
            <a href="#products">Products</a>
            <a href="#solutions">Solutions</a>
            <a href="#developers">Developers</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#airdrop">Airdrop</a>
          </nav>
          <div className="header-section header-buttons">
            <button className="btn btn-outline" onClick={() => setModalOpen(true)}>Get Started</button>
            <button className="btn btn-primary">Contact Sales</button>
          </div>
        </div>
      </header>

      {/* Hero Gradient Background */}
      <div className="hero-bg" aria-hidden="true"></div>

      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <h1>Next generation financial tools</h1>
          <p className="subheadline">Payment Tools and APIs for Digital Money</p>
          <button className="btn btn-primary hero-btn">Contact Sales</button>
        </section>

        {/* Feature Cards */}
        <section className="features">
          <div className="feature-card">
            <h2>Payment Gateway</h2>
            <p>PaperPay Gateway helps businesses accept payments in crypto and fiat via integration and API.</p>
            <div className="feature-img">
              <img src={paymentGatewayImg} alt="Payment Gateway" />
            </div>
          </div>
          <div className="feature-card">
            <h2>Global Payout</h2>
            <p>PaperPay Payout helps web3 businesses pay employees, vendors, or contractors with just an email.</p>
            <div className="feature-img">
              <img src={globalPayoutImg} alt="Global Payout" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-logo-block">
                <img src={paperpayLogo} alt="PaperPay Logo" className="footer-logo-img" />
                <div className="footer-logo-text">
                  Simplifying payments for<br />
                  web3 businesses.
                </div>
              </div>
              <div className="footer-columns">
                <div>
                  <h4>Features</h4>
                  <ul>
                    <li>Payment Links</li>
                    <li>Recurring Billing</li>
                    <li>Integrations</li>
                  </ul>
                </div>
                <div>
                  <h4>Use-cases</h4>
                  <ul>
                    <li>E-Commerce</li>
                    <li>Donation</li>
                    <li>Ticketing</li>
                    <li>Send money to India</li>
                  </ul>
                </div>
                <div>
                  <h4>Developers</h4>
                  <ul>
                    <li>Documentation</li>
                    <li>API Reference</li>
                  </ul>
                </div>
                <div>
                  <h4>Resources</h4>
                  <ul>
                    <li>Tutorials</li>
                    <li>Blogs</li>
                    <li>Telegram community</li>
                  </ul>
                </div>
                <div>
                  <h4>About</h4>
                  <ul>
                    <li>Brand kit</li>
                    <li>Pricing</li>
                    <li>Changelog</li>
                    <li>Contact us</li>
                    <li>Terms and condition</li>
                    <li>Privacy policy</li>
                    <li>Submit feedback</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-community-row">
              <div className="footer-community-box">Join the community →</div>
              <div className="footer-team-box">Join the team →</div>
            </div>

            <div className="footer-social-row">
              <div className="footer-social-links">
                X (Twitter) Facebook Instagram Linkedin Lenster Youtube Reddit Telegram
              </div>
            </div>

            <div className="footer-bottom">
              <span>© 2025 PaperPay Technology Inc.</span>
              <span>Made with love in <span role="img" aria-label="IND flag">🇮🇳</span></span>
            </div>
          </div>
        </footer>
      </div>

      {/* Product Modal */}
      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/payout" element={<PayoutLogin />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
