import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import store from './redux/store'
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocationProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </LocationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
