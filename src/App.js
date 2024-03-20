import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AccountPage from './pages/account/account.pages';
import ActivateAccountPage from './pages/activate-account/activate-account.pages';
import AccountsPage from './pages/accounts/accounts.pages';
import CategoryPage from './pages/category/category.page';
import CategoriesPage from './pages/categories/categories.pages';
import CompaniesPage from './pages/companies/companies.pages';
import CompanyPage from './pages/company/company.pages';
import ConfigurationPage from './pages/configuration/configuration.pages';
import ContributorAccountPage from './pages/role-based/contributor/contributor-account/contributor-account.pages';
import ContributorCompanyPage from './pages/role-based/contributor/contributor-company/contributor-company.pages';
import GiveawayPage from './pages/giveaway/giveaway.page';
import GiveawaysPage from './pages/giveaways/giveaways.pages';
import LoginPage from './pages/login/login.pages';
import MessagePage from './pages/message/message.pages';
import MessagesPage from './pages/messages/messages.pages';
import MetricsPage from './pages/metrics/metrics.pages';
import Order from './pages/order/order.pages';
import Orders from './pages/orders/orders.pages';
import ProductPage from './pages/product/product.pages';
import ProductsPage from './pages/products/products.pages';
import SalesPage from './pages/sales/sales.pages';

import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Footer from './components/app/footer/footer.component';
import Spinner from './components/reusable/spinner/spinner.component';
import Toasted from './components/reusable/toasted/toasted.component';

import { ConfigurationContext } from './contexts/configuration.context';
import { ToastContext } from './contexts/toast.context';
import { UserContext } from './contexts/user.context';

import Client from './tools/client';
import { themeTokenName, tokenName } from './config';

import {
  AppLoadingContainer,
  MainContainer
} from './App.styles';

import './App.css';

const client = new Client();

function App() {
  const [ loading, setLoading ] = useState(false);

  const { theme, setAppTheme } = useContext(ConfigurationContext);
  const { showToast, setShowToast, getToasted, toastError, toastMessage } = useContext(ToastContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const themeToken = localStorage.getItem(themeTokenName);
    
    if(themeToken) {
      const savedTheme =  JSON.parse(themeToken);
      setAppTheme(savedTheme, savedTheme.colors.primary);
    }

    const setAppContext = async () => {
      let currentTheme = {
        themeInverted: false
      };

      const getAppConfiguration = await client.configuration();
      const token = localStorage.getItem(tokenName);
      
      if(token) {
        const getAccount = await client.getAccount();
        currentTheme = {
          themeId: getAccount.themeId,
          themeInverted: getAccount.themeInverted
        };
        setCurrentUser(getAccount);
      } else {
        localStorage.removeItem(tokenName);
      }

      const savedTheme = JSON.parse(themeToken);
      
      if(!savedTheme) {
        setLoading(true);
        const theme = getAppConfiguration.rows[0].Theme;
        const colors = currentTheme.themeInverted ? theme.colors.secondary : theme.colors.primary;
        setAppTheme(theme, colors);
        setLoading(false);
      } else {
        if(savedTheme.id != getAppConfiguration.rows[0].Theme.id || 
          savedTheme.updatedAt !== getAppConfiguration.rows[0].Theme.updatedAt) {
          setLoading(true);
          const theme = getAppConfiguration.rows[0].Theme;
          const colors = currentTheme.themeInverted ? theme.colors.secondary : theme.colors.primary;
          setAppTheme(theme, colors);
          setLoading(false);
        }
      }
    }

    setAppContext();
    setLoading(false);
  }, []);

  const adminRoutes = () => {
    return (
      <Routes>
        <Route index element={<MetricsPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/accounts/:id" element={<AccountPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyPage />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
        <Route path="/giveaways" element={<GiveawaysPage />} />
        <Route path="/giveaways/:id" element={<GiveawayPage />} />
        <Route path='/messages' element={<MessagesPage />} />
        <Route path='/messages/:id' element={<MessagePage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:refId" element={<Order />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/sales" element={<SalesPage />} />
      </Routes>
    )
  }

  const contributorRoutes = () => {
    return (
      <Routes>
        <Route index element={<ContributorAccountPage />} />
        <Route path="/company" element={<ContributorCompanyPage />} />
        <Route path="/giveaways" element={<GiveawaysPage />} />
        <Route path="/giveaways/:id" element={<GiveawayPage />} />
      </Routes>
    )
  }



  const routes = () => {
    if(localStorage.getItem(tokenName)) {
      return (
        <div id="outer-container" className="App">
          <HamburgerMenu />
          <div id="page-wrap">
            <Header />
            {!currentUser ?
              <Spinner />
              :
                currentUser.roleId <= 3 ?
                  adminRoutes()
                :
                  contributorRoutes()
            }
            <Footer />
          </div>
        </div>
      )
      
    }

    return (
      
      <Routes>
              <Route index element={<LoginPage />} />
              <Route path="/accounts/activate/:passwordToken" element={<ActivateAccountPage />} />
          </Routes>
    );
  }

  return (
    <MainContainer id="outer-container" className="App">
      {loading ?
        <AppLoadingContainer>
          <Spinner />
        </AppLoadingContainer>
      :
        <BrowserRouter>
          { routes() }
        </BrowserRouter>
      }
      <Toasted 
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
          getToasted={getToasted}
          error={toastError}
      />
    </MainContainer>
  );
}

export default App;