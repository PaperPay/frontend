import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './Dashboard.scss';

// Add a type for user info
interface UserInfo {
  email: string;
  name: string;
  picture: string;
  googleAccessToken: string;
  expiresAt: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      navigate('/payout');
      return;
    }
    try {
      const userInfo: UserInfo = JSON.parse(storedUserInfo);
      if (userInfo.expiresAt && Date.now() > userInfo.expiresAt) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('googleAccessToken');
        navigate('/payout');
        return;
      }
      setUser(userInfo);
      setCheckingAuth(false);
    } catch (error) {
      navigate('/payout');
      return;
    }
  }, [navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('googleAccessToken');
    navigate('/payout');
  };

  if (checkingAuth) return null;

  return (
    <div className="dashboard-root">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo">PaperPay</div>
        <nav className="dashboard-nav">
          <a className="active" href="#">
            <span role="img" aria-label="dashboard">📊</span> Dashboard
          </a>
          <a href="#">
            <span role="img" aria-label="bank">🏦</span> Banking
          </a>
          <a href="#">
            <span role="img" aria-label="savings">💰</span> Savings Space
          </a>
          <a href="#">
            <span role="img" aria-label="card">💳</span> Crypto Cards
          </a>
          <a href="#">
            <span role="img" aria-label="recipients">👥</span> Recipients
          </a>
          <a href="#">
            <span role="img" aria-label="invite">🧑‍🤝‍🧑</span> Invite 
            <span className="dashboard-new">NEW</span>
          </a>
        </nav>
        <div className="dashboard-invite-box">
          <div className="dashboard-invite-avatars">👤👤👤</div>
          <div className="dashboard-invite-title">Invite and Earn</div>
          <div className="dashboard-invite-desc">
            Earn 10% of their fees plus $25 in points for every friend you invite.
          </div>
        </div>
        <div className="dashboard-help">
          <span role="img" aria-label="settings">⚙️</span> Help
        </div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <div className="dashboard-points-pill">
            <span className="dashboard-points-coin" style={{ fontSize: 20, marginRight: 8 }}>🪙</span>
            558
          </div>
          <div className="dashboard-user-info" ref={dropdownRef}>
            <div
              className="dashboard-user-pill"
              onClick={() => setDropdownOpen((open) => !open)}
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              {user?.email}
              <span className="dashboard-user-pill-icon" style={{ marginLeft: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e5e7eb"/><path d="M9 10l3 3 3-3" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
              </span>
            </div>
            {dropdownOpen && (
              <div className="dashboard-user-dropdown">
                <div className="dashboard-user-dropdown-header">
                  <div className="dashboard-user-dropdown-name">{user?.name}</div>
                  <div className="dashboard-user-dropdown-email">{user?.email}</div>
                </div>
                <hr />
                <div className="dashboard-user-dropdown-item">Profile</div>
                <div className="dashboard-user-dropdown-item" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
        <div className="dashboard-balance-section">
          <div className="dashboard-balance-card">
            <div className="dashboard-balance-label">Overall Balance: 0.01</div>
            <div className="dashboard-balance-amount">$0.01</div>
            <div className="dashboard-balance-desc">Balance on Starknet</div>
          </div>
          <div className="dashboard-actions">
            <button className="dashboard-action-btn">Deposit</button>
            <button className="dashboard-action-btn">To bank</button>
            <button className="dashboard-action-btn">Send</button>
            <button className="dashboard-action-btn">Get Paid</button>
          </div>
        </div>
        <div className="dashboard-transactions-section">
          <div className="dashboard-transactions-header">
            <div className="dashboard-transactions-title">Your transactions</div>
            <div className="dashboard-transactions-filters">
              <button className="active">All</button>
              <button>Deposits</button>
              <button>Offramps</button>
              <button>Send</button>
              <button>⚙️</button>
            </div>
          </div>
          <div className="dashboard-transactions-list">
            <div className="dashboard-transaction-row">
              <div className="dashboard-transaction-type offramp">Offramp</div>
              <div>Withdrawing of <b>421,279.08 INR</b> to ****5290</div>
              <div className="dashboard-transaction-amount">- 5,001 USDC</div>
            </div>
            <div className="dashboard-transaction-row">
              <div className="dashboard-transaction-type offramp">Offramp</div>
              <div>Withdrawn of <b>423,082.261 INR</b> to ****5290</div>
              <div className="dashboard-transaction-amount">- 5,082.32 USDC</div>
            </div>
            <div className="dashboard-transaction-row">
              <div className="dashboard-transaction-type offramp">Offramp</div>
              <div>Withdrawn of <b>420,533.878 INR</b> to ****5290</div>
              <div className="dashboard-transaction-amount">- 5,000.09 USDC</div>
            </div>
            <div className="dashboard-transaction-row">
              <div className="dashboard-transaction-type offramp">Offramp</div>
              <div>Withdrawn of <b>420,000.897 INR</b> to ****5290</div>
              <div className="dashboard-transaction-amount">- 5,003.01 USDC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 