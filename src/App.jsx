import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Header (sticky, full width) */}
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner header-flex">
          <div className="header-section logo">PaperPay</div>
          <nav className="header-section nav-links">
            <a href="#products">Products</a>
            <a href="#solutions">Solutions</a>
            <a href="#developers">Developers</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#airdrop">Airdrop</a>
          </nav>
          <div className="header-section header-buttons">
            <button className="btn btn-outline">Get Started</button>
            <button className="btn btn-primary">Contact Sales</button>
          </div>
        </div>
      </header>

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
            <div className="feature-img placeholder-img">[Image]</div>
          </div>
          <div className="feature-card">
            <h2>Global Payout</h2>
            <p>PaperPay Payout helps web3 businesses pay employees, vendors, or contractors with just an email.</p>
            <div className="feature-img placeholder-img">[Image]</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-logo">PaperPay</div>
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
              <span>Made with love <span role="img" aria-label="UAE flag">🇦🇪</span></span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
