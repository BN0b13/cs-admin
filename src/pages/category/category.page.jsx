import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CategoryDisplay from '../../components/category/category-display/category-display.component';
import CategoryImages from '../../components/category/category-images/category-images.component';
import ProductsTable from '../../components/reusable/tables/products-table/products-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateCategory from '../../components/category/update-category/update-category.component';

import Client from '../../tools/client';
import { url } from '../../config';

const client = new Client();

const CategoryPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ category, setCategory ] = useState('');
    const [ products, setProducts ] = useState('');

    const [ showEdit, setShowEdit ] = useState(false);

    useEffect(() => {
        getCategory();

        // eslint-disable-next-line
    }, []);

    const getCategory = async () => {
        const res = await client.getCategoryById(id);
        const categoryProducts = await client.getProductsByCategoryId(id);

        setCategory(res.rows[0]);
        setProducts(categoryProducts.rows);
        setLoading(false);
    }

    const categoryContent = () => {
        if(showEdit) {
            return <UpdateCategory category={category} setShowEdit={setShowEdit} getCategory={getCategory} />
        }

        return <CategoryDisplay category={category} setShowEdit={setShowEdit} />
    }

    return (
        <div>
            <h6 onClick={() => window.location.href = `${url}/categories`}>Back to Categories</h6>
            {loading ?
                <Spinner />
            :
                category.length === 0 ?
                    <h2>No Category to Display</h2>
                :
                    <>
                        <CategoryImages category={category} />
                        { categoryContent() }
                        <ProductsTable products={products} />
                    </>
            }
        </div>
    )
}

export default CategoryPage;