import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import { GOOGLE_CLIENT_ID } from './config';
import './index.scss';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
}
