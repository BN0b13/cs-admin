import {
    SearchBarContainer,
    SearchButton,
    SearchInput
} from './search-bar.styles';

const SearchBar = ({
    search, 
    setSearch, 
    submitSearch
}) => {
    
    const handleKeyDown = async (e) => {
        if(e.key === 'Enter') {
            await submitSearch(true);
        }
    }

    const clear = async () => {
        setSearch('');
        submitSearch(true);
    }

    return (
        <SearchBarContainer onKeyDown={(e) => handleKeyDown(e)}>
            <SearchInput type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
            <SearchButton onClick={() => submitSearch(true)}>Search</SearchButton>
            <SearchButton onClick={() => clear()}>Clear</SearchButton>
        </SearchBarContainer>
    )
}

export default SearchBar;