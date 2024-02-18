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
        minLength={20}
      />
    </>
  );
};

export default FirstTextArea;
