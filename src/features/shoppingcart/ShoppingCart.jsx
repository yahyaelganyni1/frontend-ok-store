import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCart,
  removeFromCart,
  decrementItem,
  incrementItem,
} from './shoppingcartSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector(
    (state) => state.shoppingcart.cart?.products,
  );
  const total_price = useSelector(
    (state) => state.shoppingcart.cart?.total_cart_price,
  );
  const [updatedCart, setUpdatedCart] = useState(false);
  const [removedItem, setRemovedItem] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
    return () => {
      dispatch(fetchCart());
    };
  }, [updatedCart, removedItem]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    setRemovedItem((prev) => !prev);
  };

  const handleDecrementItem = (id) => {
    dispatch(decrementItem(id));
    setUpdatedCart((prev) => !prev);
  };

  const handleIncrementItem = (id) => {
    dispatch(incrementItem(id));
    setUpdatedCart((prev) => !prev);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartProducts ? (
        cartProducts?.map((item) => (
          <div key={item.id}>
            <img src={item.image_url} alt={item.name} width="300" />
            <h3>{item.name}</h3>
            <p>total productsSlice: {item.total_price}$</p>
            <p>
              <button onClick={() => handleIncrementItem(item.cartItem_id)}>
                +
              </button>
              quantity: {item.quantity}
              <button onClick={() => handleDecrementItem(item.cartItem_id)}>
                -
              </button>
            </p>
            <button onClick={() => handleRemoveFromCart(item.cartItem_id)}>
              remove from the cart
            </button>
          </div>
        ))
      ) : (
        <p>Cart is empty</p>
      )}

      <h3>Total price: {total_price}$</h3>
    </div>
  );
};

export default ShoppingCart;
