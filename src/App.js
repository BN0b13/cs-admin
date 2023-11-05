import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AccountPage from './pages/account/account.pages';
import AccountsPage from './pages/accounts/accounts.pages';
import CategoryPage from './pages/category/category.page';
import CategoriesPage from './pages/categories/categories.pages';
import ConfigurationPage from './pages/configuration/configuration.pages';
import InventoryPage from './pages/inventory/inventory.pages';
import LoginPage from './pages/login/login.pages';
import MessagePage from './pages/message/message.pages';
import MessagesPage from './pages/messages/messages.pages';
import MetricsPage from './pages/metrics/metrics.pages';
import Order from './pages/order/order.pages';
import Orders from './pages/orders/orders.pages';
import ProductPage from './pages/product/product.pages';
import ProductsPage from './pages/products/products.pages';

import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Footer from './components/app/footer/footer.component';

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
              <Route index element={<MetricsPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/accounts/:id" element={<AccountPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:id" element={<CategoryPage />} />
              <Route path="/configuration" element={<ConfigurationPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path='/messages' element={<MessagesPage />} />
              <Route path='/messages/:id' element={<MessagePage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:refId" element={<Order />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
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