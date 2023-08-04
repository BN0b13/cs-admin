import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import dayjs from 'dayjs';

import {
    FaPrint
} from 'react-icons/fa';

import AdminModal from '../admin-modal/admin-modal.component';
import Button from '../button/button.component';
import InvoiceItem from './invoice-item/invoice-item.component';

import { convertProductPrice } from '../../../tools/tools';

import Client from '../../../tools/client';

import {
    ButtonContainer,
    InvoiceContainer,
    InvoiceAddressesContainer,
    InvoiceAddressContainer,
    InvoiceDetailsContainer,
    InvoiceHeaderContainer,
    InvoiceTable,
    InvoiceTableBody,
    InvoiceTableHead,
    InvoiceTableRow,
    InvoiceTableHeading,
    InvoiceText,
    InvoiceTitle,
    InvoiceTotalContainer,
    InvoiceTotalItemContainer,
    InvoiceSubtitle,
    MainContent,
    PrintContainer,
    TrackingContainer,
    TrackingSubtitle,
    TrackingText
} from './invoice.styles';

const client = new Client();

const Invoice = ({ order, products, getOrder }) => {
    const componentRef = useRef();
    const [ user, setUser ] = useState('');
    const [ subtotal, setSubtotal ] = useState('');
    const [ paymentLink, setPaymentLink ] = useState('');
    const [ tracking, setTracking ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ action, setAction ] = useState('');
    const [ showOrderModal, setShowOrderModal ] = useState(false);


    useEffect(() => {
        const getUser = async () => {
            const userRes = await client.getAccountById(order.userId);

            setUser(userRes[0]);
        }
        let subtotalCount = 0;
        products.map(item => subtotalCount = subtotalCount + (item.quantity * item.product.Inventories[0].price));
        setSubtotal(subtotalCount);

        getUser();
    }, []);

    const confirmSendPaymentLink = () => {
        if(paymentLink.length === 0) {
            console.log('Please add a Payment Link to update order status to BILLED.');
            return
        }
        setTitle('Send Payment Link');
        setMessage(`Are you sure you want to send the payment link: ${paymentLink}?`);
        setAction(() => sendPaymentLink);
        setShowOrderModal(true);
    }

    const confirmMarkPaid = () => {
        setTitle('Mark Paid');
        setMessage('Are you sure you want to mark the order as PAID? Please ensure the customer has paid the correct invoice');
        setAction(() => markBillPaid);
        setShowOrderModal(true);
    }

    const confirmProcessOrder = () => {
        setTitle('Process Order');
        setMessage('Are you sure you want to process the order? It is a good idea to make sure the inventory is pulled first.');
        setAction(() => processOrder);
        setShowOrderModal(true);
    }

    const confirmShipOrder = () => {
        if(tracking.length === 0) {
            console.log('Please add a tracking number to update order status to Shipped.');
            return
        }
        setTitle('Ship Order');
        setMessage(`Are you sure you want to ship the order with tracking number: ${tracking}? The customer will automatically get an email with the status update and tracking number.`);
        setAction(() =>shipOrder);
        setShowOrderModal(true);
    }


    const sendPaymentLink = async () => {
        const data = {
            email: user.email,
            refId: order.refId,
            orderId: order.id,
            status: 'BILLED',
            paymentLink
        }

        await client.sendPaymentLink(data);
        setShowOrderModal(false);
        getOrder();
    }

    const markBillPaid = async () => {
        const data = {
            email: user.email,
            refId: order.refId,
            orderId: order.id,
            status: 'PAID'
        }

        await client.updateOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    const processOrder = async () => {
        const data = {
            orderId: order.id,
            status: 'PROCESSING'
        }

        await client.updateOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    const shipOrder = async () => {
        const data = {
            email: user.email,
            refId: order.refId,
            orderId: order.id,
            status: 'SHIPPED',
            tracking: tracking
        }

        await client.shipOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    return (
        <MainContent>
            <AdminModal 
                show={showOrderModal}
                setShow={setShowOrderModal}
                title={title} 
                image={''}
                message={message} 
                action={action} 
                actionText={'Process'}
            />
            <PrintContainer>
                <ReactToPrint
                    trigger={() => <FaPrint style={{ fontSize: '28px'}} />}
                    content={() => componentRef.current}
                />
            </PrintContainer>
            <InvoiceContainer ref={componentRef}>
                <InvoiceHeaderContainer>
                            
                    <InvoiceDetailsContainer>
                        <InvoiceAddressContainer>
                            <InvoiceSubtitle>{ dayjs(order.createdAt).format('MM/DD/YY') }</InvoiceSubtitle>
                            <InvoiceSubtitle>Status: { order.status.toUpperCase()}</InvoiceSubtitle>
                            <InvoiceSubtitle>Reference ID: { order.refId }</InvoiceSubtitle>
                            <TrackingContainer>
                                <TrackingSubtitle>Tracking: </TrackingSubtitle>
                                { order.tracking ? 
                                    <TrackingText>{ order.tracking }</TrackingText>
                                : 
                                    <TrackingText>Available once order has shipped</TrackingText>
                                }
                            </TrackingContainer>
                        </InvoiceAddressContainer>
                        <InvoiceAddressContainer>
                        </InvoiceAddressContainer>
                    </InvoiceDetailsContainer>
                    <InvoiceAddressesContainer>
                        <InvoiceAddressContainer>
                            <InvoiceSubtitle>Billing</InvoiceSubtitle>
                            <InvoiceText>{ `${order.billingAddress.firstName} ${order.billingAddress.lastName}` }</InvoiceText>
                            <InvoiceText>{ order.billingAddress.addressOne }</InvoiceText>
                            <InvoiceText>{ order.billingAddress.addressTwo }</InvoiceText>
                            <InvoiceText>{ order.billingAddress.city }</InvoiceText>
                            <InvoiceText>{ order.billingAddress.state }</InvoiceText>
                            <InvoiceText>{ order.billingAddress.zipCode }</InvoiceText>
                        </InvoiceAddressContainer>
                        <InvoiceAddressContainer>
                        <InvoiceSubtitle>Shipping</InvoiceSubtitle>
                            <InvoiceText>{ `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}` }</InvoiceText>
                            <InvoiceText>{ order.shippingAddress.addressOne }</InvoiceText>
                            <InvoiceText>{ order.shippingAddress.addressTwo }</InvoiceText>
                            <InvoiceText>{ order.shippingAddress.city }</InvoiceText>
                            <InvoiceText>{ order.shippingAddress.state }</InvoiceText>
                            <InvoiceText>{ order.shippingAddress.zipCode }</InvoiceText>
                        </InvoiceAddressContainer>
                    </InvoiceAddressesContainer>
                </InvoiceHeaderContainer>
                <InvoiceTable>
                    <InvoiceTableHead>
                        <InvoiceTableRow>
                            <InvoiceTableHeading>Product</InvoiceTableHeading>
                            <InvoiceTableHeading>Quantity</InvoiceTableHeading>
                            <InvoiceTableHeading>Price</InvoiceTableHeading>
                        </InvoiceTableRow>
                    </InvoiceTableHead>
                    <InvoiceTableBody>
                            {products.map((product, index) => (
                                <InvoiceItem key={index} product={product} />
                            ))}
                    </InvoiceTableBody>
                </InvoiceTable>
                <InvoiceTotalContainer>
                <InvoiceTotalItemContainer>
                    <InvoiceText>Subtotal </InvoiceText>
                        <InvoiceText>{ convertProductPrice(subtotal) }</InvoiceText>
                    </InvoiceTotalItemContainer>
                    {order.deliveryInsurance &&
                        <InvoiceTotalItemContainer>
                            <InvoiceText>Delivery Insurance </InvoiceText>
                            <InvoiceText>{ convertProductPrice(order.deliveryInsuranceTotal) }</InvoiceText>
                        </InvoiceTotalItemContainer>
                    }
                    <InvoiceTotalItemContainer>
                        <InvoiceText>Shipping </InvoiceText>
                        <InvoiceText>{ convertProductPrice(order.shippingTotal) }</InvoiceText>
                    </InvoiceTotalItemContainer>
                    <InvoiceTotalItemContainer>
                        <InvoiceText>Total </InvoiceText>
                        <InvoiceText>{ convertProductPrice(order.total) }</InvoiceText>
                    </InvoiceTotalItemContainer>
                </InvoiceTotalContainer>
            </InvoiceContainer>
            {order.status.toLowerCase() === 'new' &&
                <ButtonContainer>
                    <label>Payment Link: </label>
                    <input value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} placeholder='Payment Link' />
                    <Button onClick={() => confirmSendPaymentLink()} >Send Payment</Button>
                </ButtonContainer>
            }
            {order.status.toLowerCase() === 'billed' &&
                <ButtonContainer>
                    <Button onClick={() => confirmMarkPaid()} >Bill Paid</Button>
                </ButtonContainer>
            }
            {order.status.toLowerCase() === 'paid' &&
                <ButtonContainer>
                    <Button onClick={() => confirmProcessOrder()} >Process Order</Button>
                </ButtonContainer>
            }
            {order.status.toLowerCase() === 'processing' &&
                <ButtonContainer>
                    <label>Tracking: </label>
                    <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder='Tracking' />
                    <Button onClick={() => confirmShipOrder()} >Ship Order</Button>
                </ButtonContainer>
            }
        </MainContent>
    );
}

export default Invoice;