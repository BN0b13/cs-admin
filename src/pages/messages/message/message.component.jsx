

import { formatDate } from '../../../tools/tools';

import {
    MessageIconContainer,
    MessageTableData
} from './message.style';

const Message = ({ message }) => (
    <>
        <MessageTableData>
            { message.status === 'new' ? 
                'New' 
            : 
                'Read'
            }
        </MessageTableData>
        <MessageTableData>{ message.replied ? 'Yes' : 'No' }</MessageTableData>
        <MessageTableData>{ `${message.firstName} ${message.lastName}` }</MessageTableData>
        <MessageTableData>{ formatDate(message.createdAt) }</MessageTableData>

    </>
);

export default Message;