import React, { useEffect, useState } from 'react';
import './App.css';

import AdminPage from './pages/admin/admin.pages';
import LoginPage from './pages/login/login.pages';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import { tokenName } from './config';

function App() {
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem(tokenName));
  }, []);



  const appView = () => {
    if(token) {

      return (
        <>
          <Header token={token} />
            <AdminPage />
          <Footer />
        </>
      )
      
    }

    return (
      <LoginPage /> 
    );
  }

  return (
    <div className="App">
      { appView() }
    </div>
  );
}

export default App;