import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AccountPage from './pages/account/account.pages';
import AccountsPage from './pages/accounts/accounts.pages';
import CategoryPage from './pages/category/category.page';
import CategoriesPage from './pages/categories/categories.pages';
import ConfigurationPage from './pages/configuration/configuration.pages';
import InventoryPage from './pages/inventory/inventory.pages';
import LoginPage from './pages/login/login.pages';
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
              <Route path="/configuration" element={<ConfigurationPage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:refId" element={<Order />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:id" element={<CategoryPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
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