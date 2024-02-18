import { useSelector } from "react-redux";
import { selectUsersResult } from "../../redux/slices/appUsers/appUsersSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useEffect } from "react";

const HandleUsers = () => {
  const users = useSelector(selectUsersResult).data?.users;

  useEffect(() => {
    document.title = "Users List";
  });
  return (
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
            <PrimaryButton>
              <FaEdit />
            </PrimaryButton>
            <SecondaryButton>
              <FaTrashAlt />
            </SecondaryButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HandleUsers;
