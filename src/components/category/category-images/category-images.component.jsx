

import { api } from "../../../config";

import Client from "../../../tools/client";

import {
    MainContainer,
    ImagesContainer,
    CategoryImage
} from './category-images.styles';

const client = new Client();

const CategoryImages = ({ category }) => {


    const addCategoryThumbnail = async () => {
        console.log('Add Category Thumbnail hit');
    }

    const addCategoryBackSplash = async () => {
        console.log('Add Category Back Splash hit');
    }

    return (
        <MainContainer>
            <ImagesContainer>
                {/* <CategoryImage src={} alt={} /> */}
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
            </ImagesContainer>
        </MainContainer>
    )
}

export default CategoryImages;