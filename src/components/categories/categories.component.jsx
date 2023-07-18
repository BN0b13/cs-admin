import { useEffect, useState } from 'react';

import AddCategory from '../add-category/add-category.component';
import Spinner from '../spinner/spinner.component';

import Client from '../../tools/client';

import { 
    MainContainer,
    CategoriesTitle,
    CategoryTable,
    CategoryTableBody,
    CategoryTableHead,
    CategoryTableHeader,
    CategoryTableRow,
    CategoryTableData,
} from "./categories.styles";

const client = new Client();

const Categories = () => {
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState('');
    const [ productTypes, setProductTypes ] = useState('');

    useEffect(() => {
        const getProductTypes = async () => {
            const res = await client.getProductTypes();

            setProductTypes(res.rows);

            getCategories();
        }
        getProductTypes();
    }, []);

    const getCategories = async () => {
        const getCategoriesRes = await client.getCategoriesWithoutAssociations();

        setCategories(getCategoriesRes.rows);

        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <AddCategory getCategories={getCategories} productTypes={productTypes} />
                    <CategoriesTitle>Current Categories</CategoriesTitle>
                    <CategoryTable>
                        <CategoryTableHeader>
                            <CategoryTableRow>
                                <CategoryTableHead>Name</CategoryTableHead>
                                <CategoryTableHead>Description</CategoryTableHead>
                                <CategoryTableHead>Type</CategoryTableHead>
                            </CategoryTableRow>
                        </CategoryTableHeader>
                        <CategoryTableBody>
                        {categories.map((category, index) => (
                                <CategoryTableRow key={index}>
                                    <CategoryTableData>{category.name}</CategoryTableData>
                                    <CategoryTableData>{category.description}</CategoryTableData>
                                    <CategoryTableData>{category.type}</CategoryTableData>
                                </CategoryTableRow>
                        ))}
                        </CategoryTableBody>
                    </CategoryTable>
                </>
            }
        </MainContainer>
    )
}

export default Categories;