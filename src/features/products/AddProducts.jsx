import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postProduct } from './productsSlice';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user);

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [image, setImage] = React.useState(null);
  const navigate = useNavigate();

  const userId = user.user.id;

  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product[name]', name);
    formData.append('product[price]', price);
    formData.append('product[quantity]', quantity);
    formData.append('product[user_id]', userId);
    formData.append('product[image]', image);
    dispatch(postProduct(formData));
    setName('');
    setPrice('');
    setQuantity('');
    setImage(null);
    navigate('/');
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

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <button type="submit">add product</button>
    </form>
  );
};

export default AddProducts;
