import ReactDOM from "react-dom";
import CloseButton from "../buttons/CloseButton";

const Modal = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <CloseButton closeFn={onClose} />
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
