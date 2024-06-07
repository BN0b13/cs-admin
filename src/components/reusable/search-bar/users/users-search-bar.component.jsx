import { useState } from 'react';

import Client from '../../../../tools/client';

import {
    SearchBarContainer,
    SearchButton,
    SearchInput
} from '../search-bar.styles'

const client = new Client();

const UserSearchBar = ({ setSearchResults }) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    
    const handleKeyDown = async (e) => {
        if(e.key === 'Enter') {
            await submitSearch();
        }
    }

    const submitSearch = async () => {
        if(searchTerm === '') {
            return
        }

        const params = `?search=${searchTerm}&page=${page}&size=${size}`

        const res = await client.searchAccounts(params);

        setSearchResults(res.rows);
    }

    return (
        <SearchBarContainer onKeyDown={(e) => handleKeyDown(e)}>
            <SearchInput type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <SearchButton onClick={() => submitSearch()}>Search</SearchButton>
        </SearchBarContainer>
    )
}

export default UserSearchBar;