
import Button from '../../reusable/button/button.component';

import { api, url } from '../../../config';

import {
    MainContainer
} from './category-display.styles';

const CategoryDisplay = ({ category, setShowEdit }) => {

    return (
        <MainContainer>
            <h2>{ category.name }</h2>
            <h4>Name: {category.name}</h4>
            <h4>Description: {category.description}</h4>
            <h4>Status: {category.status ? 'Active' : 'Inactive'}</h4>
            <Button onClick={() => setShowEdit(true)}>Update</Button>
        </MainContainer>
    )
}

export default CategoryDisplay;