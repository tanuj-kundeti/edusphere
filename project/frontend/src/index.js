import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="process.env.114477227875-m5uoinbfoka54l5936tthljcma67qtk1">
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </GoogleOAuthProvider>
);
