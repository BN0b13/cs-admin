import Customers from '../components/customers/customers.component';
import Employees from '../components/employees/employees.component';
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
    title: 'Customers',
    component: <Customers />
  },
  {
    title: 'Employees',
    component: <Employees />
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