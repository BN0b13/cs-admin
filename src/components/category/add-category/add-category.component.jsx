import { useState } from 'react';

import Spinner from '../../reusable/spinner/spinner.component';
import Toasted from '../../reusable/toasted/toasted.component';

import Client from '../../../tools/client';

import { productTypes, url } from '../../../config';

import {
    AddCategoryButton,
    AddCategoryContainer,
    AddCategoryInput,
    AddCategoryLabel,
    AddCategoryOption,
    AddCategorySelector,
    AddCategoryTextarea,
    AddCategorySubtitle,
    AddCategoryTitle,
    NewCategoryContainer,
} from './add-category.styles';

const client = new Client();

const AddCategory = () => {
    const [ loading, setLoading ] = useState(false);
    const [ thumbnail, setThumbnail ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ type, setType ] = useState('');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const addCategory = async () => {
        if(name === '' || 
        description === '' || 
        type === '') {
            errorToast('Please fill out all fields.');
            return;
        }
        setLoading(true);

        let formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('files', thumbnail);
        formData.append('motherProductId', null);
        formData.append('fatherProductId', null);

        const res = await client.createCategory(formData);

        if(res) {
            return window.location.href = `${url}/categories/${res.id}`;
        }

        errorToast('There was an error creating category. Please try again.');
        setLoading(false);
    }

    return (
        <AddCategoryContainer>
            <AddCategoryTitle>Add New Category</AddCategoryTitle>
            {loading ?
                <Spinner />
            :
                <NewCategoryContainer>
                    {imagePreview && <img src={imagePreview} width='300' height='300' alt='Category Preview' />}
                    <AddCategoryLabel>Thumbnail:
                        <AddCategoryInput type='file' accept='image/*' name='thumbnail' onChange={e => handleFileChange(e)} />
                    </AddCategoryLabel>
                    <AddCategoryInput type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    <AddCategoryTextarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <AddCategorySubtitle>Category Type: </AddCategorySubtitle>
                    <AddCategorySelector name='product-type' onChange={(e) => setType(e.target.value)} defaultValue={''}>
                        <AddCategoryOption key={0}  disabled value={''}> -- select an option -- </AddCategoryOption>
                        {productTypes.map((item, index) => (
                                <AddCategoryOption key={index + 1} value={item.type}>{item.type}</AddCategoryOption>
                        ))}
                    </AddCategorySelector>
                    <AddCategoryButton onClick={() => addCategory()}>Add Category</AddCategoryButton>
                </NewCategoryContainer>
            }
            <Toasted 
                message={toastMessage}
                showToast={showToast}
                setShowToast={setShowToast}
                getToasted={getToasted}
                error={toastError}
            />
        </AddCategoryContainer>
    )
}

export default AddCategory;