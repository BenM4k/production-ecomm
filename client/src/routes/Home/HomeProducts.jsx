import React from 'react';
import { useSelector } from 'react-redux';
import {selectProductsResult} from '../../redux/slices/products/productSlice';
import Product from './Product';

const HomeProducts = () => {
  const productsResults = useSelector(selectProductsResult)
  const products = productsResults?.data?.products;
  const homeProdtcts = products?.slice(0, 8);
  return (
    <>
        <div className="head-feat">
          <h2 className='title'>Featured</h2>
          <p>Explore our wide range of products from different categories.</p>
          <button>Shop here</button>
        </div>
        <ul className="body-feat">
          {homeProdtcts?.map((item) => (
            <li key={item.id}>
              <Product product={item} />
            </li>
            ))}
        </ul>
    </>
  )
}

export default HomeProducts