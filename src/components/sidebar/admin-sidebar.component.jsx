import React from 'react';

import { adminSidebarMenu } from '../../assets/menu-items';

import {
    AdminSidebarContainer,
    AdminSidebarOption,
} from './admin-sidebar.styles';

const AdminSidebar = ({ setAdminDisplay }) => {

    return (
        <AdminSidebarContainer>
            {adminSidebarMenu.map((item, index) => {
                return <AdminSidebarOption
                            key={index} 
                            onClick={() => setAdminDisplay(index)}
                        >
                            { item.title }
                        </AdminSidebarOption>
            })}
        </AdminSidebarContainer>
    );
}

export default AdminSidebar;