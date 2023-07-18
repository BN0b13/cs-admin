import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductsTable from '../../components/products-table/products-table.component';
import Spinner from '../../components/spinner/spinner.component';

import { api } from '../../config';

import Client from '../../tools/client';
import { url } from '../../config';

const client = new Client();

const CategoryPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ category, setCategory ] = useState('');
    const [ products, setProducts ] = useState('');

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

    const categoryDisplay = () => {

        return (
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

                <h2>Products in Category</h2>
                <ProductsTable products={products} />
            </>
        )
    }

    return (
        <div>
            {loading ?
                <Spinner />
            :
                category.length === 0 ?
                    <h2>No Category to Display</h2>
                :
                    categoryDisplay()
            }
        </div>
    )
}

export default CategoryPage;