import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found";
  });

  return <div>NotFound</div>;
};

export default NotFound;
