import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import {AuthWrapper} from './components/context/auth.context';
import reportWebVitals from './reportWebVitals';
import globalStyle from './components/globalStyle';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <globalStyle>
    <AuthWrapper>
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthWrapper>
  </globalStyle>
  
);
reportWebVitals();
