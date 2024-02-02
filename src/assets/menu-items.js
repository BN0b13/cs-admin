import {
  FaMoneyBillAlt,
  FaStoreAlt
} from 'react-icons/fa';

import {
  VscAccount,
  VscFile,
  VscFolder,
  VscPieChart,
  VscChecklist,
  VscSettingsGear
} from 'react-icons/vsc';

export const menuItemsLoggedIn = [
  {
    title: 'Metrics',
    path: '/',
    icon: (<VscPieChart />)
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: (<VscAccount />)
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: (<VscAccount />)
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: (<FaStoreAlt />)
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: (<VscFolder />)
  },
  {
    title: 'Products',
    path: '/products',
    icon: (<VscFile />)
  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon: (<VscChecklist />)
  },
  {
    title: 'Sales',
    path: '/sales',
    icon: (<FaMoneyBillAlt />)
  },
  {
    title: 'Configuration',
    path: '/configuration',
    icon: (<VscSettingsGear />)
  },
];