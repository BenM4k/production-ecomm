import React from "react";

const FileInput = React.memo(function FileInput({
  id,
  name,
  value,
  onChange,
  accept,
}) {
  return (
    <input
      id={id}
      name={name}
      className="first-input"
      type="file"
      value={value}
      onChange={onChange}
      accept={accept}
      required
    />
  );
});

export default FileInput;
