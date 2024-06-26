import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Client from '../../../tools/client';

import { UserContext } from '../../../contexts/user.context';

import { 
    HeaderNav,
    InfoLinks
} from './header.styles';

const client = new Client();

const Header = () => {
    const [ newAccounts, setNewAccounts ] = useState(0);
    const [ newOrders, setNewOrders ] = useState(0);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if(currentUser?.roleId < 4) {
            getAccounts();
            getOrders();
        }
    }, [ currentUser ]);

    const getAccounts = async () => {
        const res = await client.getCustomers();
        const today = dayjs().format('MM/DD/YY');
        const signUpsToday = res.rows.filter(customer =>  dayjs(customer.createdAt).format('MM/DD/YY') === today);
        setNewAccounts(signUpsToday.length);
    }

    const getOrders= async () => {
        const res = await client.getOrders();
        const newOrderArr = res.rows.filter(order => order.status.toLowerCase() === 'new');
        setNewOrders(newOrderArr.length);
    }

    return(
        <HeaderNav>
            <div>
                {newAccounts !== 0 &&
                    <InfoLinks onClick={() => window.location.href = '/accounts'}>{newAccounts} New Account(s)</InfoLinks>
                }
                {newOrders !== 0 &&
                    <InfoLinks onClick={() => window.location.href = '/orders'}>{newOrders} New Order(s)</InfoLinks>
                }
            </div>
        </HeaderNav>
    )
};

export default Header;