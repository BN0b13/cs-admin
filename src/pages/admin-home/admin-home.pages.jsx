import { useState } from 'react';

import Views from '../../components/metrics/views/views.component';

import {
    AdminHomeContainer,
    AdminHomeTitle
} from './admin-home.styles';

const AdminHomePage = () => {
    const [ adminDisplay, setAdminDisplay ] = useState(0);


    return (
        <AdminHomeContainer>
            <Views />
        </AdminHomeContainer>
    );
};

export default AdminHomePage;