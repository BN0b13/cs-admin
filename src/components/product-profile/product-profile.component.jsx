import { useContext, useEffect, useState } from 'react';

import { ToastContext } from '../../contexts/toast.context';

import Client from '../../tools/client';

import { api } from '../../config';

import {
    AddProductProfileButton,
    AddProductProfileBody,
    AddProductProfileData,
    AddProductProfileInput,
    AddProductProfileHead,
    AddProductProfileHeader,
    AddProductProfileLabel,
    AddProductProfileRow,
    AddProductProfileTable,
    AddProductProfileTextarea,
    MainContainer,
    MainSubtitle,
    MainTitle
} from './product-profile.styles';

const client = new Client();

const ProductProfile = () => {
    const [ productProfiles, setProductProfiles ] = useState([]);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ icon, setIcon ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    
    const { errorToast, successToast } = useContext(ToastContext);

    useEffect(() => {
        getProductProfiles();
    }, []);

    const getProductProfiles = async () => {
        const res = await client.getProductProfiles();

        setProductProfiles(res.rows);
    }

    const addProductProfile = async () => {
        if(name === '' || description === '' || icon === '') {
            errorToast('Please fill out all fields and select an icon.');
            return;
        }

        let formData = new FormData();

        formData.append('files', icon);
        formData.append('name', name);
        formData.append('description', description);

        await client.createProductProfile(formData);

        successToast('Product Profile created successfully.');
        setName('');
        setDescription('');
        setImagePreview('');
        setIcon('');

        await getProductProfiles();
    }

    const handleFileChange = (e) => {
        setIcon(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <MainContainer>
            <MainTitle>Product Profiles</MainTitle>
            {imagePreview && <img src={imagePreview} width='50' height='50' alt='preview' />}
            <AddProductProfileLabel>Display Icon:
                <AddProductProfileInput type='file' accept='image/png'  name='files' onChange={e => handleFileChange(e)} />
            </AddProductProfileLabel>
            <AddProductProfileInput type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
            <AddProductProfileTextarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <AddProductProfileButton onClick={() => addProductProfile()}>Add Product Profile</AddProductProfileButton>
            <MainTitle>Current Product Profiles</MainTitle>
            {productProfiles.length === 0 ? 
                <MainSubtitle>No Current Product Profiles</MainSubtitle>
            :
                <AddProductProfileTable>
                    <AddProductProfileHeader>
                        <AddProductProfileRow>
                            <AddProductProfileHead>Name</AddProductProfileHead>
                            <AddProductProfileHead>Description</AddProductProfileHead>
                            <AddProductProfileHead>Icon</AddProductProfileHead>
                        </AddProductProfileRow>
                    </AddProductProfileHeader>
                    <AddProductProfileBody>
                        {productProfiles.map((item, index) => (
                            <AddProductProfileRow key={index}>
                                <AddProductProfileData>{ item.name }</AddProductProfileData>
                                <AddProductProfileData>{ item.description }</AddProductProfileData>
                                <AddProductProfileData>
                                    <img src={api + item.path} width='40' height='40' alt='product profile' />
                                </AddProductProfileData>
                            </AddProductProfileRow>
                        ))}
                    </AddProductProfileBody>

                </AddProductProfileTable>
            }
        </MainContainer>
    )
}

export default ProductProfile;