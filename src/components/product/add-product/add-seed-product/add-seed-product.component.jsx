import { useContext, useEffect, useState } from 'react';

import Spinner from '../../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../../contexts/toast.context';

import Client from '../../../../tools/client';

import { url } from '../../../../config';

import {
    AddProductButton,
    AddProductInput,
    AddProductLabel,
    AddProductOption,
    AddProductSelect,
    AddProductTextarea,
    AddProductText,
    AddProductContainer,
    CheckboxContainer,
    ProductProfileContainer
} from './add-seed-product.styles';

const client = new Client();


const AddSeedProduct = ({category, productType}) => {
    const [ loading, setLoading ] = useState(false);
    const [ productProfiles, setProductProfiles ] = useState([]);
    const [ profileArr, setProfileArr ] = useState([]);

    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ time, setTime ] = useState('');
    const [ mother, setMother ] = useState('');
    const [ father, setFather ] = useState('');
    const [ inventoryType, setInventoryType ] = useState('');
    const [ size, setSize ] = useState('');
    const [ sizeDescription, setSizeDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ priceDisplay, setPriceDisplay ] = useState('');
    const [ cents, setCents ] = useState('00');
    const [ dollars, setDollars ] = useState('0');
    const [ quantity, setQuantity ] = useState('');
    
    const { errorToast } = useContext(ToastContext);

    useEffect(() => {
        const getProductProfiles = async () => {
            const res = await client.getProductProfiles();

            const tempProfileArr = [];

            res.rows.forEach(row => tempProfileArr.push({
                id: row.id,
                name: row.name,
                checked: false
            }));

            setProfileArr(tempProfileArr);

            setProductProfiles(res.rows);
        }

        getProductProfiles();
    }, []);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            setImage('');
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleProductProfile = (e) => {
        const checkboxId = parseInt(e);

        for(let profile of profileArr) {
            if(profile.id === checkboxId) {
                profile.checked = !profile.checked;
            }
        }
    }

    const handleMoneyInput = (e) => {
        if(e === '') {
            setPrice(e);
            setPriceDisplay(e);
            setCents('00');
            setDollars('0');
        }

        if(e.length === 2) {
            setDollars('0');
        }

        const reg = /^\d+$/;

        if(!reg.test(e)) {
            return
        }

        const amount = parseInt(e);

        setPrice(amount);
        setPriceDisplay(e);

        if(amount <= 9) {
            let oneDigit = e;
            if(e.length === 2) {
                oneDigit = e.slice(-1);
            }
            const centAmount = `0${oneDigit}`;
            setCents(centAmount);
        }

        if(amount >= 10 && amount <= 99) {
            setCents(e);
        }

        if(amount >= 100) {
            const centAmount = e.slice(-2);
            const dollarAmount = e.substring(0, e.length - 2);
            setCents(centAmount);
            setDollars(dollarAmount);
        }
    }

    const addProduct = async () => {
        if(name === '' || 
            description === '' ||
            time === '' ||
            mother === '' ||
            father === '' ||
            inventoryType === '' ||
            size === '' ||
            sizeDescription === '' ||
            price === '' ||
            quantity === ''
        ) {
            errorToast('Please fill out all fields.');
            return;
        }

        setLoading(true);

        const profile = [];

        for(let item of profileArr) {
            if(item.checked) {
                profile.push(parseInt(item.id));
            }
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('categoryId', category);
        formData.append('type', productType);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('time', time);
        formData.append('mother', mother);
        formData.append('father', father);
        formData.append('profile', profile);
        formData.append('inventoryType', inventoryType);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('quantity', quantity);

        const res = await client.createProduct(formData);

        if(res) {
            return window.location.href = `${url}/products/${res.result.id}`;
        }

        errorToast('There was an error creating category. Please try again.');
        setLoading(false);
    }

    return (
        <AddProductContainer>
            {loading ?
                <Spinner />
            :
                <>
                    {imagePreview && <img src={imagePreview} width='100' height='100' alt='preview' />}
                    <AddProductLabel>Product Image:
                        <AddProductInput type='file' accept='image/*' name='files' onChange={e => handleFileChange(e)} />
                    </AddProductLabel>
                    <AddProductInput type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    <AddProductTextarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <AddProductInput type='text' name='time' value={time} onChange={(e) => setTime(e.target.value)} placeholder='Time' />
                    <AddProductInput type='text' name='mother' value={mother} onChange={(e) => setMother(e.target.value)} placeholder='Mother' />
                    <AddProductInput type='text' name='father' value={father} onChange={(e) => setFather(e.target.value)} placeholder='Father' />

                    <ProductProfileContainer>
                        {productProfiles.map((item, index) => (
                            <CheckboxContainer key={index}>
                                <AddProductInput type='checkbox' name={item.name} value={item.id} onChange={e => handleProductProfile(e.target.value)} />
                                <AddProductLabel>{item.name}</AddProductLabel>
                            </CheckboxContainer>
                        ))}
                    </ProductProfileContainer>

                    <AddProductSelect name='inventoryType' onChange={(e) => setInventoryType(e.target.value)} defaultValue={0}>
                        <AddProductOption value={0} disabled> -- Seed Type -- </AddProductOption>
                        <AddProductOption value={'regular'}>Regular</AddProductOption>
                        <AddProductOption value={'feminized'}>Feminized</AddProductOption>
                    </AddProductSelect>

                    <AddProductSelect name='size' onChange={(e) => setSize(e.target.value)} defaultValue={0}>
                        <AddProductOption value={0} disabled> -- Pack Size -- </AddProductOption>
                        <AddProductOption value={'Full Pack'}>Full Pack</AddProductOption>
                        <AddProductOption value={'Half Pack'}>Half Pack</AddProductOption>
                    </AddProductSelect>
                    <AddProductLabel>Pack Quantity:
                        <AddProductInput type='number' name='sizeDescription' onChange={(e) => setSizeDescription(`${e.target.value} seeds`)} />
                    </AddProductLabel>
                    <AddProductText>${dollars}.{cents}</AddProductText>
                    <AddProductInput type='text' name='price' value={priceDisplay} onChange={(e) => handleMoneyInput(e.target.value)} placeholder='Price' />

                    <AddProductInput type='number' name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Quantity' />
                    <AddProductButton onClick={() => addProduct()}>Add Product</AddProductButton>
                </>
            }
        </AddProductContainer>
    )
}

export default AddSeedProduct;