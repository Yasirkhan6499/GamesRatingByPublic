import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link } from 'react-router-dom';
import { GameContextProvider } from './contexts/gameContext';
import BannerImage from './Components/banner';
import CurrentUser from './Components/currentUser';
import { auth, db } from './config/firebase';
import { useLocation } from 'react-router-dom';
import Footer from './Components/footer';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
     <BrowserRouter>
     <GameContextProvider>
      <section className='section-header'>
            <BannerImage />
            <CurrentUser /> 
      </section>
       <App />
       <section className='footer-section'>
        <Footer />
       </section>
    </GameContextProvider>
   </BrowserRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
