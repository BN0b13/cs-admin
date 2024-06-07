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
                        <UserTableHead>Username</UserTableHead>
                        <UserTableHead>Name</UserTableHead>
                        <UserTableHead>Join Date</UserTableHead>
                    </UserTableRow>
                </UserTableHeader>
                <UserTableBody>
                {users.map((user, index) => {
                    const formattedDate = new Date(user.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                    
                    return (
                        <UserTableRow key={index} onClick={() => window.location = `${url}/accounts/${user.id}`} pointer={true}>
                            <UserTableData>{user.email}</UserTableData>
                            <UserTableData>{user.username}</UserTableData>
                            <UserTableData>{user.firstName} {user.lastName}</UserTableData>
                            <UserTableData>{formattedDate}</UserTableData>
                        </UserTableRow>
                )})}
                </UserTableBody>
            </UserTable>
        </MainContainer>
)

export default UsersTable;