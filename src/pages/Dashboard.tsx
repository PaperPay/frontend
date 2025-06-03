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
      <div className="dashboard-topbar-fixed">
        <div className="dashboard-logo">
          <span className="dashboard-logo-icon">&#9679;</span>
          <span className="dashboard-logo-text">PaperPay</span>
        </div>
        <div className="dashboard-topbar-right">
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
              <span className="dashboard-user-pill-icon" style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8L10 12L14 8" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
      </div>
      <div className="dashboard-content-layout">
        <div className="dashboard-sidebar">
          <nav className="dashboard-nav">
            <a className="active" href="#">
              <span className="dashboard-nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H18V4H6C4.89543 4 4 4.89543 4 6V16H2V6Z" fill="#4C63ED"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8H5C4.44772 8 4 8.44772 4 9V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V9C20 8.44771 19.5523 8 19 8ZM5 6C3.34315 6 2 7.34315 2 9V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V9C22 7.34315 20.6569 6 19 6H5Z" fill="#4C63ED"></path><path d="M18 13.5C18 14.3284 17.3284 15 16.5 15C15.6716 15 15 14.3284 15 13.5C15 12.6716 15.6716 12 16.5 12C17.3284 12 18 12.6716 18 13.5Z" fill="#4C63ED"></path></svg>
              </span>
              <span>Dashboard</span>
            </a>
            <a href="#">
              <span className="dashboard-nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 17L5 9L7 9L7 17L5 17Z" fill="#5A6376"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17 17L17 9L19 9L19 17L17 17Z" fill="#5A6376"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 17L9 11L11 11L11 17L9 17Z" fill="#5A6376"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13 17L13 11L15 11L15 17L13 17Z" fill="#5A6376"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21 21H3V19H21V21Z" fill="#5A6376"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.73315L21.614 10.2107C22.0499 10.5497 22.1285 11.178 21.7894 11.614C21.4503 12.0499 20.8221 12.1284 20.3861 11.7894L12 5.26688L3.61399 11.7894C3.17804 12.1284 2.54976 12.0499 2.21069 11.614C1.87162 11.178 1.95016 10.5497 2.38611 10.2107L12 2.73315Z" fill="#5A6376"></path></svg>
              </span>
              <span>Banking</span>
            </a>
            <a href="#">
              <span className="dashboard-nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.4407 19.2399L11.3838 19.978C11.7458 20.2613 12.2544 20.2613 12.6164 19.978L13.5595 19.2399C14.2769 18.6784 15.1341 18.3236 16.0385 18.2138L17.2007 18.0728C17.6575 18.0173 18.0174 17.6573 18.0729 17.2006L18.214 16.0384C18.3237 15.134 18.6785 14.2768 19.24 13.5594L19.9781 12.6163C20.2614 12.2542 20.2614 11.7457 19.9781 11.3836L19.24 10.4405C18.6785 9.72311 18.3237 8.8659 18.214 7.96152L18.0729 6.79934C18.0174 6.34256 17.6575 5.98258 17.2007 5.92713L16.0385 5.78606C15.1341 5.67628 14.2769 5.32149 13.5595 4.76002L12.6164 4.02194C12.2544 3.73862 11.7458 3.73862 11.3838 4.02194L10.4407 4.76002C9.72323 5.32149 8.86603 5.67628 7.96164 5.78606L6.79946 5.92713C6.34269 5.98258 5.9827 6.34256 5.92725 6.79934L5.78618 7.96152C5.6764 8.8659 5.32161 9.72311 4.76014 10.4405L4.02207 11.3836C3.73874 11.7457 3.73874 12.2542 4.02206 12.6163L4.76014 13.5594C5.32161 14.2768 5.6764 15.134 5.78618 16.0384L5.92725 17.2006C5.9827 17.6573 6.34269 18.0173 6.79946 18.0728L7.96164 18.2138C8.86603 18.3236 9.72323 18.6784 10.4407 19.2399ZM10.1511 21.553C11.2372 22.4029 12.7629 22.4029 13.849 21.553L14.7921 20.8149C15.2226 20.478 15.7369 20.2651 16.2795 20.1993L17.4417 20.0582C18.812 19.8919 19.892 18.8119 20.0583 17.4416L20.1994 16.2794C20.2653 15.7368 20.4781 15.2224 20.815 14.792L21.5531 13.8489C22.4031 12.7628 22.4031 11.2371 21.5531 10.151L20.815 9.20793C20.4781 8.77747 20.2653 8.26314 20.1994 7.72051L20.0583 6.55834C19.892 5.188 18.812 4.10805 17.4417 3.94171L16.2795 3.80063C15.7369 3.73476 15.2226 3.52189 14.7921 3.18501L13.849 2.44693C12.7629 1.59695 11.2372 1.59695 10.1511 2.44693L9.20805 3.18501C8.77759 3.52189 8.26327 3.73476 7.72064 3.80063L6.55846 3.94171C5.18813 4.10805 4.10817 5.188 3.94183 6.55833L3.80075 7.72051C3.73489 8.26314 3.52201 8.77747 3.18513 9.20793L2.44706 10.151C1.59708 11.2371 1.59707 12.7628 2.44706 13.8489L3.18513 14.792C3.52201 15.2224 3.73489 15.7368 3.80075 16.2794L3.94183 17.4416C4.10817 18.8119 5.18812 19.8919 6.55846 20.0582L7.72063 20.1993C8.26327 20.2651 8.77759 20.478 9.20805 20.8149L10.1511 21.553Z" fill="#5A6376"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5ZM16 14.5C16 15.3284 15.3285 16 14.5 16C13.6716 16 13 15.3284 13 14.5C13 13.6716 13.6716 13 14.5 13C15.3285 13 16 13.6716 16 14.5ZM15.325 8.67403C14.9345 8.2835 14.3013 8.2835 13.9108 8.67403L8.67495 13.9099C8.28443 14.3004 8.28443 14.9336 8.67495 15.3241C9.06548 15.7146 9.69864 15.7146 10.0892 15.3241L15.325 10.0882C15.7156 9.69772 15.7156 9.06455 15.325 8.67403Z" fill="#5A6376"></path></svg>
              </span>
              <span>Savings Space</span>
            </a>
            <a href="#">
              <span className="dashboard-nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 6H19C19.5523 6 20 6.44771 20 7V9H6V11H20V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V7C4 6.44772 4.44772 6 5 6ZM22 11V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V9V11Z" fill="#13171F"></path></svg>
              </span>
              <span>Crypto Cards</span>
            </a>
            <a href="#">
              <span className="dashboard-nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5C3 3.34315 4.34315 2 6 2H18C19.6569 2 21 3.34315 21 5V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V18H5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V5C19 4.44772 18.5523 4 18 4H6C5.44772 4 5 4.44772 5 5V6H3V5ZM5 8V11H3V8H5ZM5 13V16H3V13H5Z" fill="#13171F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 16L9 18L7 18L7 16C7 14.3431 8.34315 13 10 13L14 13C15.6569 13 17 14.3431 17 16L17 18L15 18L15 16C15 15.4477 14.5523 15 14 15L10 15C9.44772 15 9 15.4477 9 16Z" fill="#13171F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8ZM9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9Z" fill="#13171F"></path></svg>
              </span>
              <span>Recipients</span>
            </a>
            <a href="#">
              <span className="dashboard-nav-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10ZM8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM4 13C2.89543 13 2 13.8954 2 15V20H4V15H12V20H14V15C14 13.8954 13.1046 13 12 13H4ZM15 16H20V20H22V16C22 14.8954 21.1046 14 20 14H15V16ZM18 8.5C18 9.32843 17.3284 10 16.5 10C15.6716 10 15 9.32843 15 8.5C15 7.67157 15.6716 7 16.5 7C17.3284 7 18 7.67157 18 8.5ZM20 8.5C20 10.433 18.433 12 16.5 12C14.567 12 13 10.433 13 8.5C13 6.567 14.567 5 16.5 5C18.433 5 20 6.567 20 8.5Z" fill="#13171F"></path></svg>
              </span>
              <span>Invite</span>
              <span className="dashboard-new">NEW</span>
            </a>
          </nav>
          <div className="dashboard-invite-box">
            <div className="dashboard-invite-avatars">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar1" className="dashboard-avatar" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar2" className="dashboard-avatar" />
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="avatar3" className="dashboard-avatar" />
            </div>
            <div className="dashboard-invite-title">Invite and Earn</div>
            <div className="dashboard-invite-desc">
              Earn 10% of their fees plus $25 in points for every friend you invite.
            </div>
          </div>
          <div className="dashboard-help">
            <span className="dashboard-nav-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <path d="M4.93 4.93l4.24 4.24" />
                <path d="M14.83 9.17l4.24-4.24" />
                <path d="M14.83 14.83l4.24 4.24" />
                <path d="M9.17 14.83l-4.24 4.24" />
              </svg>
            </span>
            <span>Help</span>
          </div>
        </div>
        <div className="dashboard-main">
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
    </div>
  );
} 