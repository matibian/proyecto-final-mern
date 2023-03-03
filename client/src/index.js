import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <HashRouter >
      <App />
    </HashRouter>
  </>
);

reportWebVitals();
