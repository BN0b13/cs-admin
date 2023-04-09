import React from 'react';

import { adminSidebarMenu } from '../../assets/menu-items';

import {
    AdminSidebarContainer,
    AdminSidebarOption,
} from './admin-sidebar.styles';

const AdminSidebar = ({ setAdminView }) => {

    return (
        <AdminSidebarContainer>
            {adminSidebarMenu.map((item, index) => {
                
                return <AdminSidebarOption
                            key={index} 
                            href={item.path}
                        >
                            { item.title }
                        </AdminSidebarOption>
            })}
        </AdminSidebarContainer>
    );
}

export default AdminSidebar;