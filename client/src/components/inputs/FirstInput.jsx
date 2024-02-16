import { memo } from "react";

const FirstInput = ({ id, name, type, value, onChange }) => {
  return (
    <input
      id={id}
      name={name}
      className="first-input"
      type={type}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default memo(FirstInput);
