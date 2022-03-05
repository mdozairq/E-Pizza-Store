import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PizzaStoreContext } from '../../context/Context'
import Typography from '@mui/material/Typography';
import nonVeg from '../../assets/non-veg.png'
import veg from '../../assets/veg.png'
// import GroupButton from '../GroupButton/GroupButton';
import GooglePayButton from "@google-pay/button-react";
import './Dialog.scss'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ openCart, setopenCart }) {


  const {
    state: { cartItem, noOfItem },
    PizzaStoreContextDispatch,
  } = React.useContext(PizzaStoreContext);
  const subTotal = cartItem.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);

  console.log(cartItem);
  const handleClickOpen = () => {
    setopenCart(true);
  };

  const handleClose = () => {
    setopenCart(false);
    // setOpenCart(false);
  };

  const removeItem = (pizza) => {
    const Item = {
      id: pizza.id,
      name: pizza.name,
      isVeg: pizza.isVeg,
      amount: pizza.amount,
    }
    // setCounter(counter - 1)
    PizzaStoreContextDispatch({
      type: "setNoOfItem",
      payload: noOfItem - 1,
    });

    PizzaStoreContextDispatch({
      type: "deleteCartItem",
      payload: Item,
    });
  }

  const emptyCart = () =>{
    PizzaStoreContextDispatch({
      type: "setEmptyCart",
    });
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openCart}
      // 
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <h3 style={{ lineHeight: "1rem" }}>Checkout</h3>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {subTotal === 0 ? <div style={{ width: "400px" }}>Please Select Pizza in the Cart</div>
            : cartItem.map((item, index) =>
              <div className='outer' key={index}>
                <div className='itemDiv'>
                  <div className="Itype">
                    <img src={item.isVeg ? veg : nonVeg} alt="veg" />
                  </div>
                  <div className='rightSec'>
                    <div className='first'>
                      <div className='div1'>
                        <h3>{item.name}</h3>
                        <h5>₹{item.amount}</h5>
                        <p>Size: {item.size.size}</p>
                        <p>Toppings: {item.toppings.name} </p>
                      </div>
                      <div className='div2'>
                        {/* <Button variant="primary" style={{ width: "80%", background: "red", color: "#fff", margin: "10px" }} onClick={removeItem(item)}>Remove</Button> */}
                        {/* <GroupButton pizza={item} /> */}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )
          }
        </DialogContent>
        <DialogActions style={{ flexDirection: "column", textAlign: "left", justifyContent: "left", alignItems: "left" }}>
          <Typography variant='h6'>SubTotal: ₹{subTotal}</Typography>
          {/* <Button variant="primary" fullWidth style={{ width: "100%", background: "#ff9e00", color: "#fff", margin: "10px" }}>Pay - ${subTotal}</Button> */}
          <button
            onClick={emptyCart}
            style={{ border: "none", backgroundColor: "white", width: "100%" }}
          >
            <GooglePayButton
              // onClick={emptyCart}
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant Shubham",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: subTotal,
                  currencyCode: "INR",
                  countryCode: "IN",
                },
                shippingAddressRequired: true,
                callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("Success", paymentRequest);
              }}
              onPaymentAuthorized={(paymentData) => {
                console.log("Payment Authorised Success", paymentData);
                return { transactionState: "SUCCESS" };
              }}
              onPaymentDataChanged={(paymentData) => {
                console.log("On Payment Data Changed", paymentData);
                return {};
              }}
              existingPaymentMethodRequired="false"
              buttonColor="black"
              buttonType="Buy"
              fullWidth
            />
          </button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
