import { useEffect, useState } from 'react';

import AddSeedProduct from './add-seed-product/add-seed-product.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { productTypes } from '../../../config';

import Client from '../../../tools/client';

import {
    AddProductContainer,
    AddProductCategoryLabel,
    AddProductCategorySelector,
    AddProductCategoryOption,
    AddProductSubtitle,
    AddProductText,
    AddProductTitle,
    CategoryContainer
} from './add-product.styles';

const client = new Client();

const AddProduct = () => {
    const [ loading, setLoading ] = useState(true);
    const [ productType, setProductType ] = useState('');
    const [ categories, setCategories ] = useState('');
    const [ categoryOptions, setCategoryOptions ] = useState([]);
    const [ category, setCategory ] = useState('');
    

    useEffect(() => {
        getCategories();
    }, []);

    const selectProductType = (productType) => {
        setProductType(productType);
        setCategory('');

        const currentCategoryOptions = categories.filter(category => category.type === productType);

        setCategoryOptions(currentCategoryOptions);
    }

    const getCategories = async () => {
        const res = await client.getCategories();

        setCategories(res.rows);
        setLoading(false);
    }

    const productInputs = () => {
        if(productType === 'seeds') {
            return (<AddSeedProduct category={category} productType={productType} />)
        }

        if(productType === 'clothing') {
            return
        }
    }

    return (
        <AddProductContainer>
            {loading ?
                    <Spinner />
                :
                    <>
                        <AddProductTitle>Add New Product</AddProductTitle>
                                {categories.length === 0 ?
                                    <AddProductText>No Categories available. Please add a category to create products</AddProductText>
                                :
                        <CategoryContainer>
                            <AddProductSubtitle>Select Product Type</AddProductSubtitle>
                                <AddProductCategoryLabel htmlFor='product-type'>Product Type: </AddProductCategoryLabel>
                                <AddProductCategorySelector name='product-type' onChange={(e) => selectProductType(e.target.value)} defaultValue={''}>
                                    <AddProductCategoryOption key={0}  disabled value={''}> -- select an option -- </AddProductCategoryOption>
                                    {productTypes.map((item, index) => (
                                            <AddProductCategoryOption key={index + 1} value={item.type}>{item.type}</AddProductCategoryOption>
                                    ))}
                                </AddProductCategorySelector>
                            {productType && categoryOptions ?
                                    categoryOptions.length === 0 ?
                                        <AddProductText>No Categories available matching product type. Please add a category with the desired type to create products</AddProductText>
                                    :
                                        <>
                                            <AddProductSubtitle>Select Product's Category</AddProductSubtitle>
                                            <AddProductCategoryLabel htmlFor='categories'>Category: </AddProductCategoryLabel>
                                            <AddProductCategorySelector name='categories' onChange={(e) => setCategory(e.target.value)} defaultValue={0}>
                                                <AddProductCategoryOption key={0}  disabled value={0}> -- select an option -- </AddProductCategoryOption>
                                                {categories.map((item, index) => (
                                                        <AddProductCategoryOption key={index + 1} value={item.id}>{item.name}</AddProductCategoryOption>
                                                ))}
                                            </AddProductCategorySelector>
                                        </>
                                    
                                :
                                    <></>
                                }
                        </CategoryContainer>
                                }

                        {category && productType ?
                            productInputs()
                        :
                            <></>
                        }
                    </>
        }
        </AddProductContainer>
    )
}

export default AddProduct;