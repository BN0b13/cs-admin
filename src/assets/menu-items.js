import Views from '../components/metrics/views/views.component';
import Orders from '../components/orders/orders.component';
import Inventory from '../components/inventory/inventory.component';
import Products from '../components/products/products.component';

export const adminSidebarMenu = [
  {
    title: 'Metrics',
    component: <Views />
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