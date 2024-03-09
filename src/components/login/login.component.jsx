import { useState } from 'react';

import Button from '../reusable/button/button.component';
import Spinner from '../reusable/spinner/spinner.component';
import Toasted from '../reusable/toasted/toasted.component';

import Client from '../../tools/client';
import { tokenName } from '../../config';

import logo from '../../assets/img/logo.png';

import {
    ColumnContainer,
    Image,
    Input
} from '../../styles/component.styles';

const client = new Client();

const Login = () => {
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
          submitLogin();
        }
      }

    const submitLogin = async () => {
        setLoading(true);
        if(email === '' || password === '') {
            errorToast('Please fill out all fields to login.');
            setLoading(false);
            return
        }

        const data = {
            email,
            password
        }

        const res = await client.login(data);

        if(res.status !== 200) {
            errorToast('There was an error logging in. Please try again.');
            setLoading(false);
            return
          }
    
          if(res && res.token) {
            localStorage.setItem(tokenName, res.token);
            sessionStorage.setItem(tokenName, JSON.stringify(res.data));
            window.location = '/';
          }
    }

    return (
        <ColumnContainer onKeyDown={(e) => handleKeyDown(e)}>
            {loading ?
                <Spinner />
            :
                <>
                    <Image src={logo} alt='Cosmic Strains Logo' />
                    <Input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <Input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <Button onClick={() => submitLogin()}>Login</Button>
                </>
            }
            <Toasted 
                message={toastMessage}
                showToast={showToast}
                setShowToast={setShowToast}
                getToasted={getToasted}
                error={toastError}
            />
        </ColumnContainer>
    )
}

export default Login;