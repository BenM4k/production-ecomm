import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../../redux/slices/category/category'

const HomeCategories = () => {
  const categories = useSelector(selectAllCategories);
  return (
    <>
      <h2 className='title'>Explore Our Exciting Categories and Promotions</h2>
      <p>Find the best deals and hottest products in our wide range of categories. Take advantage of our limited-time promotions to save big on your favorite items.</p>
      <ul className='list'>{categories.slice(0, 3)?.map((item) => (
        <li key={item.id}>
          <img src={item.img} alt="" />
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </li>
      ))}
      </ul>
    </>
  )
}

export default HomeCategories