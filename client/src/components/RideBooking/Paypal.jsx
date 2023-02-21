import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { LocationContext } from '../../context/LocationContext';
import { setPayment } from '../../redux/slices/ModalSlice';


const Paypal = ({ fare }) => {
    const [orderId, setOrderId] = useState()
    const { distance } = useContext(LocationContext);
    const dispatch =  useDispatch()

    const createOrder = async (data, actions) => {
        return await actions.order.create({
            purchase_units: [
                {
                    description: "Taxi booking",
                    amount: {
                        currency_code: "USD",
                        value: `${fare * distance}`,
                    },
                },
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING"
            }
        }).then((orderID) => {
            setOrderId(orderID)
            return orderID
        })
    }

    const onApprove = async (data, actions) => {
        return await actions.order.capture().then((details) => {
            const { payer } = details
            toast.success(`Transaction completed by ${payer}`);
            dispatch(setPayment())
        });
    }

    const onError = (data, actions) => {
        toast.error("An error occured with your payment")
    }

    return (
        <>
            <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                <PayPalButtons style={{ layout: 'vertical' }} createOrder={createOrder}
                    onApprove={onApprove} onError={onError} />
            </PayPalScriptProvider>
            <Toaster />
        </>
    )
}

export default Paypal