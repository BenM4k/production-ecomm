import FirstRating from "../ratings/FirstRating";

const FirstReview = ({ review }) => {
  return (
    <>
      <li>
        <div className="info">
          <p>
            <span>{review.user.first_name}</span> -{" "}
            <span>{review.user.last_name}</span> : {review.comment}
          </p>
        </div>
        <span>
          <FirstRating reviews={[{ rating: review.rating }]} />
        </span>
      </li>
    </>
  );
};

export default FirstReview;
