import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HamburgerMenu from './components/hamburger-menu/hamburger-menu.component';

import AccountsPage from './pages/accounts/accounts.pages';
import AdminHomePage from './pages/admin-home/admin-home.pages';
import ConfigurationPage from './pages/configuration/configuration.pages';
import LoginPage from './pages/login/login.pages';
import Order from './pages/order/order.pages';
import Orders from './pages/orders/orders.pages';
import Product from './pages/product/product.pages';
import Products from './pages/products/products.pages';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import { tokenName } from './config';

import './App.css';

function App() {
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem(tokenName));
  }, []);



  const appView = () => {
    if(token) {

      return (
        <div id="outer-container" className="App">
        <HamburgerMenu />
        <div id="page-wrap">
          <Header />
          <Routes>
              <Route index element={<AdminHomePage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/configure" element={<ConfigurationPage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:order" element={<Order />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
          </Routes>
          <Footer />
        </div>
      </div>
      )
      
    }

    return (
      <LoginPage /> 
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        { appView() }
      </BrowserRouter>
    </div>
  );
}

export default App;