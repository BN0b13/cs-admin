import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductData from '../../components/product/product-data/product-data.component';
import ProductImages from '../../components/product/product-images/product-images.component';
import ProductInventory from '../../components/product/product-inventory/product-inventory.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import ClientHelper from '../../tools/client-helper';
import { url } from '../../config';

import {
    BackLink,
    ContentContainer,
    MainContainer,
    MainTitle
} from '../../styles/page.styles';

const clientHelper = new ClientHelper();

const ProductPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ product, setProduct ] = useState('');

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        setLoading(true);
        const res = await clientHelper.getProductById(id);

        if(res.statusCode === 200) {
            setProduct(res.data);
        }

        setLoading(false);

        return res.data;
    }

    // display

    // product images - main image, gallery and add/delete image

    // product data - update and delete product

    // product inventory - current inventory, add, update and delete inventory.

    return (
        <MainContainer>
            <BackLink onClick={() => window.location.href = `${url}/Products`}>
                Back To Products
            </BackLink>
            {loading ?
                <Spinner />
            :
                product.length === 0 ?
                    <MainTitle>No Product to Display</MainTitle>
                :
                    <ContentContainer>
                        <ProductImages product={product} getProduct={getProduct} />
                        <ProductData product={product} getProduct={getProduct} />
                        <ProductInventory inventories={product.Inventories} />
                    </ContentContainer>
            }
        </MainContainer>
    )
}

export default ProductPage;