import { useContext, useEffect, useState } from 'react';

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';

import {
    AddAccountTitle,
    AddAccountInput,
    AddAccountLabel,
    AddAccountOption,
    AddAccountSelect,
    MainContainer
} from './add-account.styles';

const client = new Client();

const AddAccount = ({ getAccounts }) => {
    const [ email, setEmail ] = useState('');
    const [ roles, setRoles ] = useState([]);
    const [ role, setRole ] = useState('');
    const [ passwordToken, setPasswordToken ] = useState('');

    const { errorToast, successToast } = useContext(ToastContext);

    useEffect(() => {
        const getRoles = async () => {
            const res = await client.getRoles();
            const filterRoles = res.rows.filter(role => role.role !== 'superadmin');
            setRoles(filterRoles);
        }

        getRoles();
    }, []);

    const submitAccount = async () => {
        if(email === '' || role === '') {
            errorToast('Please fill out all fields.');
            return
        }

        const data = {
            email,
            roleId: role
        };

        const res = await client.createAccount(data);

        if(res.status === 201) {
            setEmail('');
            setRole('');
            successToast('Account Created');
            await getAccounts();

        } else {
            errorToast('Account creation failed. Please try again.');
        }
    }

    return (
        <MainContainer>
            {roles.length === 0 ?
                <Spinner />
            :
                <>
                    <AddAccountTitle>Add Account</AddAccountTitle>
                    <AddAccountInput type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <AddAccountSelect name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                        <AddAccountOption key={0} value={''} disabled> -- Select A Role -- </AddAccountOption>
                        {roles.map((role, index) => <AddAccountOption key={index + 1} value={role.id}>{role.role}</AddAccountOption>)}
                    </AddAccountSelect>
                    <Button onClick={() => submitAccount()}>Create Account</Button>
                </>
            }
        </MainContainer>
    )
}

export default AddAccount;