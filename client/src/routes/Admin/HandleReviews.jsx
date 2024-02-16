import { useSelector } from "react-redux";
import { selectReviewsResult } from "../../redux/slices/review/reviewSlice";
import FirstRating from "../../components/ratings/FirstRating";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";

const HandleReviews = () => {
  const reviews = useSelector(selectReviewsResult).data?.reviews;
  return (
    <div className="admin-reviews">
      <h2>Reviews</h2>
      <ul>
        {reviews?.map((review) => (
          <li key={review.id}>
            <div>
              <p className="name">
                {review.user?.first_name} {review.user.last_name}
              </p>
              <p>{review.product?.name}</p>
              <p>comment: {review.comment}</p>
              <p>
                <FirstRating reviews={[{ rating: review.rating }]} />
              </p>
            </div>
            <div className="buttons">
              <PrimaryButton>
                <FaEdit />
              </PrimaryButton>
              <SecondaryButton>
                <FaTrashAlt />
              </SecondaryButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HandleReviews;
