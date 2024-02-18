import { FiDelete } from "react-icons/fi";
import { FaEdit, FaImage } from "react-icons/fa";
import AddBanner from "../../components/adders/AddBanner";
import { selectBannersResult } from "../../redux/slices/banners/banners";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HandleBanners = () => {
  const banners = useSelector(selectBannersResult).data?.banners;

  useEffect(() => {
    document.title = "Banners List";
  });

  return (
    <>
      <div className="dash-head">
        <FaImage />
        <h2>Banners List</h2>
      </div>
      <ul className="admin-banners">
        {banners?.map((banner) => (
          <li key={banner.title}>
            <img src={banner.imageUrl} alt={banner.title} />
            <div className="admin-banner-desc">
              <h3>{banner.title}</h3>
              <p>{banner.desc}</p>
            </div>
            <div className="buttons">
              <button onClick={() => {}}>
                <FiDelete />
              </button>
              <button onClick={() => {}}>
                <FaEdit />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="add-banner">
        <AddBanner />
      </div>
    </>
  );
};

export default HandleBanners;
