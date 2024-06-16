import {
    ColumnContainer,
    Label,
    Option,
    Select
} from '../../../styles/component.styles';

const Filter = ({ filterOptions = [], filterName = 'filter', setFilter = () => {} }) => {

    return (
        <ColumnContainer padding={'0 0 20px 0'}>
            <Label>{filterName}</Label>
            <Select onChange={(e) => setFilter(e.target.value)} placeholder={filterName} >
                <Option key={0} value={''} default>All</Option>
                {filterOptions.length === 0 ?
                    <Option key={1} value=''>No Filter Options</Option>
                :
                    filterOptions.map((option, index) => (
                        <Option key={index + 1} value={option.role}>{option.role}</Option>
                    ))
                }
            </Select>
        </ColumnContainer>
    )
}

export default Filter;