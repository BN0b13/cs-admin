import { convertProductPrice } from '../../../../tools/tools';

import {
    InvoiceItemRow,
    InvoiceItemData
} from './invoice-item.styles';

const InvoiceItem = ({ product }) => {
    return (
        <InvoiceItemRow>
            <InvoiceItemData>{ product.product.name }</InvoiceItemData>
            <InvoiceItemData>{ product.quantity }</InvoiceItemData>
            <InvoiceItemData>{ convertProductPrice(product.quantity * product.product.price) }</InvoiceItemData>
        </InvoiceItemRow>
    )
}

export default InvoiceItem;