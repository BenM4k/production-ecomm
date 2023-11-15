
const Feedback = ({reviews}) => {
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
        <textarea cols="50" rows="3" placeholder="Add you review"/>
        <select name="" id="">
          <option value={0}>Rate this product</option>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>
        <button>Review</button>
    </>
  )
}

export default Feedback