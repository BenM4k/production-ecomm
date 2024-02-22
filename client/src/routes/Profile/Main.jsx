import { FaEdit } from "react-icons/fa";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import pic from "../../assets/watch_3.webp";
import Modal from "../../components/modals/Modal";
import UpdateUser from "../../components/modals/UpdateUser";
import { useState } from "react";

const Main = ({ user }) => {
  const [isOpen, setIsOpen] = useState(null);
  return (
    <div className="user-details">
      <img src={pic} alt={`${user.first_name}'s profile`} />
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <p>{user.email}</p>
      <PrimaryButton buttonFn={() => setIsOpen(true)}>
        <FaEdit />
        Edit
      </PrimaryButton>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(null)}>
        <UpdateUser user={user} />
      </Modal>
    </div>
  );
};

export default Main;
