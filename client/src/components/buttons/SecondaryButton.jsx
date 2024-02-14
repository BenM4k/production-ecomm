const SecondaryButton = ({ type, buttonFn, children }) => {
  return (
    <>
      <button
        className="secondary-btn"
        type={type}
        onClick={buttonFn ? () => buttonFn() : null}
      >
        {children}
      </button>
    </>
  );
};

export default SecondaryButton;
