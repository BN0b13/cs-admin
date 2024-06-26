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
    const [ loadData, setLoadData ] = useState(true);
    const [ categories, setCategories ] = useState([]);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(100);
    const [ search, setSearch ] = useState('');
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if(loadData) {
            getCategories();
            setLoadData(false);
        }
    }, [ loadData ]);

    const getCategories = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        search && (query = query + `&search=${search}`);
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getCategories(query);
        setCategories(res.rows);
        setLoading(false);
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
                        <SearchBar 
                            search={search}
                            setSearch={setSearch}
                            submitSearch={setLoadData}
                        />
                        <CategoriesTable 
                            categories={categories}
                            sortKey={sortKey}
                            setSortKey={setSortKey}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            reloadTable={setLoadData}
                        />
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