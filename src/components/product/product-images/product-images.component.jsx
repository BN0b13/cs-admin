import { useState } from 'react';

import ImportImage from '../product-display/import-image/import-image.component';
import ProductImage from './product-image/product-image.component';
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import {
    AddImageContainer,
    ImagesGrid
} from './product-images.styles';

const client = new Client();

const ProductImages = ({ product, getProduct }) => {
    const [ loading, setLoading ] = useState(false);
    const [ images, setImages ] = useState(product.ProductImages);

    const deleteImage = async (id) => {
        setLoading(true);
        const data = { id };
        const res = await client.deleteProductImage(data);
        if(res.status === 200) {
            const newGetProduct = await getProduct();
            setImages(newGetProduct.ProductImages);
        } else {
            console.log('DELETE product image failed');
        }
        setLoading(false);
    }

    return (
        <>
            {loading ? 
                <Spinner />
            :
                <>
                    <AddImageContainer>
                        <ImportImage id={product.id} name={product.name} getProduct={getProduct} />
                    </AddImageContainer>
                    <ImagesGrid>
                        {images.map((image, index) => <ProductImage key={index} image={image} deleteImage={deleteImage} />)}
                    </ImagesGrid>
                </>
            }
        </>
    )
}

export default ProductImages;