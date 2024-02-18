import { FaEdit } from "react-icons/fa";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import pic from "../../assets/watch_3.webp";

const Main = ({ user }) => {
  return (
    <div className="user-details">
      <img src={pic} alt={`${user.first_name}'s profile`} />
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <p>{user.email}</p>
      <PrimaryButton>
        <FaEdit />
        Edit
      </PrimaryButton>
    </div>
  );
};

export default Main;
