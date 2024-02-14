const Notifications = ({ notice, error, success, info }) => {
  return (
    <>
      <div className={notice ? "notices" : ""}>
        {notice && <p>⚠️ {notice}</p>}
      </div>
      <div className={error ? "errors" : ""}>{error && <p>❌ {error}</p>}</div>
      <div className={success ? "success" : ""}>
        {success && <p>✅ {success}</p>}
      </div>
      <div className={info ? "infos" : ""}>{info && <p>ℹ️ {info}</p>}</div>
    </>
  );
};

export default Notifications;
