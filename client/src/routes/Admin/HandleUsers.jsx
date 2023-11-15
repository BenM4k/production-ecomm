import { useSelector, useDispatch } from 'react-redux';
import { FaEdit} from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';

const HandleUsers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((store) => store.user);
    const handleDeleteUser = (id) => {
        if (!id) return;
    }
  return (
    <ul>
        {users.map((user, i) => <li key={i}>
            <h4>{user?.firstname}</h4>
            <div className="">
                <button><FiDelete /></button>
                <button onClick={() => handleDeleteUser(user.id)}><FaEdit /></button>
            </div>
        </li>)}
    </ul>
  )
}

export default HandleUsers;