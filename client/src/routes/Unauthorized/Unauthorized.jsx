import { useEffect } from "react";

const Unauthorized = () => {
  useEffect(() => {
    document.title = "Unauthorized";
  });
  return <div>Unauthorized</div>;
};

export default Unauthorized;
