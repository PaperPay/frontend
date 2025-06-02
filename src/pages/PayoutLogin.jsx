import React from 'react';
import './PayoutLogin.scss';
import { useGoogleLogin } from '@react-oauth/google';

export default function PayoutLogin() {
  const login = useGoogleLogin({
    onSuccess: credentialResponse => {
      // handle login, e.g. send credentialResponse to your backend
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
    flow: 'implicit',
  });

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
          <button
            className="payout-btn-google custom-google-btn"
            onClick={() => login()}
            type="button"
          >
            <svg className="google-icon-svg" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.82 2.39 30.28 0 24 0 14.82 0 6.73 5.08 2.69 12.44l8.01 6.22C12.4 13.13 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.02l7.19 5.6C43.93 37.13 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.7 28.66c-1.01-2.97-1.01-6.18 0-9.15l-8.01-6.22C.9 17.1 0 20.44 0 24c0 3.56.9 6.9 2.69 10.11l8.01-6.22z"/><path fill="#EA4335" d="M24 48c6.28 0 11.56-2.08 15.41-5.67l-7.19-5.6c-2.01 1.35-4.59 2.16-8.22 2.16-6.26 0-11.6-3.63-13.3-8.87l-8.01 6.22C6.73 42.92 14.82 48 24 48z"/></g></svg>
            <span className="payout-google-btn-text">Login or Signup with Google</span>
          </button>
        </div>
        <div className="payout-footer">
          © PaperPay 2025 · <a href="#">Contact</a> · <a href="#">Privacy Policy</a> · <a href="#">Terms of Conditions</a>
        </div>
      </div>
    </div>
  );
} 