import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { GOOGLE_CLIENT_ID } from '../config';
import './PayoutLogin.scss';
import paperpayLogo from '../assets/paperpay.png';

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
          <img src={paperpayLogo} alt="PaperPay Logo" className="payout-logo-img" />
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
            <svg className="google-icon-svg" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 262" preserveAspectRatio="xMidYMid">
              <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
              <path fill="#29b546" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
              <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
              <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
            </svg>
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