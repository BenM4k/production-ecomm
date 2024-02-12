import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";
import { useAddReviewMutation } from "../../redux/slices/review/reviewSlice";

const Feedback = ({ reviews, product }) => {
  const user = useSelector(selectCurrentUser);
  const [addReview] = useAddReviewMutation();
  const [formData, setFormData] = useState({
    user_id: user?.id,
    product_id: `${product.id}`,
    comment: "",
    rating: 0,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormData({ ...formData, product_id: product.id });
  }, [product, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user_id, product_id, comment, rating } = formData;
    if (comment && rating) {
      const postedReview = {
        user_id,
        product_id,
        comment,
        rating: Number(rating),
      };
      try {
        addReview(postedReview).unwrap();
        setFormData({
          user_id: `${user?.id}`,
          product_id: ``,
          comment: "",
          rating: 0,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <h2>Customers feedback</h2>
      <ul>
        {reviews?.slice(0, 4).map((review) => (
          <li key={review?.id}>
            <span>{review?.rating}</span>
            <p>{review?.comment}</p>
          </li>
        ))}
      </ul>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          cols="50"
          rows="3"
          name="comment"
          value={formData.comment}
          placeholder="Add you review"
          onChange={handleChange}
        />
        <select
          name="rating"
          id="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value={0}>Rate this product</option>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>
        <button>Review</button>
      </form>
    </>
  );
};

export default Feedback;
