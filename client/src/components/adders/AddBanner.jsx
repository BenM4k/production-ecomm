import { useState } from "react";
import { useDispatch } from "react-redux";
import FirstInput from "../inputs/FirstInput";
import FileInput from "../inputs/FileInput";
import FirstTextArea from "../inputs/FirstTextArea";
import PrimaryButton from "../buttons/PrimaryButton";
import { useAddBannerMutation } from "../../redux/slices/banners/banners";
import { setError, setSuccess } from "../../redux/slices/notifications/notif";

const AddBanner = () => {
  const dispatch = useDispatch();
  const [addBanner, { isLoading, isError }] = useAddBannerMutation();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bannerData = new FormData();
    bannerData.append("title", formData.title);
    bannerData.append("desc", formData.desc);
    bannerData.append("image", formData.image);

    try {
      addBanner(bannerData);
      setFormData({
        title: "",
        desc: "",
        image: null,
      });
      dispatch(setSuccess("Created Banner successfully"));
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
    return (
      <div>
        <h1>Error creating banner</h1>
      </div>
    );
  return (
    <div>
      <h2>AddBanner</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <FirstInput
            type="text"
            name={"title"}
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="desc">
          Description
          <FirstTextArea
            name={"desc"}
            value={formData.desc}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="image">
          <FileInput
            name={"image"}
            onChange={handleFileChange}
            accept={"image/png, image/jpeg, image/webp"}
          />
        </label>
        <PrimaryButton>Create banner</PrimaryButton>
      </form>
    </div>
  );
};

export default AddBanner;
