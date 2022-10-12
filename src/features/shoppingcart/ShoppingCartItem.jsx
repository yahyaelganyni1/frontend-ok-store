import React, { useEffect, useState } from 'react';
import { fetchSingleProduct } from '../products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';

const ShoppingCartItem = ({ item }) => {
  //   const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    // dispatch(fetchSingleProduct(item.id));
  }, []);

  // console.log('product', product);

  return (
    <div>
      {product ? (
        <div>
          <img src={product.image_path} alt={product.name} width="300" />
          <h4>{product.name}</h4>
          <p>price: {product.price}$</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default ShoppingCartItem;
