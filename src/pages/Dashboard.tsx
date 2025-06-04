import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './Dashboard.scss';
import polygonIcon from '../assets/polygon.svg';
import arbitrumIcon from '../assets/arbitrum.svg';
import baseIcon from '../assets/base.svg';
import starknetIcon from '../assets/starknet.svg';
import solanaIcon from '../assets/solana.svg';

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
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('Polygon');
  const accountDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close account dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    }
    if (accountDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [accountDropdownOpen]);

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
          <div className="dashboard-balance-card-hero">
            <div className="dashboard-balance-card-hero-header" style={{ position: 'relative' }}>
              <span className="dashboard-balance-label">Overall Balance: 0.01</span>
              <span
                className="dashboard-balance-card-hero-avatar"
                onClick={e => {
                  e.stopPropagation();
                  setAccountDropdownOpen(v => !v);
                }}
                style={{cursor: 'pointer'}}
              >
                <img
                  src={
                    selectedAccount === 'Polygon' ? polygonIcon :
                    selectedAccount === 'Arbitrum' ? arbitrumIcon :
                    selectedAccount === 'Base' ? baseIcon :
                    selectedAccount === 'Starknet' ? starknetIcon :
                    selectedAccount === 'Solana' ? solanaIcon :
                    ''
                  }
                  alt={selectedAccount}
                  className="dashboard-balance-avatar-img"
                />
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 4, marginTop: 2}}><path d="M6 7.5L9 10.5L12 7.5" stroke="#7C8499" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              {accountDropdownOpen && (
                <div
                  className="dashboard-account-dropdown"
                  ref={accountDropdownRef}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    zIndex: 1000,
                  }}
                >
                  <div className="dashboard-account-dropdown-header">
                    <span>Accounts</span>
                    <span className="dashboard-account-dropdown-balance-label">Balance in USDC</span>
                  </div>
                  <div className="dashboard-account-dropdown-list">
                    {/* Polygon */}
                    <div className={`dashboard-account-dropdown-row${selectedAccount === 'Polygon' ? ' selected' : ''}`} onClick={() => { setSelectedAccount('Polygon'); setAccountDropdownOpen(false); }}>
                      <span className="dashboard-account-dropdown-icon"><img src={polygonIcon} alt="Polygon" className="dashboard-account-dropdown-icon" /></span>
                      <span className="dashboard-account-dropdown-name">Polygon</span>
                      <span className="dashboard-account-dropdown-balance">0.003071</span>
                    </div>
                    {/* Arbitrum */}
                    <div className={`dashboard-account-dropdown-row${selectedAccount === 'Arbitrum' ? ' selected' : ''}`} onClick={() => { setSelectedAccount('Arbitrum'); setAccountDropdownOpen(false); }}>
                      <span className="dashboard-account-dropdown-icon"><img src={arbitrumIcon} alt="Arbitrum" className="dashboard-account-dropdown-icon" /></span>
                      <span className="dashboard-account-dropdown-name">Arbitrum</span>
                      <span className="dashboard-account-dropdown-balance">0</span>
                    </div>
                    {/* Base */}
                    <div className={`dashboard-account-dropdown-row${selectedAccount === 'Base' ? ' selected' : ''}`} onClick={() => { setSelectedAccount('Base'); setAccountDropdownOpen(false); }}>
                      <span className="dashboard-account-dropdown-icon"><img src={baseIcon} alt="Base" className="dashboard-account-dropdown-icon" /></span>
                      <span className="dashboard-account-dropdown-name">Base</span>
                      <span className="dashboard-account-dropdown-balance">0</span>
                    </div>
                    {/* Starknet */}
                    <div className={`dashboard-account-dropdown-row${selectedAccount === 'Starknet' ? ' selected' : ''}`} onClick={() => { setSelectedAccount('Starknet'); setAccountDropdownOpen(false); }}>
                      <span className="dashboard-account-dropdown-icon"><img src={starknetIcon} alt="Starknet" className="dashboard-account-dropdown-icon" /></span>
                      <span className="dashboard-account-dropdown-name">Starknet</span>
                      <span className="dashboard-account-dropdown-balance">0.007063</span>
                    </div>
                    {/* Solana */}
                    <div className={`dashboard-account-dropdown-row${selectedAccount === 'Solana' ? ' selected' : ''}`} onClick={() => { setSelectedAccount('Solana'); setAccountDropdownOpen(false); }}>
                      <span className="dashboard-account-dropdown-icon"><img src={solanaIcon} alt="Solana" className="dashboard-account-dropdown-icon" /></span>
                      <span className="dashboard-account-dropdown-name">Solana</span>
                      <span className="dashboard-account-dropdown-balance dashboard-account-dropdown-create">Create Wallet</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="dashboard-balance-card-hero-amount">$0.01</div>
            <div className="dashboard-balance-card-hero-desc">Balance on {selectedAccount}</div>
          </div>
          <div className="dashboard-actions-hero">
            <div className="dashboard-action-hero">
              <span className="dashboard-action-hero-icon deposit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.75007 2.75C8.75007 2.33579 8.41428 2 8.00007 2C7.58586 2 7.25007 2.33579 7.25007 2.75L7.25006 7.25001H2.75C2.33579 7.25001 2 7.58579 2 8.00001C2 8.41422 2.33579 8.75001 2.75 8.75001H7.25006L7.25007 13.25C7.25007 13.6642 7.58586 14 8.00007 14C8.41428 14 8.75007 13.6642 8.75007 13.25L8.75006 8.75001H13.25C13.6642 8.75001 14 8.41422 14 8.00001C14 7.58579 13.6642 7.25001 13.25 7.25001L8.75006 7.25001L8.75007 2.75Z" fill="white"></path></svg>    
              </span>
              <span className="dashboard-action-hero-label">Deposit</span>
            </div>
            <div className="dashboard-action-hero">
              <span className="dashboard-action-hero-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4509_5171)"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.67 2.21704L21.17 6.96704C21.4195 7.09161 21.6294 7.28328 21.776 7.52051C21.9226 7.75775 22.0002 8.03116 22 8.31004V9.75004C22 10.44 21.44 11 20.75 11H20V19H21C21.2652 19 21.5196 19.1054 21.7071 19.2929C21.8946 19.4805 22 19.7348 22 20C22 20.2653 21.8946 20.5196 21.7071 20.7071C21.5196 20.8947 21.2652 21 21 21H3C2.73478 21 2.48043 20.8947 2.29289 20.7071C2.10536 20.5196 2 20.2653 2 20C2 19.7348 2.10536 19.4805 2.29289 19.2929C2.48043 19.1054 2.73478 19 3 19H4V11H3.25C2.56 11 2 10.44 2 9.75004V8.31004C2 7.78804 2.27 7.30804 2.706 7.03604L11.329 2.21704C11.5373 2.11284 11.7671 2.05859 12 2.05859C12.2329 2.05859 12.4617 2.11284 12.67 2.21704ZM17 11H7V19H9V13H11V19H13V13H15V19H17V11ZM12 6.00004C11.7348 6.00004 11.4804 6.1054 11.2929 6.29294C11.1054 6.48047 11 6.73483 11 7.00004C11 7.26526 11.1054 7.51961 11.2929 7.70715C11.4804 7.89469 11.7348 8.00004 12 8.00004C12.2652 8.00004 12.5196 7.89469 12.7071 7.70715C12.8946 7.51961 13 7.26526 13 7.00004C13 6.73483 12.8946 6.48047 12.7071 6.29294C12.5196 6.1054 12.2652 6.00004 12 6.00004Z" fill="#5F76F9"></path></g><defs><clipPath id="clip0_4509_5171"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>  
              </span>
              <span className="dashboard-action-hero-label">To bank</span>
            </div>
            <div className="dashboard-action-hero">
              <span className="dashboard-action-hero-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4509_5174)"><path d="M7.01202 12.8173L8.30742 13.1696C9.13343 13.395 9.54536 13.5078 9.8337 13.7961C10.122 14.0845 10.2348 14.4964 10.4592 15.3213L10.8126 16.6178C11.8196 20.3089 12.3226 22.1538 13.4283 22.2145C14.534 22.2731 15.2321 20.491 16.6261 16.9289L20.4527 7.14897C21.5475 4.35222 22.0949 2.95276 21.386 2.24382C20.6771 1.53488 19.2776 2.0823 16.4809 3.17715L6.70091 7.00371C3.13885 8.39775 1.35674 9.09585 1.41528 10.2015C1.47381 11.3072 3.31988 11.8091 7.01202 12.8173Z" fill="#5F76F9"></path></g><defs><clipPath id="clip0_4509_5174"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
              </span>
              <span className="dashboard-action-hero-label">Send</span>
            </div>
            <div className="dashboard-action-hero">
              <span className="dashboard-action-hero-icon getpaid">
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3405 11.2695C18.7066 10.9034 18.7066 10.3098 18.3405 9.94371C17.9744 9.5776 17.3808 9.5776 17.0147 9.94371L11.5441 15.4144L11.5441 12.3744C11.5441 11.8566 11.1243 11.4369 10.6066 11.4369C10.0888 11.4369 9.66905 11.8566 9.66905 12.3744L9.66905 17.6777C9.66905 18.1955 10.0888 18.6152 10.6066 18.6152H15.9099C16.4276 18.6152 16.8474 18.1955 16.8474 17.6777C16.8474 17.1599 16.4276 16.7402 15.9099 16.7402L12.8699 16.7402L18.3405 11.2695Z" fill="white"></path></svg>  
              </span>
              <span className="dashboard-action-hero-label">Get Paid</span>
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
                <div className="dashboard-transactions-filters-divider" style={{ width: '1px', height: '0.75rem', background: 'rgb(213 219 229)', display: 'inline-block' }} />
                <button>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]"><path fillRule="evenodd" clipRule="evenodd" d="M9.86769 2.5C9.16308 2.5 8.56077 3.01 8.44462 3.70538L8.37462 4.12769C8.35521 4.2337 8.30825 4.33273 8.23844 4.41483C8.16863 4.49692 8.07843 4.5592 7.97692 4.59538C7.85263 4.64188 7.72999 4.69268 7.60923 4.74769C7.51184 4.79399 7.40397 4.81382 7.29648 4.80518C7.18898 4.79654 7.08567 4.75973 6.99692 4.69846L6.64846 4.44923C6.37061 4.25072 6.03134 4.15723 5.69102 4.1854C5.35071 4.21358 5.03143 4.36158 4.79 4.60308L4.60308 4.79C4.36158 5.03143 4.21358 5.35071 4.1854 5.69102C4.15723 6.03134 4.25072 6.37061 4.44923 6.64846L4.69846 6.99692C4.75973 7.08567 4.79654 7.18898 4.80518 7.29648C4.81382 7.40397 4.79399 7.51184 4.74769 7.60923C4.69268 7.72999 4.64188 7.85263 4.59538 7.97692C4.5592 8.07843 4.49692 8.16863 4.41483 8.23844C4.33273 8.30825 4.2337 8.35521 4.12769 8.37462L3.70462 8.44538C3.36801 8.50163 3.06226 8.6754 2.8417 8.93582C2.62114 9.19624 2.50007 9.52642 2.5 9.86769V10.1323C2.5 10.8369 3.01 11.4392 3.70538 11.5554L4.12769 11.6254C4.34385 11.6615 4.51846 11.8177 4.59538 12.0231C4.64154 12.1477 4.69308 12.27 4.74769 12.3908C4.79399 12.4882 4.81382 12.596 4.80518 12.7035C4.79654 12.811 4.75973 12.9143 4.69846 13.0031L4.44923 13.3515C4.25072 13.6294 4.15723 13.9687 4.1854 14.309C4.21358 14.6493 4.36158 14.9686 4.60308 15.21L4.79 15.3969C5.28846 15.8954 6.07462 15.9608 6.64846 15.5508L6.99692 15.3015C7.08567 15.2403 7.18898 15.2035 7.29648 15.1948C7.40397 15.1862 7.51184 15.206 7.60923 15.2523C7.73 15.3069 7.85231 15.3577 7.97692 15.4046C8.18231 15.4815 8.33846 15.6562 8.37462 15.8723L8.44538 16.2954C8.56077 16.99 9.16231 17.5 9.86769 17.5H10.1323C10.8369 17.5 11.4392 16.99 11.5554 16.2946L11.6254 15.8723C11.6448 15.7663 11.6918 15.6673 11.7616 15.5852C11.8314 15.5031 11.9216 15.4408 12.0231 15.4046C12.1474 15.3581 12.27 15.3073 12.3908 15.2523C12.4882 15.206 12.596 15.1862 12.7035 15.1948C12.811 15.2035 12.9143 15.2403 13.0031 15.3015L13.3515 15.5508C13.6294 15.7493 13.9687 15.8428 14.309 15.8146C14.6493 15.7864 14.9686 15.6384 15.21 15.3969L15.3969 15.21C15.8954 14.7115 15.9608 13.9254 15.5508 13.3515L15.3015 13.0031C15.2403 12.9143 15.2035 12.811 15.1948 12.7035C15.1862 12.596 15.206 12.4882 15.2523 12.3908C15.3069 12.27 15.3577 12.1477 15.4046 12.0231C15.4815 11.8177 15.6562 11.6615 15.8723 11.6254L16.2954 11.5554C16.6321 11.4991 16.938 11.3252 17.1585 11.0647C17.3791 10.8041 17.5001 10.4737 17.5 10.1323V9.86769C17.5 9.16308 16.99 8.56077 16.2946 8.44462L15.8723 8.37462C15.7663 8.35521 15.6673 8.30825 15.5852 8.23844C15.5031 8.16863 15.4408 8.07843 15.4046 7.97692C15.3581 7.85265 15.3073 7.73001 15.2523 7.60923C15.206 7.51184 15.1862 7.40397 15.1948 7.29648C15.2035 7.18898 15.2403 7.08567 15.3015 6.99692L15.5508 6.64846C15.7493 6.37061 15.8428 6.03134 15.8146 5.69102C15.7864 5.35071 15.6384 5.03143 15.3969 4.79L15.21 4.60308C14.9686 4.36158 14.6493 4.21358 14.309 4.1854C13.9687 4.15723 13.6294 4.25072 13.3515 4.44923L13.0031 4.69846C12.9143 4.75973 12.811 4.79654 12.7035 4.80518C12.596 4.81382 12.4882 4.79399 12.3908 4.74769C12.27 4.69269 12.1474 4.64189 12.0231 4.59538C11.9216 4.5592 11.8314 4.49692 11.7616 4.41483C11.6918 4.33273 11.6448 4.2337 11.6254 4.12769L11.5554 3.70462C11.4991 3.36788 11.3252 3.06203 11.0647 2.84145C10.8041 2.62088 10.4737 2.49988 10.1323 2.5H9.86769ZM10 12.8846C10.765 12.8846 11.4988 12.5807 12.0397 12.0397C12.5807 11.4988 12.8846 10.765 12.8846 10C12.8846 9.23495 12.5807 8.50124 12.0397 7.96027C11.4988 7.4193 10.765 7.11538 10 7.11538C9.23495 7.11538 8.50124 7.4193 7.96027 7.96027C7.4193 8.50124 7.11538 9.23495 7.11538 10C7.11538 10.765 7.4193 11.4988 7.96027 12.0397C8.50124 12.5807 9.23495 12.8846 10 12.8846Z" fill="#13171F"></path></svg>
                </button>
              </div>
            </div>
            <div className="dashboard-transactions-list">
              {/* Flat Transaction Data Array with date and id on each transaction */}
              {(() => {
                // Flat array of transactions, each with a date and unique id
                const transactions = [
                  {
                    id: 'tx1',
                    date: '31 May',
                    type: 'offramp',
                    label: 'Offramp',
                    description: 'Withdrawn of',
                    amount: '- 5,001',
                    currency: 'USDC',
                    inr: '421,279.08',
                    inrSuffix: 'INR',
                    account: '****4520',
                    flag: '🇮🇳',
                  },
                  {
                    id: 'tx2',
                    date: '31 May',
                    type: 'offramp',
                    label: 'Offramp',
                    description: 'Withdrawn of',
                    amount: '- 5,082.32',
                    currency: 'USDC',
                    inr: '423,082.261',
                    inrSuffix: 'INR',
                    account: '****4520',
                    flag: '🇮🇳',
                  },
                  {
                    id: 'tx3',
                    date: '31 May',
                    type: 'offramp',
                    label: 'Offramp',
                    description: 'Withdrawn of',
                    amount: '- 5,000.09',
                    currency: 'USDC',
                    inr: '420,533.878',
                    inrSuffix: 'INR',
                    account: '****4520',
                    flag: '🇮🇳',
                  },
                  {
                    id: 'tx4',
                    date: '31 May',
                    type: 'offramp',
                    label: 'Offramp',
                    description: 'Withdrawn of',
                    amount: '- 5,003.01',
                    currency: 'USDC',
                    inr: '420,000.897',
                    inrSuffix: 'INR',
                    account: '****4520',
                    flag: '🇮🇳',
                  },
                  {
                    id: 'tx5',
                    date: '31 May',
                    type: 'offramp',
                    label: 'Offramp',
                    description: 'Withdrawn of',
                    amount: '- 5,000',
                    currency: 'USDC',
                    inr: '415,822.632',
                    inrSuffix: 'INR',
                    account: '****0540',
                    flag: '🇮🇳',
                  },
                  {
                    id: 'tx6',
                    date: '31 May',
                    type: 'offramp',
                    label: 'Offramp',
                    description: 'Withdrawn of',
                    amount: '- 1,648.24',
                    currency: 'USDC',
                    inr: '136,409.993',
                    inrSuffix: 'INR',
                    account: '****0540',
                    flag: '🇮🇳',
                  },
                  {
                    id: 'tx7',
                    date: '31 May',
                    type: 'deposit-canceled',
                    label: 'Deposit',
                    description: 'Canceled to deposit on Solana network',
                    amount: '+ 10,000',
                    currency: 'USDC',
                  },
                  {
                    id: 'tx8',
                    date: '31 May',
                    type: 'deposit-canceled',
                    label: 'Deposit',
                    description: 'Canceled to deposit on Solana network',
                    amount: '+ 1,000',
                    currency: 'USDC',
                  },
                  {
                    id: 'tx9',
                    date: '31 May',
                    type: 'offramp',
                    label: 'Offramp',
                    description: 'Withdrawn of',
                    amount: '- 3,819',
                    currency: 'USDC',
                    inr: '315,609.156',
                    inrSuffix: 'INR',
                    account: '****0540',
                    flag: '🇮🇳',
                  },
                  // Add more transactions with different dates and unique ids here
                ];
                return transactions.map((tx) => (
                  <div className="dashboard-transaction-row-wrapper" key={tx.id} style={{ position: 'relative' }}>
                    <div className="dashboard-transaction-date">{tx.date}</div>
                    <div className={`dashboard-transaction-row${tx.type === 'deposit-canceled' ? ' deposit-canceled' : ''}`}>  
                      <div className="dashboard-transaction-left">
                        <div className={`dashboard-transaction-type ${tx.type}`}>{
                          tx.type === 'offramp' ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}><path d="M9 2V16" stroke="#4C63ED" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 7L9 2L4 7" stroke="#4C63ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              {tx.label}
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}><circle cx="9" cy="9" r="8.25" fill="#FDECEE" stroke="#FBC7C7" strokeWidth="1.5"/><path d="M6.75 6.75L11.25 11.25" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round"/><path d="M11.25 6.75L6.75 11.25" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round"/></svg>
                              {tx.label}
                            </span>
                          )
                        }</div>
                        <div className="dashboard-transaction-desc">
                          {tx.type === 'offramp' ? (
                            <span>{tx.description} <b className="dashboard-inr-pill">{tx.inr} {tx.inrSuffix} {tx.flag}</b> to {tx.account}</span>
                          ) : (
                            <span>{tx.description}</span>
                          )}
                        </div>
                      </div>
                      <div className={`dashboard-transaction-amount${tx.type === 'deposit-canceled' ? ' deposit-canceled' : (tx.amount.startsWith('+') ? ' positive' : (tx.amount.startsWith('-') ? ' negative' : ''))}`}>{(() => {
                        const match = tx.amount.match(/^([+-])(.*)$/);
                        if (match) {
                          const sign = match[1];
                          const number = match[2].trim();
                          if (sign === '+') {
                            return <><span style={{color: '#22c55e', fontWeight: 400}}>{sign} {number}</span> <span style={{ color: '#7c8499', fontWeight: 400 }}>{tx.currency}</span></>;
                          } else if (sign === '-') {
                            return <><span style={{color: '#f04438', fontWeight: 400}}>{sign}</span> {number} <span style={{ color: '#7c8499', fontWeight: 400 }}>{tx.currency}</span></>;
                          }
                        }
                        return <>{tx.amount} <span style={{ color: '#7c8499', fontWeight: 400 }}>{tx.currency}</span></>;
                      })()}</div>
                    </div>
                  </div>
                ));
              })()}
              <div className="dashboard-transaction-end">
                <span>✦ You've reached the end of your transaction history ✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 