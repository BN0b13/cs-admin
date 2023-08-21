import { useEffect, useState } from 'react';

import AdminModal from '../../reusable/admin-modal/admin-modal.component';
import Button from '../../reusable/button/button.component';
import ProductInventory from '../product-inventory/product-inventory.component';
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
    UpdateTextarea,
} from './update-product.styles';

const client = new Client();

const UpdateProduct = ({ product, getProduct }) => {
    console.log('Product: ', product);
    const [ productDefaultImage, setProductDefaultImage ] = useState('');
    const [ productProfiles, setProductProfiles ] = useState([]);
    const [ profileArr, setProfileArr ] = useState([]);

    const [ categoryId, setCategoryId ] = useState(product.categoryId);
    const [ type, setType ] = useState(product.type);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ time, setTime ] = useState(product.details.time);
    const [ mother, setMother ] = useState(product.details.mother);
    const [ father, setFather ] = useState(product.details.father);
    
    const [ productInventoryId, setProductInventoryId ] = useState(product.Inventories[0].id);
    const [ inventoryType, setInventoryType ] = useState(product.Inventories[0].type);
    const [ price, setPrice ] = useState(product.Inventories[0].price);
    const [ quantity, setQuantity ] = useState(product.Inventories[0].quantity);
    const [ size, setSize ] = useState(product.Inventories[0].size);
    const [ sizeDescription, setSizeDescription ] = useState(product.Inventories[0].sizeDescription);
    const [ sku, setSku ] = useState(product.Inventories[0].sku);
    const [ address, setAddress ] = useState(product.Inventories[0].address);
    const [ bay, setBay ] = useState(product.Inventories[0].bay);

    const [ showMsg, setShowMsg] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

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

    const handleProductProfile = (e) => {
        const checkboxId = parseInt(e);

        for(let profile of profileArr) {
            if(profile.id === checkboxId) {
                profile.checked = !profile.checked;
            }
        }
    }

    const handleInventoryUpdateDisplay = (index) => {
        setProductInventoryId(product.Inventories[index].id);
        setPrice(product.Inventories[index].price);
        setQuantity(product.Inventories[index].quantity);
        setSize(product.Inventories[index].size);
        setSizeDescription(product.Inventories[index].sizeDescription);
        setSku(product.Inventories[index].sku);
        setAddress(product.Inventories[index].address);
        setBay(product.Inventories[index].bay);
    }

    const updateProduct = async () => {
        const productProfileArr = profileArr.map(profile => profile.id);
        const params = {
            id: product.id,
            categoryId,
            type,
            name,
            description,
            time,
            mother,
            father,
            profile: productProfileArr,
            inventoryType,
            productInventoryId,
            price,
            quantity,
            size,
            sizeDescription,
            sku,
            address,
            bay
        };


        const updateProductRes = await client.updateProduct(params);

        if(updateProductRes.status === 200) {
            setMsgContent('Product Updated');
            setMsgType('success');
            setShowMsg(true);
            getProduct();
        } else {
            setMsgContent('There was an error. Please try again later.');
            setMsgType('error');
            setShowMsg(true);
        }
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
                    <InputContainer>
                        <UpdateLabel>Inventory Type:</UpdateLabel>
                        <UpdateSelect value={inventoryType} onChange={(e) => setInventoryType(e.target.value)}>
                            <UpdateOption value={'feminized'}>Feminized</UpdateOption>
                            <UpdateOption value={'regular'}>Regular</UpdateOption>
                        </UpdateSelect>
                    </InputContainer>
                    <MainSubtitle>{ `$${price / 100}` }</MainSubtitle>
                    <InputContainer>
                        <UpdateLabel>Price:</UpdateLabel>
                        <UpdateInput value={price} onChange={(e) => setPrice(e.target.value)} />
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
                    <UpdateSelect value={product.Inventories[0].size} onChange={(e) => setSize(e.target.value)}>
                        <UpdateOption value={'Half Pack'}>Half Pack</UpdateOption>
                        <UpdateOption value={'Full Pack'}>Full Pack</UpdateOption>
                    </UpdateSelect>
                    </InputContainer>
                    <InputContainer>
                    <UpdateLabel>Size Description:</UpdateLabel>
                        <UpdateInput type='text' value={sizeDescription} onChange={(e) => setSizeDescription(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <UpdateLabel>Sku:</UpdateLabel>
                        <UpdateInput value={sku} onChange={(e) => setSku(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <UpdateLabel>Address:</UpdateLabel>
                        {/* <UpdateInput value={address} onChange={(e) => setAddress(e.target.value)} /> */}
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
            <ProductInventory inventories={product.Inventories} handleInventoryUpdateDisplay={handleInventoryUpdateDisplay} />
        </MainContainer>
    )
}

export default UpdateProduct;