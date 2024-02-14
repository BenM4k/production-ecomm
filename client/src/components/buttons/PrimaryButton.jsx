const PrimaryButton = ({ type, buttonFn, children }) => {
  return (
    <>
      <button
        className="primary-btn"
        type={type}
        onClick={buttonFn ? () => buttonFn() : null}
      >
        {children}
      </button>
    </>
  );
};

export default PrimaryButton;
