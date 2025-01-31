import { useSelector } from "react-redux";
import RatingStars from "../RatingStars/RatingStars";

const Reviews = () => {
  const oneCamper = useSelector((state) => state.campers.oneCamper);

  if (!oneCamper || !oneCamper.reviews || oneCamper.reviews.length === 0) {
    return <p>No reviews available</p>;
  }
  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {oneCamper.reviews.map((review, index) => (
          <li key={index}>
            <div>
              <h3>{review.reviewer_name}</h3>
              <div>
                <RatingStars rating={review.reviewer_rating} />
              </div>
            </div>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Reviews;
