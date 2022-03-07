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
import Gbutton from './Gbutton';

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
    state: { cartItem},
    PizzaStoreContextDispatch,
  } = React.useContext(PizzaStoreContext);
  const subTotal = cartItem.map(item => item.finalAmount).reduce((prev, curr) => prev + curr, 0);

  
  const handleClose = () => {
    setopenCart(false);
  };

  
  const emptyCart = () => {
    PizzaStoreContextDispatch({
      type: "setEmptyCart",
    });
    setopenCart(false);
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
          {subTotal === 0 ? <div style={{ width: "400px" }}>Please Select Pizza to Add in the Cart</div>
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
                        <h5>{item.quantity} X ₹{item.amount}  :  ₹{item.finalAmount}</h5>
                        <p>Size: {item.size.size}</p>
                        <p>Toppings: {item.toppings.name} </p>
                      </div>
                      <div className='div2'>
                        <Gbutton pizza={item} />
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
          <Button
            onClick={emptyCart}
            variant="primary"
            style={{ border: "none", backgroundColor: "black", width: "100%" }}
            fullWidth
            disabled={subTotal === 0 ? true : false}
          >
            <GooglePayButton
              environment="TEST"
              buttonSizeMode='static'
              buttonType='order'
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
                  merchantName: "Demo Merchant Ozair",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: subTotal.toString(),
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
            />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
