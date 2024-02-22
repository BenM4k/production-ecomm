import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLocation } from "react-router-dom";
import { useUpdateUserMutation } from "../../redux/slices/appUsers/appUsersSlice";
import PrimaryButton from "../buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../redux/slices/notifications/notif";
import FirstInput from "../inputs/FirstInput";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";

const UpdateUser = ({ setId, user }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  });
  const userRoles = ["ADMIN", "USER"];
  const location = useLocation();
  const dispatch = useDispatch();

  const [updateUser] = useUpdateUserMutation();

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formData.first_name === user.first_name) {
    }

    try {
      await updateUser(formData).unwrap();
      dispatch(setSuccess("User updated successfully"));
      setId(null);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  return (
    <div className="update-user">
      <h3>
        Update user {user?.first_name} {user?.last_name}
      </h3>
      <form onSubmit={handleUpdate}>
        <label htmlFor="first_name">
          First name
          <FirstInput
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="last_name">
          Last name
          <FirstInput
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <FirstInput
            type="text"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </label>
        {currentUser.role === "ADMIN" && 
         !location?.pathname.includes("profile") 
         && (
          <label htmlFor="role">
            Role
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleFormChange}
            >
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        )}

        <PrimaryButton>Update</PrimaryButton>
      </form>
    </div>
  );
};

export default UpdateUser;
