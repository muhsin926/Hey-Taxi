import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LocationContext } from "../../context/LocationContext";
import { setPayment } from "../../redux/slices/ModalSlice";
import { io } from "socket.io-client";
import axios from "axios";

const Paypal = ({ fare }) => {
  const { socket } = useSelector((state) => state.socket);
  const { startPoint, endPoint } = useSelector((state) => state.locationSlice);
  const [orderId, setOrderId] = useState();
  const { distance } = useContext(LocationContext);
  const dispatch = useDispatch();

  const createOrder = async (data, actions) => {
    return await actions.order
      .create({
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
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderId(orderID);
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    return await actions.order.capture().then(async (details) => {
      const { payer } = details;
      const token = localStorage.getItem("token");
      await axios.post(
        `${url}/api/passenger/ride-request`,
        { pickup: startPoint, dropOff: endPoint },
        { headers: { Autherization: `Bearer ${token}` } }
      );
      socket.emit("send-request", {
        message: {
          pickup: "pattambi",
          droppoff: "calicut",
          user_name: "Passenger",
          profile: "image",
        },
      });
      toast.success(`Transaction completed by ${payer}`);
      dispatch(setPayment());
    });
  };

  const onError = (data, actions) => {
    console.log(data);
    console.log(actions);
    toast.error("An error occured with your payment");
  };

  return (
    <>
      <PayPalScriptProvider
        options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
      <Toaster />
    </>
  );
};

export default Paypal;
