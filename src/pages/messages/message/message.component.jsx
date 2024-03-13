import Tools from '../../../tools/tools.js';

import {
    MessageIconContainer,
    MessageTableData
} from './message.style';

const tools = new Tools();

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
        <MessageTableData>{ tools.formatCreatedAtDate(message.createdAt) }</MessageTableData>

    </>
);

export default Message;