
import Button from '../../reusable/button/button.component';

import { api, url } from '../../../config';

import {
    MainContainer
} from './category-display.styles';

const CategoryDisplay = ({ category, setShowEdit }) => {

    return (
        <MainContainer>
            <h6 onClick={() => window.location.href = `${url}/categories`}>Back to Categories</h6>
            <h2>{ category.name }</h2>
            {category.backSplashPath ?
                <img src={api + category.backSplashPath} alt='back-splash' width='800' height='300' />
            :
                <h4>No Category Back Splash Image</h4>
            }
            {category.thumbnailPath ?
                <img src={api + category.thumbnailPath} alt='thumbnail' width='200' height='200' />
            :
                <h4>No Category Thumbnail Image</h4>
            }
            <h4>Name: {category.name}</h4>
            <h4>Description: {category.description}</h4>
            <h4>Status: {category.status ? 'Active' : 'Inactive'}</h4>
            <Button onClick={() => setShowEdit(true)}>Update</Button>
        </MainContainer>
    )
}

export default CategoryDisplay;