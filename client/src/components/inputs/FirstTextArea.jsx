const FirstTextArea = ({ id, name, type, value, onChange }) => {
  return (
    <>
      <textarea
        id={id}
        name={name}
        className="first-textarea"
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
};

export default FirstTextArea;
