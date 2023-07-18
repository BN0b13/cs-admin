import { useEffect, useState } from 'react';

import AddCategory from '../add-category/add-category.component';
import Spinner from '../spinner/spinner.component';

import { url } from '../../config';

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
} from "./categories-table.styles";

const client = new Client();

const CategoriesTable = () => {
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState('');

    useEffect(() => {
        getCategories();
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
                    <CategoriesTitle>Categories</CategoriesTitle>
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
                                    <CategoryTableData><a href={`${url}/categories/${category.id}`}>{category.name}</a></CategoryTableData>
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

export default CategoriesTable;