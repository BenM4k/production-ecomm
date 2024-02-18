import PrimaryButton from "../../components/buttons/PrimaryButton";

const Navigation = ({ tab, setTab, handleLogout }) => {
  const navList = ["main", "orders"];
  return (
    <div className="user-nav">
      <h2>Profile</h2>
      <ul>
        {navList.map((list) => (
          <li key={list}>
            <button
              onClick={() => setTab(list)}
              className={`nav-btn ${tab === list ? "active" : ""}`}
            >
              {list}
            </button>
          </li>
        ))}
      </ul>
      <div className="logout-btn">
        <PrimaryButton type="button" buttonFn={handleLogout}>
          Logout
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Navigation;
