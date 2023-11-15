import { useSelector, useDispatch } from 'react-redux';
import {TbCategory} from 'react-icons/tb';
import { FiDelete } from 'react-icons/fi';
import { FaEdit} from 'react-icons/fa';

const HandleCategories = () => {
    const categories = []
    const dispatch = useDispatch();
    const handleEditCategory = (id) => {
    }
  return (
    <>
        <div className="dash-head">
            <TbCategory />
            <h2>Categories List</h2>
        </div>
        <ul className="admin-categories">
            {categories.map((category) => (
                <li key={category._id}>
                    <h3>{category.title}</h3>
                    <p>{category.desc}</p>
                    <div className="buttons">
                        <button onClick={() => {
                        }}><FiDelete /></button>
                        <button onClick={() => handleEditCategory(category._id)}><FaEdit /></button>
                    </div>
                </li>
            ))}
        </ul>
        <div className="add-category">
        </div>
    </>
  )
}

export default HandleCategories;