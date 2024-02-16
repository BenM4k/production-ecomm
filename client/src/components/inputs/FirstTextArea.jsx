import { memo } from "react";

const FirstTextArea = ({ id, name, type, value, onChange, placeholder }) => {
  return (
    <>
      <textarea
        id={id}
        name={name}
        className="first-textarea"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </>
  );
};

export default memo(FirstTextArea);
