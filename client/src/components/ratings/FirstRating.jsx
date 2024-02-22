const FirstRating = ({ reviews }) => {
  const averageRating =
    reviews?.reduce((total, review) => total + review.rating, 0) /
    reviews?.length;

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <span className="stars">{renderStars(Math.round(averageRating))}</span>
    </>
  );
};

export default FirstRating;
