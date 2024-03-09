import { useState } from 'react';

import { states } from '../../../tools/states.js';
import { zipCodeInputValidation } from '../../../tools/user.js';

import {
    AddressBottomContainer,
    AddressCityInput,
    AddressContainer,
    AddressDropdown,
    AddressDropdownOption,
    AddressInput,
    AddressZipCodeInput,
    AddressTopContainer
} from './address.styles';

const Address = ({ address, updateAddress, customSelector = null }) => {
    const [ firstName, setFirstName ] = useState(address.firstName);
    const [ lastName, setLastName ] = useState(address.lastName);
    const [ addressOne, setAddressOne ] = useState(address.addressOne);
    const [ addressTwo, setAddressTwo ] = useState(address.addressTwo);
    const [ city, setCity ] = useState(address.city);
    const [ state, setState ] = useState(address.state || '');
    const [ zipCode, setZipCode ] = useState(address.zipCode);
    const [ selector, setSelector ] = useState(customSelector ? customSelector : 'address');

    const handleFirstName = (data) => {
        setFirstName(data);
        updateAddress({ firstName: data });
    }

    const handleLastName = (data) => {
        setLastName(data);
        updateAddress({ lastName: data });
    }

    const handleAddressOne = (data) => {
        setAddressOne(data);
        updateAddress({ addressOne: data });
    }

    const handleAddressTwo = (data) => {
        setAddressTwo(data);
        updateAddress({ addressTwo: data });
    }

    const handleCity = (data) => {
        setCity(data);
        updateAddress({ city: data });
    }

    const handleState = (data) => {
        setState(data);
        updateAddress({ state: data });
    }

    const handleZipCode = (data) => {
        setZipCode(data);
        updateAddress({ zipCode: data });
    }

    return (
        <AddressContainer>
            <AddressTopContainer>
                <AddressInput
                    type='text'
                    name={`${selector}FirstName`}
                    value={firstName}
                    onChange={(e) => handleFirstName(e.target.value)}
                    placeholder={'First Name'}
                    required
                />
                <AddressInput
                    type='text'
                    name={`${selector}LastName`}
                    value={lastName}
                    onChange={(e) => handleLastName(e.target.value)}
                    placeholder={'Last Name'}
                    required
                />
                <AddressInput
                    type='text'
                    name={`${selector}One`}
                    value={addressOne}
                    onChange={(e) => handleAddressOne(e.target.value)}
                    placeholder={'Address Line One'}
                    required
                />
                <AddressInput
                    type='text'
                    name={`${selector}Two`}
                    value={addressTwo}
                    onChange={(e) => handleAddressTwo(e.target.value)}
                    placeholder={'Address Line Two'}
                />
            </AddressTopContainer>
            <AddressBottomContainer>
                <AddressCityInput
                    type='text'
                    name={`${selector}City`}
                    value={city}
                    onChange={(e) => handleCity(e.target.value)}
                    placeholder={'City'}
                />
                <AddressDropdown
                    name={`${selector}State`}
                    id={`${selector}State`}
                    value={state}
                    onChange={(e) => handleState(e.target.value)}
                >
                    <AddressDropdownOption key={0} value={''} disabled> -- State -- </AddressDropdownOption>
                    {states.map((state, index) => 
                            <AddressDropdownOption
                                key={index + 1}
                                id={state.abbreviation}
                                value={state.abbreviation}
                            >
                                { state.abbreviation }
                            </AddressDropdownOption>
                    )}
                </AddressDropdown>
                <AddressZipCodeInput
                    type='text'
                    name={`${selector}ZipCode`}
                    value={zipCode}
                    onChange={(e) => zipCodeInputValidation(e.target.value, handleZipCode)}
                    placeholder={'Zip Code'}
                />
            </AddressBottomContainer>
        </AddressContainer>
    )
}

export default Address;