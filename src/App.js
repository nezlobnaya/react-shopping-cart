import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import {ProductContext} from './contexts/ProductContext';
import {CartContext} from './contexts/CartContext';
import { useLocalStorage } from './hooks/useLocalStorage';
// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useLocalStorage('item', []);

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item]);
	};

	const deleteItem = itemId => {
		setCart(cart.filter(item => item.id !== itemId))}
	// 	const newCart = cart.filter(
	// 	  item => item.id !== itemId
	// 	);
	// 	return setCart([...newCart]);
	//   };
	  

	return (
		<div className="App">
		 <ProductContext.Provider value={{ products, addItem }}>
		 	<CartContext.Provider value ={{cart, deleteItem}}>
			 <Navigation cart={cart} />

				{/* Routes */}
				<Route exact path="/" component={Products}/>
				<Route
					path="/cart"
					render={() => <ShoppingCart cart={cart} />}
				/>

			 </CartContext.Provider>
		 </ProductContext.Provider>
			
		</div>
	);
}

export default App;
