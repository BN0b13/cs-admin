import { api } from '../../../../config';

import {
    MainContainer,
    ProductImg
} from './product-image.styles';

const ProductImage = ({ image, deleteImage }) => {

    return (
        <MainContainer>
            <ProductImg src={api + image.path} />
            <button onClick={() => deleteImage(image.id)}>DELETE</button>
        </MainContainer>
    )
}

export default ProductImage;