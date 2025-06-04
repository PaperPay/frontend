import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { GOOGLE_CLIENT_ID } from '../config';
import './PayoutLogin.scss';

export default function PayoutLogin() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        if (!userInfo.expiresAt || Date.now() < userInfo.expiresAt) {
          navigate('/app');
          return;
        }
      } catch (e) {}
    }
    setCheckingAuth(false);
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const expiresAt = Date.now() + (tokenResponse.expires_in * 1000);
        // Fetch user info using the access token
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const userInfo = await userInfoResponse.json();
        // Store both the access token and user info
        localStorage.setItem('userInfo', JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          googleAccessToken: tokenResponse.access_token,
          expiresAt,
        }));
        navigate('/app');
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
    scope: 'email profile',
    flow: 'implicit',
  });

  if (checkingAuth) return null;

  return (
    <div className="payout-bg">
      <div className="payout-center">
        <div className="payout-logo payout-logo-block">
          <img src="/src/assets/paperpay.png" alt="PaperPay Logo" className="payout-logo-img" />
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