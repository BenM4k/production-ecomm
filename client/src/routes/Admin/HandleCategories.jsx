import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategoriesResult } from '../../redux/slices/category/category';
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../redux/slices/category/category';
import { FiDelete } from 'react-icons/fi';
import { FaEdit} from 'react-icons/fa';
import AddCategory from '../../components/adders/AddCategory';

const HandleCategories = () => {
  const categories = useSelector(selectCategoriesResult)?.data?.categories;
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const cat = categories?.find((category) => category.id === id);
  const handleDelete = (id) => {
    try {
      deleteCategory(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditCategory = (e, category) => {
    e.preventDefault();
    try {
      updateCategory(category).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
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
                        <button onClick={() => handleDelete(category?.id)}><FiDelete /></button>
                        <button onClick={() => setId(category?.id)}><FaEdit /></button>
                    </div>
                </li>
            ))}
        </ul>
        <div className="update-category">
          <h2>Update category</h2>
          <form action="" onSubmit={() => handleEditCategory(cat)}>
            <input type="text" name="name" id="name" placeholder="Category Name" value={cat?.name} onChange={(e) => setName(e.target.value)}/>
            <button>Update category</button>
          </form>
        </div>
        <div className="add-category">
            <AddCategory />
        </div>
    </>
  )
}

export default HandleCategories;