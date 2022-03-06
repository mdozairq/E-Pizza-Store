import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import './NavbarStyles.scss'
import { IconButton, Badge, } from "@mui/material";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Dialog from '../Dialog/Dialog'
import { PizzaStoreContext } from "../../context/Context";

const Navbar = () => {
	// hooks
	const {
        state: {noOfItem},
      } = useContext(PizzaStoreContext);
	const [openCart, setopenCart] = useState(false)
	console.log(openCart);

	return (
		<nav className="appbar">
			<div className="appbar-logo">
				<img
					src={logo}
					alt="E-commerce"
					height="25px"
				></img>
				<a href="/">&ensp; E-Pizza Store</a>
			</div>
			<div className="cart">
				{
					<Dialog
						openCart={openCart}
						setopenCart={setopenCart}
					/>
				}
				<IconButton
					onClick={()=>setopenCart(true)}
					aria-label="show cart"
					color="inherit"
				>
					<Badge
						badgeContent={noOfItem}
						color="secondary">
						<ShoppingCart />
					</Badge>
				</IconButton>
			</div>
		</nav>

	);
};

export default Navbar;
