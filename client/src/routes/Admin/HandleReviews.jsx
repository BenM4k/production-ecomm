import { useSelector } from "react-redux"
import { selectReviewsResult } from "../../redux/slices/review/reviewSlice"

const HandleReviews = () => {
  const reviews = useSelector(selectReviewsResult).data?.reviews
  return (
    <div>
        <h2>Reviews</h2>
        {reviews?.map((review) => (
            <div key={review._id}>
            <p>{review?.comment}</p>
            <p>{review?.rating}</p>
            <p>{review?.product?.name}</p>
            </div>
        ))}
    </div>
  )
}

export default HandleReviews