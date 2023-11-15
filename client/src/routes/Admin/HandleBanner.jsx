import { useSelector, useDispatch } from 'react-redux';
import { FiDelete } from 'react-icons/fi';
import { FaEdit, FaImage } from 'react-icons/fa';

const HandleBanners = () => {
  // const banners = useSelector((store) => store.banner);
  const banners = []

  return (
    <>
        <div className="dash-head">
            <FaImage />
            <h2>Banners List</h2>
        </div>
        <ul className="admin-banners">
            {banners?.map((banner) => (
                <li key={banner.title}>
                    <img src={banner.img} alt={banner.title} />
                    <div className="admin-banner-desc">
                        <h3>{banner.title}</h3>
                        <p>{banner.desc}</p>
                    </div>
                    <div className="buttons">
                        <button onClick={() => {
                        }}><FiDelete /></button>
                        <button onClick={() => {
                        }}><FaEdit /></button>
                    </div>
                </li>
            ))}
        </ul>
        <div className="add-category">
        </div>
    </>
  )
}

export default HandleBanners;