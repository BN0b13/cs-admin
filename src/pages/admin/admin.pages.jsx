import React, { useState } from 'react';

import AdminSidebar from '../../components/sidebar/admin-sidebar.component';

import { adminSidebarMenu } from '../../assets/menu-items';

import {
    AdminPageContainer,
    AdminPageDisplay
} from './admin.styles';

const AdminPage = () => {
    const [ adminDisplay, setAdminDisplay ] = useState(0);


    return (
        <AdminPageContainer>
                <AdminSidebar setAdminDisplay={setAdminDisplay} />
            <AdminPageDisplay>
                { adminSidebarMenu[adminDisplay].component }
            </AdminPageDisplay>
        </AdminPageContainer>
    );
};

export default AdminPage;