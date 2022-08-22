import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postProduct } from './productsSlice';

const AddProducts = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user);

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState();
  const [quantity, setQuantity] = React.useState();

  const userId = user.user.id;

  const addProduct = (e) => {
    e.preventDefault();
    dispatch(
      postProduct({ product: { name, price, quantity, user_id: userId } }),
    );
    setName('');
    setPrice('');
    setQuantity('');
  };

  if (!user) {
    return <h3>You must be logged in to add products</h3>;
  }

  return (
    <form onSubmit={addProduct} className="product-form">
      <h1>Add Products</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="decimal"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />

      <button type="submit">add product</button>
    </form>
  );
};

export default AddProducts;
