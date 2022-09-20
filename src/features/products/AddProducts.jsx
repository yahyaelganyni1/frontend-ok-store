import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postProduct } from './productsSlice';
import { useNavigate } from 'react-router-dom';
import './AddProducts.scss';

const AddProducts = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.authentication.user?.user.id);
  const products = useSelector((state) => state.products.products);
  const productsLoading = useSelector((state) => state.products.loading);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product[name]', name);
    formData.append('product[price]', price);
    formData.append('product[quantity]', quantity);
    formData.append('product[user_id]', userId);
    formData.append('product[image]', image);
    formData.append('product[description]', description);
    dispatch(postProduct(formData));
    setName('');
    setPrice('');
    setQuantity('');
    setImage(null);
  };

  if (!userId) {
    return <h3>You must be logged in to add products</h3>;
  }

  return (
    <form onSubmit={addProduct} className="product-form">
      <h1 className="product-form__title">Add New Product</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="product-form__input"
      />

      <input
        type="decimal"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="product-form__input"
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        className="product-form__input"
      />

      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="product-form__input"
      />

      <div className="file-input">
        <label>
          <span>Choose Image</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="file-input__text"
          />
        </label>
      </div>
      <button type="submit" className="product-form__button">
        {productsLoading ? 'Loading...' : 'Add'}
      </button>
    </form>
  );
};

export default AddProducts;
