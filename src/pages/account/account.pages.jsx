import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import OrderTable from '../../components/reusable/tables/order-table/order-table.component';
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
    const [ account, setAccount ] = useState('');
    const [ activationLink, setActivationLink ] = useState('');
    
    const { successToast } = useContext(ToastContext);

    useEffect(() => {
        const getAccount = async () => {
            const res = await client.getAccountById(id);

            if(res.status === 'pending' && res.passwordToken) {
                const subdomain = res.roleId === 4 ? 'www' : 'admin';
                setActivationLink(`https://${subdomain}.cosmicstrains.com/accounts/activate/${res.passwordToken}`);
            }

            setAccount(res);
            setLoading(false);
        }

        getAccount();
    }, []);

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
                        <OrderTable orders={account.Orders} />
                    </>
                }
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
                    accountDisplay()
            }
        </MainContainer>
    )
}

export default AccountPage;