import { url } from '../../../../config';

import { 
    MainContainer,
    UserTable,
    UserTableBody,
    UserTableHead,
    UserTableHeader,
    UserTableRow,
    UserTableData
} from "./users-table.styles";

const UsersTable = ({ users }) => (
        <MainContainer>
            <UserTable>
                <UserTableHeader>
                    <UserTableRow>
                        <UserTableHead>Email</UserTableHead>
                        <UserTableHead>Name</UserTableHead>
                        <UserTableHead>Phone</UserTableHead>
                        <UserTableHead>Join Date</UserTableHead>
                    </UserTableRow>
                </UserTableHeader>
                <UserTableBody>
                {users.map((user, index) => {
                    const formattedDate = new Date(user.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                    
                    return (
                        <UserTableRow key={index}>
                            <UserTableData><a href={`${url}/accounts/${user.id}`}>{user.email}</a></UserTableData>
                            <UserTableData>{user.firstName} {user.lastName}</UserTableData>
                            <UserTableData>{user.phone}</UserTableData>
                            <UserTableData>{formattedDate}</UserTableData>
                        </UserTableRow>
                )})}
                </UserTableBody>
            </UserTable>
        </MainContainer>
)

export default UsersTable;