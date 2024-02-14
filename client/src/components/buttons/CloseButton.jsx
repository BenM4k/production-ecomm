import { AiFillCloseCircle } from "react-icons/ai";

const CloseButton = ({ closeFn }) => {
  return (
    <>
      <button className="close-btn" type="button" onClick={() => closeFn()}>
        <AiFillCloseCircle />
      </button>
    </>
  );
};

export default CloseButton;
