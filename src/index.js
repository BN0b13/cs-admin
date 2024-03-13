import ReactDOM from 'react-dom/client';

import { ConfigurationProvider } from './contexts/configuration.context';
import { ToastProvider } from './contexts/toast.context';
import { UserProvider } from './contexts/user.context';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider>
    <ConfigurationProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ConfigurationProvider>
  </ToastProvider>
);
