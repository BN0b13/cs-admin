import React from 'react';

import Client from '../../../tools/client';

import {
    AdminHomeContainer,
    AdminHomeTitle
} from './admin-home.styles';

const client = new Client();

const AdminHome = () => {

    return (
        <AdminHomeContainer>
            <AdminHomeTitle>Admin Home</AdminHomeTitle>
        </AdminHomeContainer>
    );
}

export default AdminHome;