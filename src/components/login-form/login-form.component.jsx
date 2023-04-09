import React from 'react';

import Button from '../button/button.component';
import Spinner from '../spinner/spinner.component';

import logo from '../../assets/img/logo.png';
import { tokenName, api } from '../../config';

import {
  LoginFormButtonContainer,
  LoginFormContainer,
  LoginFormForm,
  LoginFormErrorContainer,
  LoginFormInput,
  LoginFormLabel,
  LoginFormLogo,
} from './login-form.styles';

class LoginForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
      errorVisible: false,
      errorMsg: 'There was an error. Please try again.',
    }
  }

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  checkFields = () => {
    if(this.state.email.length > 0 && this.state.password.length > 0) {
      return true
    }
    return false
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const checkFields = this.checkFields();
    if(!checkFields){
      this.setState({
        errorVisible: true,
        errorMsg: 'Please complete all fields',
      });
      return
    }

    this.setState({ loading: true });

    try {
      const login = await fetch(`${api}/login-admin`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, same-origin
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email.toLowerCase(),
          password: this.state.password,
          path: 'login',
        })
      });
      
      const res = await login.json();
      
      if(res.status !== 200) {
        this.setState({ 
          loading: false,
          errorVisible: true,
          errorMsg: res.message,
        });
        return
      }

      if(res && res.token) {
        localStorage.setItem(tokenName, res.token);
        sessionStorage.setItem(tokenName, JSON.stringify(res.data));
        window.location = '/';
      }

    } catch (err) {
      this.setState({ 
        loading: false,
        errorVisible: true,
        errorMsg: 'There was an error. Please try again.',
      });
    }
  }

  render() {
    if(this.state.loading) {
      return (
        <Spinner />
      )
    }

    return(
      <LoginFormContainer>
        <LoginFormLogo src={logo} alt="Cosmic Strains Login" />

        <LoginFormForm>
          <LoginFormLabel>Email: 
            <LoginFormInput 
            name="email" 
            type="text" 
            value={this.state.email} 
            onChange={this.handleChange}
            required />
          </LoginFormLabel>
          <LoginFormLabel>Password: 
            <LoginFormInput 
            name="password" 
            type="password" 
            value={this.state.password} 
            onChange={this.handleChange}
            required />
          </LoginFormLabel>
          { this.state.errorVisible && 
            <LoginFormErrorContainer onClose={() => this.setState({ errorVisible: false })}>
              {this.state.errorMsg}
            </LoginFormErrorContainer>
          }
          <LoginFormButtonContainer>
            <Button onClick={this.handleSubmit}>Login</Button>
          </LoginFormButtonContainer>
        </LoginFormForm>
      </LoginFormContainer>
    )
  }
}

export default LoginForm;