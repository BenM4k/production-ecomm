import { useSelector, useDispatch } from 'react-redux';
import { selectCategoriesResult } from '../../redux/slices/category/category';
import { FiDelete } from 'react-icons/fi';
import { FaEdit} from 'react-icons/fa';
import AddCategory from '../../components/adders/AddCategory';

const HandleCategories = () => {
  const categories = useSelector(selectCategoriesResult)?.data?.categories;

  return (
    <>
        <div className="dash-head">
            <h2>Categories List</h2>
        </div>
        <ul className="admin-categories">
            {categories.map((category) => (
                <li key={category.id}>
                    <h3>{category.name}</h3>
                    <div className="buttons">
                        <button ><FiDelete /></button>
                        <button onClick={() => handleEditCategory(category._id)}><FaEdit /></button>
                    </div>
                </li>
            ))}
        </ul>
        <div className="add-category">
            <AddCategory />
        </div>
    </>
  )
}

export default HandleCategories;