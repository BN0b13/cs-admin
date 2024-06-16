import { useState } from 'react';

import {
    SearchBarContainer,
    SearchButton,
    SearchInput
} from './search-bar.styles';

const SearchBar = ({ setSearchResults, clearSearchResults }) => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    
    const handleKeyDown = async (e) => {
        if(e.key === 'Enter') {
            await submit();
        }
    }

    const submit = async () => {
        if(searchTerm === '') {
            return
        }

        const params = `?search=${searchTerm}&page=${page}&size=${size}`

        setSearchResults(params);
    }

    const clear = () => {
        setSearchTerm('');
        clearSearchResults();
    }

    return (
        <SearchBarContainer onKeyDown={(e) => handleKeyDown(e)}>
            <SearchInput type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <SearchButton onClick={() => submit()}>Search</SearchButton>
            <SearchButton onClick={() => clear()}>Clear</SearchButton>
        </SearchBarContainer>
    )
}

export default SearchBar;