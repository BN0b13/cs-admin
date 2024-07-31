import { useEffect, useState } from 'react';


import AddCategory from '../../components/category/add-category/add-category.component';
import CategoriesTable from '../../components/reusable/tables/categories-table/categories-table.component';
import Pagination from '../../components/reusable/pagination/pagination.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';
import Tools from '../../tools/tools';

import {
    TabContainer,
    TabSelector
} from './categories.styles';

import {
    ContentContainer,
    MainContainer,
    MainTitle,
    Option,
    Select
} from '../../styles/page.styles';

const client = new Client();
const tools = new Tools();

const CategoriesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ categories, setCategories ] = useState([]);
    const [ categoriesCount, setCategoriesCount ] = useState(null);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
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
        setCategoriesCount(res.count);
        setLoading(false);
    }

    const changeSize = (data) => {
        setSize(data);
        setPage(0);
        setLoadData(true);
    }

    const changePage = (data) => {
        setPage(data);
        setLoadData(true);
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
                    <ContentContainer>
                        <MainTitle>Categories</MainTitle>
                        <SearchBar 
                            search={search}
                            setSearch={setSearch}
                            submitSearch={setLoadData}
                        />
                        <Select value={size} onChange={(e) => changeSize(e.target.value)} maxWidth={'100px'} marginBottom={'20px'}>
                            <Option key={1} value={10}>10</Option>
                            <Option key={2} value={25}>25</Option>
                            <Option key={3} value={50}>50</Option>
                            <Option key={4} value={100}>100</Option>
                        </Select>
                        <CategoriesTable 
                            categories={categories}
                            sortKey={sortKey}
                            setSortKey={setSortKey}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            reloadTable={setLoadData}
                        />
                        <Pagination
                            count={categoriesCount}
                            size={size}
                            page={page}
                            changePage={changePage}
                        />
                    </ContentContainer>
            }
            </>
        )
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Categories</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Category</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </MainContainer>
    )
}

export default CategoriesPage;