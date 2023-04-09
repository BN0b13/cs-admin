import React from 'react';

import AdminHome from '../admin-home/admin-home.component';
import OrderHistory from '../order-history/order-history.component';
import Settings from '../settings/settings.component';

import { adminSidebarMenu } from '../../../assets/menu-items';

import {
    AdminDisplayContainer
} from './admin-display.styles';

const AdminDisplay = ({ adminView }) => {

    const adminDisplayContent = () => {
        if(adminView === adminSidebarMenu[0].option) {
            return <AdminHome />
        }

        if(adminView === adminSidebarMenu[1].option) {
            return <OrderHistory />
        }

        if(adminView === adminSidebarMenu[2].option) {
            return <Settings />
        }
    }



    return (
        <AdminDisplayContainer>
            { adminDisplayContent() }
        </AdminDisplayContainer>
    );
}

export default AdminDisplay;