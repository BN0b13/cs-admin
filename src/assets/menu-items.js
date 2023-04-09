import Accounts from '../components/accounts/accounts.component';
import Inventory from '../components/inventory/inventory.component';
import Orders from '../components/orders/orders.component';
import Products from '../components/products/products.component';
import Views from '../components/metrics/views/views.component';

export const adminSidebarMenu = [
  {
    title: 'Metrics',
    component: <Views />
  },
  {
    title: 'Accounts',
    component: <Accounts />
  },
  {
    title: 'Orders',
    component: <Orders />
  },
  {
    title: 'Inventory',
    component: <Inventory />
  },
  {
    title: 'Products',
    component: <Products />
  },
];