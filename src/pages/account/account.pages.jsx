import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import OrderTable from '../../components/reusable/tables/order-table/order-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';
import { url } from '../../config';

import {
    MainContainer
} from './account.styles';

const client = new Client();

const AccountPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ account, setAccount ] = useState('');

    useEffect(() => {
        const getAccount = async () => {
            const res = await client.getAccountById(id);

            setAccount(res[0]);
            setLoading(false);
        }

        getAccount();
    }, []);

    const accountDisplay = () => {

        return (
            <MainContainer>
                <h6 onClick={() => window.location.href = `${url}/accounts`}>Back to Accounts</h6>
                <h2>Account</h2>
                <h4>Email: { account.email }</h4>
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
                <OrderTable orders={account.Orders} />
            </MainContainer>
        )
    }

    return (
        <div>
            {loading ?
                <Spinner />
            :
                account.length === 0 ?
                    <h2>No account to Display</h2>
                :
                    accountDisplay()
            }
        </div>
    )
}

export default AccountPage;