import { useState } from 'react';

import Button from '../../reusable/button/button.component';

import { api } from "../../../config";

import Client from "../../../tools/client";

import {
    CategoryImage,
    ImagesContainer,
    ImageFileInput,
    ImagePlaceholder,
    MainContainer,
    MainTitle
} from './category-images.styles';

const client = new Client();

const CategoryImages = ({ category }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const addCategoryImage = async () => {
        if(image === '') {
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('id', category.id);

        const res = await client.addCategoryImage(formData);

        setImage('');
        setImagePreview('');
        setFileInput('');
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
            {imagePreview ? 
                    <img src={imagePreview} width='200px' height='200px' />    
                :
                <>
                    <ImagePlaceholder />
                    <MainTitle>Add Product Image</MainTitle>
                </>
                }
                <ImageFileInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
            <Button onClick={() => addCategoryImage()}>Add Thumbnail</Button>
        </MainContainer>
    )
}

export default CategoryImages;