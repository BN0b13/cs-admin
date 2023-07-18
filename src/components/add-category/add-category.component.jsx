import { useState } from 'react';

import Snackbar from '../snackbar/snackbar.component';

import Client from '../../tools/client';

import {
    AddCategoryButton,
    AddCategoryContainer,
    AddCategoryInput,
    AddCategoryLabel,
    AddCategoryOption,
    AddCategorySelector,
    AddCategoryTextarea,
    AddCategoryTitle,
    NewCategoryContainer,
} from './add-category.styles';

const client = new Client();

const AddCategory = ({ getCategories, productTypes }) => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ type, setType ] = useState('');
    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');

    const addCategory = async () => {
        if(name === '' || description === '' || type === '') {
            setMsgContent('Please fill out all fields.');
            setMsgType('error');
            setShowMsg(true);
            return;
        }

        const params = {
            name,
            description,
            type
        }

        await client.createCategory(params);

        setMsgContent('Category created successfully.');
        setMsgType('success');
        setShowMsg(true);
        setName('');
        setDescription('');
        setType('');

        getCategories();
    }

    return (
        <AddCategoryContainer>
            <AddCategoryTitle>Add New Category</AddCategoryTitle>
            <NewCategoryContainer>
                <AddCategoryInput type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                <AddCategoryTextarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <AddCategoryLabel htmlFor='product-type'>Category Type: </AddCategoryLabel>
                <AddCategorySelector name='product-type' onChange={(e) => setType(e.target.value)} defaultValue={''}>
                    <AddCategoryOption key={0}  disabled value={''}> -- select an option -- </AddCategoryOption>
                    {productTypes.map((item, index) => (
                            <AddCategoryOption key={index + 1} value={item.type}>{item.type}</AddCategoryOption>
                    ))}
                </AddCategorySelector>
                {showMsg &&
                    <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
                }
                <AddCategoryButton onClick={() => addCategory()}>Add Category</AddCategoryButton>
            </NewCategoryContainer>
        </AddCategoryContainer>
    )
}

export default AddCategory;