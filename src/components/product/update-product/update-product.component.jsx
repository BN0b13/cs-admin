import { useEffect, useState } from 'react';

import AdminModal from '../../reusable/admin-modal/admin-modal.component';
import Button from '../../reusable/button/button.component';
import Snackbar from '../../reusable/snackbar/snackbar.component';

import { convertProductPrice } from '../../../tools/tools';
import { api,url } from '../../../config';

import Client from '../../../tools/client';

import {
    ButtonContainer,
    CheckboxContainer,
    InputContainer,
    InventoryContent,
    MainContent,
    MainContainer,
    MainSubtitle,
    MainText,
    MainTitle,
    ProductContent,
    UpdateImage,
    UpdateInput,
    UpdateLabel,
    UpdateOption,
    UpdateSelect,
    UpdateTextarea
} from './update-product.styles';

const client = new Client();

const UpdateProduct = ({ product, getProduct }) => {
    const [ productDefaultImage, setProductDefaultImage ] = useState('');
    const [ productProfiles, setProductProfiles ] = useState([]);
    const [ profileArr, setProfileArr ] = useState([]);

    const [ categoryId, setCategoryId ] = useState(product.categoryId);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ type, setType ] = useState(product.type);
    const [ time, setTime ] = useState(product.time);
    const [ mother, setMother ] = useState(product.mother);
    const [ father, setFather ] = useState(product.father);
    const [ sex, setSex ] = useState(product.sex);
    const [ price, setPrice ] = useState(product.price);
    const [ productInventoryId, setProductInventoryId ] = useState(product.Inventories[0].id);
    const [ quantity, setQuantity ] = useState(product.Inventories[0].quantity);
    const [ size, setSize ] = useState(product.Inventories[0].size);
    const [ sku, setSku ] = useState(product.Inventories[0].sku);
    const [ address, setAddress ] = useState(product.Inventories[0].address);
    const [ bay, setBay ] = useState(product.Inventories[0].bay);
    const [ available, setAvailable ] = useState(product.Inventories[0].available);

    const [ showMsg, setShowMsg] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ priceDisplay, setPriceDisplay ] = useState(convertProductPrice(product.price));

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
    }, []);
    
    const updatePrice = (amount) => {
        setPriceDisplay(convertProductPrice(amount));
        setPrice(amount);
    }

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
            categoryId,
            name,
            description,
            type,
            time,
            mother,
            father,
            profile: productProfileArr,
            sex,
            price,
            productInventoryId,
            quantity,
            size,
            sku,
            address,
            bay,
            available
        };


        const updateProductRes = await client.updateProduct(params);

        console.log('Update Product res: ', updateProductRes);

        getProduct();
    }

    const confirmDelete = () => {
        setShowDeleteModal(true);
    }

    const deleteProduct = async () => {
        const res = await client.deleteProduct({ id: product.id });
        if(res.status) {
            setShowDeleteModal(false);
            setMsgContent(res.message);
            setMsgType('error');
            setShowMsg(true);
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
            <MainTitle>Update Product</MainTitle>
            {productDefaultImage.length !== 0 &&
                <UpdateImage src={api + productDefaultImage.path} />
            }
            <MainContent>
                <ProductContent>
                    <MainSubtitle>Product</MainSubtitle>
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
                        <UpdateInput value={type} onChange={(e) => setType(e.target.value)} />
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
                    <InputContainer>
                        <UpdateLabel>Sex:</UpdateLabel>
                        <UpdateInput value={sex} onChange={(e) => setSex(e.target.value)} />
                    </InputContainer>
                    <MainSubtitle>{ priceDisplay }</MainSubtitle>
                    <InputContainer>
                        <UpdateLabel>Price:</UpdateLabel>
                        <UpdateInput value={price} onChange={(e) => updatePrice(e.target.value)} />
                    </InputContainer>
                </ProductContent>
                <InventoryContent>
                    <MainSubtitle>Product Inventory</MainSubtitle>
                    <InputContainer>
                        <UpdateLabel>Quantity:</UpdateLabel>
                        <UpdateInput type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                    <UpdateLabel>Size:</UpdateLabel>
                    <UpdateSelect defaultValue={product.Inventories[0].size} onChange={(e) => setSize(e.target.value)}>
                        <UpdateOption value={'6 seeds'}>Half Pack</UpdateOption>
                        <UpdateOption value={'12 seeds'}>Full Pack</UpdateOption>
                    </UpdateSelect>
                    </InputContainer>
                    <InputContainer>
                        <UpdateLabel>Sku:</UpdateLabel>
                        <UpdateInput value={sku} onChange={(e) => setSku(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <UpdateLabel>Address:</UpdateLabel>
                        <UpdateInput value={address} onChange={(e) => setAddress(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <UpdateLabel>Bay:</UpdateLabel>
                        <UpdateInput value={bay} onChange={(e) => setBay(e.target.value)} />
                    </InputContainer>
                    {/* <InputContainer>
                        <UpdateLabel>Available:</UpdateLabel>
                        <UpdateSelect onChange={(e) => setAvailable(e.target.value)}>
                            <UpdateOption value={true}>True</UpdateOption>
                            <UpdateOption value={false}>False</UpdateOption>
                        </UpdateSelect>
                    </InputContainer> */}
                    <ButtonContainer>
                        <Button onClick={() => confirmDelete()}>DELETE</Button>
                        <Button onClick={() => updateProduct()}>UPDATE PRODUCT</Button>
                        {showMsg &&
                            <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
                        }
                    </ButtonContainer>
                </InventoryContent>
            </MainContent>
        </MainContainer>
    )
}

export default UpdateProduct;