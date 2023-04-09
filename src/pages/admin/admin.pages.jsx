import React, { useState } from 'react';

import AdminSidebar from '../../components/admin/admin-sidebar/admin-sidebar.component';
import AdminDisplay from '../../components/admin/admin-display/admin-display.component';

import {
    AdminPageContainer,
    AdminPageDisplay
} from './admin.styles';

const AdminPage = () => {
    const [ adminView, setAdminView ] = useState(1);

    return (
        <AdminPageContainer>
            <AdminPageDisplay>
                <AdminSidebar setAdminView={setAdminView} />
                <AdminDisplay adminView={adminView} />
            </AdminPageDisplay>
        </AdminPageContainer>
    );
};

export default AdminPage;