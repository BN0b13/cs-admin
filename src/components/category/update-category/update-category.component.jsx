import { useContext, useState } from 'react';

import AdminModal from '../../reusable/admin-modal/admin-modal.component';
import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';
import { api, url } from '../../../config';

import {
    ButtonContainer,
    MainContainer,
    UpdateCategoryInput,
    UpdateCategoryOption,
    UpdateCategorySelect,
    UpdateCategoryTextarea,
} from './update-category.styles';

const client = new Client();

const UpdateCategory = ({ category, setShowEdit, getCategory }) => {
    const [ name, setName ] = useState(category.name);
    const [ description, setDescription ] = useState(category.description);
    const [ type, setType ] = useState(category.type);
    const [ status, setStatus ] = useState(category.status);

    const [ loading, setLoading ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    
    const { errorToast, successToast } = useContext(ToastContext);


    const confirmDelete = () => {
        setShowDeleteModal(true);
    }

    const deleteCategory = async () => {
        const res = await client.deleteCategory({ id: category.id });
        
        if(res.status === 403) {
            setShowDeleteModal(false);
            errorToast(res.message);
            return
        }
        
        window.location.href = '/categories';
    }

    const updateCategory = async () => {
        setLoading(true);

        if(name.length === 0 ||
        description.length === 0) {
            errorToast('Please fill out all fields to update category.');
            setLoading(false);
            return
        }

        const data = {
            id: category.id,
            name,
            description,
            type,
            status
        };

        await client.updateCategory(data);

        successToast('Category Updated');
        getCategory();
        setLoading(false);
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Category'} 
                image={category.thumbnailPath ? api + category.thumbnailPath : ''}
                message={`Are you sure you want to delete ${category.name} and all associated images forever?`} 
                action={deleteCategory} 
                actionText={'Delete'}
            />
            {loading ?
                <Spinner />
            :
                <>
                    <h2>{ category.name }</h2>
                    <UpdateCategoryInput value={name} onChange={(e) => setName(e.target.value)} />
                    <UpdateCategoryTextarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    <UpdateCategorySelect value={type} onChange={(e) => setType(e.target.value)}>
                        <UpdateCategoryOption value={'clothing'}>Clothing</UpdateCategoryOption>
                        <UpdateCategoryOption value={'seeds'}>Seeds</UpdateCategoryOption>
                    </UpdateCategorySelect>
                    <UpdateCategorySelect value={status} onChange={(e) => setStatus(e.target.value)}>
                        <UpdateCategoryOption value={true}>Active</UpdateCategoryOption>
                        <UpdateCategoryOption value={false}>Inactive</UpdateCategoryOption>
                    </UpdateCategorySelect>
                    <h4>{status ? 'Active' : 'Inactive'}</h4>
                    <Button onClick={() => confirmDelete()}>DELETE</Button>
                    <ButtonContainer>
                        <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                        <Button onClick={() => updateCategory()}>Update</Button>
                    </ButtonContainer>
                    <h2>Products in Category</h2>
                </>
            }
        </MainContainer>
    )
}

export default UpdateCategory;