import { useEffect, useState } from 'react';


import AddCategory from '../../components/category/add-category/add-category.component';
import CategoriesTable from '../../components/reusable/tables/categories-table/categories-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    TabContainer,
    TabSelector
} from './categories.styles';

const client = new Client();

const CategoriesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState(null);

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await client.getCategories();
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
                    <CategoriesTable categories={categories} />
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