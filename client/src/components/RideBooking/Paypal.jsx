import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { LocationContext } from '../../context/LocationContext';
import { setPayment } from '../../redux/slices/ModalSlice';
import url from '../../api/Api'


const Paypal = ({ fare }) => {
  const { userId } = useSelector((state) => state.auth)
  const { startPoint, endPoint } = useSelector((state) => state.locationSlice);
  const [orderId, setOrderId] = useState()
  const { distance } = useContext(LocationContext);
  const dispatch = useDispatch()

  const sendRequest = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${url}/api/passenger/ride-request`,
      { pickup: startPoint, dropOff: endPoint, userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setPayment())
  }


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
      console.log(payer);
      sendRequest()
      toast.success(`Transaction completed by ${payer}`);
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