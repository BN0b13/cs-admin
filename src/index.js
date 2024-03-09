import ReactDOM from 'react-dom/client';

import { ConfigurationProvider } from './contexts/configuration.context';
import { UserProvider } from './contexts/user.context';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigurationProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ConfigurationProvider>
);
