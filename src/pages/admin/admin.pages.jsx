import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AdminSidebar from '../../components/sidebar/admin-sidebar.component';
import Views from '../../components/metrics/views/views.component';
import Orders from '../../components/orders/orders.component';
import Inventory from '../../components/inventory/inventory.component';
import Products from '../../components/products/products.component';

import {
    AdminPageContainer,
    AdminPageDisplay
} from './admin.styles';

const AdminPage = () => {
    const routes = () => {

        return (
          <Routes>
            <Route 
              path="/" 
              element={
                <Views />
              }
            />
            <Route 
              path="/orders" 
              element={
                <Orders />
              }
            />
            <Route 
              path="/inventory" 
              element={
                <Inventory />
              }
            />
            <Route 
              path="/products" 
              element={
                <Products />
              }
            />
          </Routes>
        );
      }


    return (
        <AdminPageContainer>
                <AdminSidebar />
            <AdminPageDisplay>
                <BrowserRouter>
                    { routes() }
                </BrowserRouter>
            </AdminPageDisplay>
        </AdminPageContainer>
    );
};

export default AdminPage;