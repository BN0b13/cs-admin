import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';

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
                <h4>{ account.email }</h4>
                <h4>{ account.firstName } { account.lastName }</h4>
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