import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/reusable/button/button.component';
import OrdersTable from '../../components/reusable/tables/orders-table/orders-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import { ToastContext } from '../../contexts/toast.context';

import Client from '../../tools/client';
import { url } from '../../config';

import {
    BackLink,
    ContentContainer,
    MainContainer,
    MainTitle,
    WordBreakContainer
} from '../../styles/page.styles';

const client = new Client();

const AccountPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ account, setAccount ] = useState(null);
    const [ username, setUsername ] = useState('');
    const [ role, setRole ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ billingAddress, setBillingAddress ] = useState('');
    const [ shippingAddress, setShippingAddress ] = useState('');
    const [ activationLink, setActivationLink ] = useState('');
    const [ showUpdateAccount, setShowUpdateAccount ] = useState(false);

    const [ roles, setRoles ] = useState(null);
    const [ roleId, setRoleId ] = useState('');
    
    const { successToast, errorToast } = useContext(ToastContext);

    useEffect(() => {
        getAccount();

        // eslint-disable-next-line
    }, []);

    const getAccount = async () => {
        setLoading(true);
        const res = await client.getAccountById(id);

        if(res.status === 'pending' && res.passwordToken) {
            const subdomain = res.roleId === 4 ? 'www' : 'admin';
            setActivationLink(`https://${subdomain}.cosmicstrains.com/accounts/activate/${res.passwordToken}`);
        }

        const getRoles = await client.getRoles();
        const filteredRoles = getRoles.rows.filter(role => role.id !== 1);
        setRoles(filteredRoles);
        const roleName = getRoles.rows.filter(role => role.id === res.roleId);
        
        setRole(roleName[0].role);
        setRoleId(res.roleId);

        setAccount(res);
        setLoading(false);
    }

    const updateAccount = async () => {
        if(roleId === '') {
            return
        }

        const data = {
            id: account.id,
            roleId
        }

        const res = await client.updateAccount(data);

        if(res.length > 0) {
            await getAccount();
            setShowUpdateAccount(false);
            successToast('Account Updated');
        } else {
            errorToast('There was an error updating account. Please try again.')
        }
    }

    const copyActivationLinkToClipBoard = () => {
        navigator.clipboard.writeText(activationLink);
        successToast('Copied Activation Link to Clipboard');
    }

    const accountDisplay = () => {

        return (
            <ContentContainer>
                <h2>Account</h2>
                <h4>Email: { account.email }</h4>
                {account.status === 'pending' ?
                    <WordBreakContainer>
                        <h4>Status: { account.status }</h4>
                        <h4>Activation Link: { activationLink }</h4>
                        <button onClick={() => copyActivationLinkToClipBoard()}>Copy to Clipboard</button>
                    </WordBreakContainer>
                :
                    <>
                        <h4>Username: { account.username ? account.username : 'No Username' }</h4>
                        <h4>Role: { role }</h4>
                        <h4>Name: { account.firstName } { account.lastName }</h4>
                        <h4>Phone: { account.phone }</h4>
                        <h4>Billing Address:</h4>
                        <h4>{ account.billingAddress.addressOne }</h4>
                        {account.billingAddress.addressTwo &&
                        <h4>{ account.billingAddress.addressTwo }</h4>
                        }
                        <h4>{ account.billingAddress.city }</h4>
                        <h4>{ account.billingAddress.state }</h4>
                        <h4>{ account.billingAddress.zipCode }</h4>
                        <h4>Shipping Address:</h4>
                        <h4>{ account.shippingAddress.addressOne }</h4>
                        {account.shippingAddress.addressTwo &&
                        <h4>{ account.shippingAddress.addressTwo }</h4>
                        }
                        <h4>{ account.shippingAddress.city }</h4>
                        <h4>{ account.shippingAddress.state }</h4>
                        <h4>{ account.shippingAddress.zipCode }</h4>
                        <h4>Credit ${ account.credit/100 }</h4>
                        <OrdersTable orders={account.Orders} />
                    </>
                }
                <Button onClick={() => setShowUpdateAccount(true)}>Update Account</Button>
            </ContentContainer>
        )
    }

    const updateAccountDisplay = () => {
        return (
            <ContentContainer>
                <h2>Update Account</h2>
                <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                    <option key={'default'} value={''}>Please Select A Role</option>
                    {roles &&
                        roles.map((role, index) => (
                            <option key={index} value={role.id}>{ role.role }</option>
                        ))}
                </select>
                <ContentContainer flexDirection={'row'}>
                    <Button onClick={() => setShowUpdateAccount(false)}>Cancel</Button>
                    <Button onClick={() => updateAccount(false)}>Confirm</Button>
                </ContentContainer>
            </ContentContainer>
        )
    }

    return (
        <MainContainer>
            <BackLink onClick={() => window.location.href = `${url}/accounts`}>Back to Accounts</BackLink>
            {loading ?
                <Spinner />
            :
                account.length === 0 ?
                    <MainTitle>No account to Display</MainTitle>
                :
                    showUpdateAccount ?
                        updateAccountDisplay()
                    :
                        accountDisplay()
            }
        </MainContainer>
    )
}

export default AccountPage;