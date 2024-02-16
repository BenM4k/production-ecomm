import { useSelector } from "react-redux";
import { selectBannersResult } from "../../redux/slices/banners/banners";
import { NavLink } from "react-router-dom";
import Page from "../../components/Page";

const HomeBanner = () => {
  const banners = useSelector(selectBannersResult).data?.banners;
  return (
    <>
      <Page data={banners} />
      <div className="btns">
        <NavLink to="/store" className="btn-primary">
          Visit our Shop now and
          <br />
          <i>get the best experience</i>
        </NavLink>
      </div>
    </>
  );
};

export default HomeBanner;
