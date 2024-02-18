import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";
import { useAddReviewMutation } from "../../redux/slices/review/reviewSlice";
import FirstTextArea from "../../components/inputs/FirstTextArea";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import FirstReview from "../../components/reviews/FirstReview";
import {
  setInfo,
  setError,
  setSuccess,
} from "../../redux/slices/notifications/notif";
const Feedback = ({ reviews, product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [addReview] = useAddReviewMutation();
  const [formData, setFormData] = useState({
    user_id: user?.id,
    product_id: `${product.id}`,
    comment: "",
    rating: 0,
  });

  const memoizedFormData = useMemo(() => formData, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    setFormData({ ...formData, product_id: product.id });
  }, [product, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      dispatch(setInfo("You must be logged in to add a review"));
      return;
    }

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
        setSuccess("Review added successfully");
      } catch (err) {
        console.log(err);
        dispatch(setError("Please fill all fields"));
      }
    } else {
      dispatch(setError("Please fill all fields"));
    }
  };

  return (
    <>
      <h2>Customers feedback</h2>
      <ul>
        {reviews.length ? (
          reviews
            ?.slice(0, 4)
            .map((review) => <FirstReview key={review.id} review={review} />)
        ) : (
          <li>No feedback for this product</li>
        )}
      </ul>
      <form action="" onSubmit={handleSubmit}>
        <FirstTextArea
          name="comment"
          value={memoizedFormData.comment}
          placeholder="Add you review"
          onChange={handleChange}
        />
        <select
          name="rating"
          id="rating"
          value={memoizedFormData.rating}
          onChange={handleChange}
        >
          <option value={0}>Rate this product</option>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>
        <PrimaryButton>Review</PrimaryButton>
      </form>
    </>
  );
};

export default Feedback;
