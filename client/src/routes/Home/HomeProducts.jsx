import React from 'react';
import { useSelector } from 'react-redux';
import {selectAllProducts} from '../../redux/slices/products/productSlice';
import Product from './Product';

const HomeProducts = () => {
  const products = useSelector(selectAllProducts);
  return (
    <>
        <div className="head-feat">
          <h2 className='title'>Featured</h2>
          <p>Explore our wide range of products from different categories.</p>
          <button>Shop here</button>
        </div>
        <ul className="body-feat">
          {products.slice(0, 8)?.map((item) => (
            <li key={item.id}>
              <Product product={item} />
            </li>
            ))}
        </ul>
    </>
  )
}

export default HomeProducts