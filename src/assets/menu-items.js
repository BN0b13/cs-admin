import {
  FaStoreAlt
} from 'react-icons/fa';

import {
  VscAccount,
  VscFile,
  VscFolder,
  VscPieChart,
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
    title: 'Configure',
    path: '/configure',
    icon: (<VscSettingsGear />)
  },
];