import React from 'react';
import './PayoutLogin.scss';

export default function PayoutLogin() {
  return (
    <div className="payout-bg">
      <div className="payout-center">
        <div className="payout-logo">
          <span className="payout-logo-icon">&#9679;</span>
          <span className="payout-logo-text">PaperPay</span>
        </div>
        <div className="payout-card">
          <div className="payout-title">Global payouts for web3 users</div>
          <div className="payout-subtitle">
            Send funds to your vendors, contractors and employees in real time to 50+ countries
          </div>
          <button className="payout-btn-google">
            <span className="payout-google-icon">G</span> Login or Signup with Google
          </button>
        </div>
        <div className="payout-footer">
          © Copperx 2025 · <a href="#">Contact</a> · <a href="#">Privacy Policy</a> · <a href="#">Terms of Conditions</a>
        </div>
      </div>
    </div>
  );
} 