import React from 'react';

import {
  AddressFormContainer,
  AddressFormInput,
  AddressFormLabel,
} from './address-form.styles';

class AddressForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    }
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    this.props[name](value);
  }

  render() {

    return(
      <AddressFormContainer>
          <AddressFormLabel>Address: 
            <AddressFormInput 
            name="address" 
            type="text" 
            value={this.state.address} 
            onChange={this.handleChange}
            required />
          </AddressFormLabel>
          <AddressFormLabel>City: 
            <AddressFormInput 
            name="city" 
            type="text" 
            value={this.state.city} 
            onChange={this.handleChange}
            required />
          </AddressFormLabel>
          <AddressFormLabel>State: 
            <AddressFormInput 
            name="state" 
            type="text" 
            value={this.state.state} 
            onChange={this.handleChange}
            required />
          </AddressFormLabel>
          <AddressFormLabel>Zip Code: 
            <AddressFormInput 
            name="zipCode" 
            type="text" 
            value={this.state.zipCode} 
            onChange={this.handleChange}
            required />
          </AddressFormLabel>
      </AddressFormContainer>
    )
  }
}

export default AddressForm;