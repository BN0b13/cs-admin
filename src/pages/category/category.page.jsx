import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AdminModal from '../../components/reusable/admin-modal/admin-modal.component';
import Button from '../../components/reusable/button/button.component';
import ProductsTable from '../../components/reusable/tables/products-table/products-table.component';
import Snackbar from '../../components/reusable/snackbar/snackbar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import { api } from '../../config';

import Client from '../../tools/client';
import { url } from '../../config';

const client = new Client();

const CategoryPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ category, setCategory ] = useState('');
    const [ products, setProducts ] = useState('');

    const [ showMsg, setShowMsg] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    useEffect(() => {
        const getCategory = async () => {
            const res = await client.getCategoryById(id);
            const categoryProducts = await client.getProductsByCategoryId(id);

            setCategory(res.rows[0]);
            setProducts(categoryProducts.rows);
            setLoading(false);
        }

        getCategory();
    }, []);

    const confirmDelete = () => {
        setShowDeleteModal(true);
    }

    const deleteCategory = async () => {
        const res = await client.deleteCategory({ id: category.id });
        console.log('Res: ', res);
        if(res.status === 403) {
            setShowDeleteModal(false);
            setMsgContent(res.message);
            setMsgType('error');
            setShowMsg(true);
            return
        }
        
        window.location.href = '/categories';
    }

    return (
        <div>
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
                category.length === 0 ?
                    <h2>No Category to Display</h2>
                :
                    <>
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
                        <h4>Status: {category.status}</h4>
                        { console.log(category)}
                        <Button onClick={() => confirmDelete()}>DELETE</Button>
                        
                        <h2>Products in Category</h2>
                        {showMsg &&
                            <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
                        }
                        <ProductsTable products={products} />
                    </>
            }
        </div>
    )
}

export default CategoryPage;