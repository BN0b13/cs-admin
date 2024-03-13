import { url } from '../../../../config';

import {
    MainContainer,
    CompanyTable,
    CompanyTableBody,
    CompanyTableHead,
    CompanyTableHeader,
    CompanyTableRow,
    CompanyTableData,
} from "./companies-table.styles";

const CategoriesTable = ({ companies }) => {

    return (
        <MainContainer>
            <CompanyTable>
                <CompanyTableHeader>
                    <CompanyTableRow>
                        <CompanyTableHead>Name</CompanyTableHead>
                        <CompanyTableHead>Bio</CompanyTableHead>
                        <CompanyTableHead>Active</CompanyTableHead>
                    </CompanyTableRow>
                </CompanyTableHeader>
                <CompanyTableBody>
                {companies.map((company, index) => (
                        <CompanyTableRow key={index}>
                            <CompanyTableData><a href={`${url}/companies/${company.id}`}>{company.name || 'Company Not Set Up'}</a></CompanyTableData>
                            <CompanyTableData>{company.bio}</CompanyTableData>
                            <CompanyTableData>{company.active ? 'Yes' : 'No'}</CompanyTableData>
                        </CompanyTableRow>
                ))}
                </CompanyTableBody>
            </CompanyTable>
        </MainContainer>
    )
}

export default CategoriesTable;