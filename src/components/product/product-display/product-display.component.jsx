import { useEffect, useParams, useState } from 'react';

import AddProductInventory from '../add-product-inventory/add-product-inventory.component';
import ImportImage from './import-image/import-image.component';
import Spinner from '../../reusable/spinner/spinner.component';
import Snackbar from '../../reusable/snackbar/snackbar.component';

import Client from '../../../tools/client';
import { api, url } from '../../../config';

import {
    ProductButtonContainer,
    ProductContainer,
    ProductDescriptionText,
    ProductDisplayContainer,
    ProductImage,
    ProductInformation,
    ProductInput,
    ProductLabel,
    ProductsLink,
    ProductSubtext,
    ProductText,
    ProductTextArea,
    UpdateButtonContainer,
    UpdateInputContainer,
    UpdateProductContainer
} from './product-display.styles';

const client = new Client();

const ProductDisplay = ({ product, getProduct }) => {
    const [ loading, setLoading ] = useState('');
    const [ images, setImages ] = useState('');

    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);

    const [ messageType, setMessageType ] = useState(null);
    const [ messageContents, setMessageContents ] = useState('');
    const [ showEdit, setShowEdit ] = useState(false);
    const [ showMessage, setShowMessage ] = useState(false);

    useEffect(() => {

        product.ProductImages.sort((a, b) => a.position - b.position);

        setImages(product.ProductImages);
        setLoading(false);
    }, [ product ]);

    const message = (message, type = null) => {
        setMessageType(type);
        setMessageContents(message);
        setShowMessage(true);
    }

    const productDisplayContents = () => {
        return (
            
                <ProductInformation>
                    <ProductText>Name: {product.name}</ProductText>
                    <ProductText>Type: {product.type}</ProductText>
                    <ProductDescriptionText>Description: {product.description}</ProductDescriptionText>
                    <ProductSubtext>Lineage: {product.details.mother} x {product.details.father}</ProductSubtext>
                    <ProductSubtext>Time: {product.details.time}</ProductSubtext>
                    <ProductButtonContainer>
                        {showMessage && 
                            <Snackbar type={messageType} msg={messageContents} show={() => setShowMessage(false)} />
                        }
                    </ProductButtonContainer>
                </ProductInformation>
        )
    }

    return (
        <ProductDisplayContainer>
            <ProductsLink onClick={() => window.location.href = `${url}/Products`}>
                Back To Products
            </ProductsLink>
            {loading ? 
                <Spinner />
            :
                <>
                    <ProductContainer>
                        <ProductImage>
                            {images.length === 0 ?
                                <ImportImage id={product.id} name={product.name} getProduct={getProduct} />
                                :
                                images.length === 1 ?
                                <img src={`${api}${images[0].path}`} alt={images[0].name} height='300' width='300' />
                                :
                                images.map((image, index) => (
                                    <img key={index} src={`${api}${image.path}`} alt={`${image.name}`} height='100' width='100' />
                                    ))
                                }
                        </ProductImage>

                        { productDisplayContents() }

                    </ProductContainer>
                    <AddProductInventory />
                </>
            }
        </ProductDisplayContainer>
    )
}

export default ProductDisplay;