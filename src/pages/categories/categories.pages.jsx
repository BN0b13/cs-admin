import { useEffect, useState } from 'react';


import AddCategory from '../../components/category/add-category/add-category.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import CategoriesTable from '../../components/reusable/tables/categories-table/categories-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';
import Tools from '../../tools/tools';

import {
    TabContainer,
    TabSelector
} from './categories.styles';

import {
    MainTitle
} from '../../styles/page.styles';

const client = new Client();
const tools = new Tools();

const CategoriesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState([]);

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

    const getCategories = async () => {
        const res = await client.getCategories();
        sortCategories(res.rows);
    }

    const sortCategories = (categories) => {
        setLoading(true);
        const sortedCategories = tools.sortByDateAscending(categories);
        setCategories(sortedCategories);
        setLoading(false);
    }

    const setSearchResults = async (params) => {
        const res = await client.searchCategories(params);
        sortCategories(res.rows);
        
    }

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
    }

    const showCurrentTab = () => {
        if(currentTab === 2) {
            return (
                <AddCategory />
            )
        }

        return (
            <>
                {loading ?
                    <Spinner />
                :
                    <>
                        <MainTitle>Categories</MainTitle>
                        <SearchBar setSearchResults={setSearchResults} clearSearchResults={getCategories} />
                        <CategoriesTable categories={categories} />
                    </>
                }
            </>
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Categories</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Category</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default CategoriesPage;