import Tools from '../../../../tools/tools.js';

import {
    InvoiceItemRow,
    InvoiceItemData
} from './invoice-item.styles';

const tools = new Tools();

const InvoiceItem = ({ product }) => {
    return (
        <InvoiceItemRow>
            <InvoiceItemData>{ product.product.name }</InvoiceItemData>
            <InvoiceItemData>{ product.quantity }</InvoiceItemData>
            <InvoiceItemData>{ tools.formatPrice(product.quantity * product.product.Inventories[0].price) }</InvoiceItemData>
        </InvoiceItemRow>
    )
}

export default InvoiceItem;