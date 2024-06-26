import { useContext, useEffect, useState } from 'react';

import AdminModal from '../../../reusable/admin-modal/admin-modal.component';
import Button from '../../../reusable/button/button.component';
import UpdateInventory from '../../../inventory/update-inventory/update-inventory.component';

import { ToastContext } from '../../../../contexts/toast.context';

import { api } from '../../../../config';

import Client from '../../../../tools/client';

import {
    ButtonContainer,
    ButtonRowContainer,
    CheckboxContainer,
    DeleteButton,
    InputContainer,
    MainContainer,
    ProductContent,
    UpdateInput,
    UpdateLabel,
    UpdateOption,
    UpdateSelect,
    UpdateTextarea,
} from './update-product.styles';

const client = new Client();

const UpdateProduct = ({ product, getProduct, setShowUpdate }) => {
    const [ productDefaultImage, setProductDefaultImage ] = useState('');
    const [ productProfiles, setProductProfiles ] = useState([]);
    const [ profileArr, setProfileArr ] = useState([]);

    const [ type, setType ] = useState(product.type);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ time, setTime ] = useState(product.details.time);
    const [ mother, setMother ] = useState(product.details.mother);
    const [ father, setFather ] = useState(product.details.father);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    
    const { errorToast } = useContext(ToastContext);

    useEffect(() => {
        if(product.ProductImages.length !== 0) {
            const mainImage = product.ProductImages.filter(image => image.position === 1);
            setProductDefaultImage(mainImage[0]);
        }
        const getProductProfiles = async () => {
            const res = await client.getProductProfiles();

            const tempProfileArr = [];

            res.rows.forEach(row => {
                let checked = false;
                product.profile.forEach(item => {
                    if(item === row.id) {
                        checked = true;
                    }
                });
                tempProfileArr.push({
                    id: row.id,
                    name: row.name,
                    checked
                });
            });

            setProfileArr(tempProfileArr);

            setProductProfiles(res.rows);
        }
        getProductProfiles();

        // eslint-disable-next-line
    }, []);

    const handleProductProfile = (e) => {
        const checkboxId = parseInt(e);

        for(let profile of profileArr) {
            if(profile.id === checkboxId) {
                profile.checked = !profile.checked;
            }
        }
    }

    const updateProduct = async () => {
        const productProfileArr = profileArr.map(profile => profile.id);
        const params = {
            id: product.id,
            categoryId: product.categoryId,
            type,
            name,
            description,
            time,
            mother,
            father,
            profile: productProfileArr
        };

        const updateProductRes = await client.updateProduct(params);

        if(updateProductRes.statusCode === 200) {
            await getProduct();
            setShowUpdate(false);
        } else {
            errorToast('There was an error. Please try again later.');
        }
    }

    const confirmDelete = () => {
        setShowDeleteModal(true);
    }

    const deleteProduct = async () => {
        const res = await client.deleteProduct({ id: product.id });
        if(res.status) {
            setShowDeleteModal(false);
            errorToast(res.message);
            return
        }
        
        window.location.href = '/products';
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Product'} 
                image={productDefaultImage.length !== 0 ? api + productDefaultImage.path : ''}
                message={`Are you sure you want to delete ${name}, it's inventory and all associated images forever?`} 
                action={deleteProduct} 
                actionText={'Delete'}
            />
            <ProductContent>
                <InputContainer>
                    <UpdateLabel>Name:</UpdateLabel>
                    <UpdateInput value={name} onChange={(e) => setName(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <UpdateLabel>Description:</UpdateLabel>
                    <UpdateTextarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <UpdateLabel>Type:</UpdateLabel>
                    <UpdateSelect value={type} onChange={(e) => setType(e.target.value)}>
                        <UpdateOption value={'clothing'}>Clothing</UpdateOption>
                        <UpdateOption value={'seeds'}>Seeds</UpdateOption>
                    </UpdateSelect>
                </InputContainer>
                <InputContainer>
                    <UpdateLabel>Time:</UpdateLabel>
                    <UpdateInput value={time} onChange={(e) => setTime(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <UpdateLabel>Mother:</UpdateLabel>
                    <UpdateInput value={mother} onChange={(e) => setMother(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <UpdateLabel>Father:</UpdateLabel>
                    <UpdateInput value={father} onChange={(e) => setFather(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <UpdateLabel>Profile:</UpdateLabel>
                        {productProfiles.map((item, index) => (
                            <CheckboxContainer key={index}>
                                <UpdateInput type='checkbox' defaultChecked={profileArr[index].checked} name={item.name} value={item.id} onChange={e => handleProductProfile(e.target.value)} />
                                <UpdateLabel>{item.name}</UpdateLabel>
                            </CheckboxContainer>
                        ))}
                </InputContainer>
            </ProductContent>
            <ButtonContainer>
                <DeleteButton onClick={() => confirmDelete()}>DELETE</DeleteButton>
                <ButtonRowContainer>
                    <Button onClick={() => setShowUpdate(false)}>Cancel</Button>
                    <Button onClick={() => updateProduct()}>Update</Button>
                </ButtonRowContainer>
            </ButtonContainer>
            <UpdateInventory inventories={product.Inventories} getProduct={getProduct} />
        </MainContainer>
    )
}

export default UpdateProduct;