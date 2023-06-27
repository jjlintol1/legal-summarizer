import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';

// import { StyledEngineProvider, ThemeProvider } from '@mui/material';
// import { theme } from './theme';

import { Provider } from "react-redux";
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
    </Router>
  </React.StrictMode>
);

