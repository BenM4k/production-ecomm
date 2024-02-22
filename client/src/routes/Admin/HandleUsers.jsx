import { useSelector, useDispatch } from "react-redux";
import { selectUsersResult } from "../../redux/slices/appUsers/appUsersSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useDeleteUserMutation } from "../../redux/slices/appUsers/appUsersSlice";
import { useEffect, useState } from "react";
import {
  setError,
  setSuccess,
  setNotice,
} from "../../redux/slices/notifications/notif";
import UpdateUser from "../../components/modals/UpdateUser";
import Modal from "../../components/modals/Modal";

const HandleUsers = () => {
  const users = useSelector(selectUsersResult).data?.users;
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const user = users?.find((u) => u.id === id);

  const handleDeleteUser = async (user) => {
    if (user.role === "ADMIN") {
      dispatch(setNotice("Can not delete an Administrator"));
      return;
    }
    try {
      const userData = await deleteUser(user.id);
      dispatch(
        setSuccess(
          `User deleted ${user.first_name} ${user.last_name} successfully`
        )
      );
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  useEffect(() => {
    document.title = "Users List";
  });
  return (
    <>
      <ul className="user-list">
        {users?.map((user, i) => (
          <li key={i} className="user">
            <h4>
              {user?.first_name} - {user.last_name}
            </h4>
            <ul className="attributes">
              <li>Reviews: {user.Review.length}</li>
              <li>Orders: {user.Order.length}</li>
            </ul>
            <div className="buttons">
              <PrimaryButton buttonFn={() => setId(user.id)}>
                <FaEdit />
              </PrimaryButton>
              <SecondaryButton buttonFn={() => handleDeleteUser(user)}>
                <FaTrashAlt />
              </SecondaryButton>
            </div>
          </li>
        ))}
      </ul>
      {id && (
        <Modal isOpen={user} onClose={() => setId(null)}>
          <UpdateUser user={user} setId={setId} />
        </Modal>
      )}
    </>
  );
};

export default HandleUsers;
