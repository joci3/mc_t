import { ReviewResponse } from "../../pages/Store";
import { ReviewItem } from "./ReviewItem";

interface ReviewListProps {
  reviewList: ReviewResponse[];
  handleIsAddReviewEnabled: () => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviewList,
  handleIsAddReviewEnabled,
}) => {
  return (
    <div className="flex flex-col gap-3 p-5 bg-white my-3 rounded-lg ">
      <div className="flex flex-col sm:flex-row mb-4 justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800 ">Hozzászólások</h2>

        <button
          onClick={handleIsAddReviewEnabled}
          className="bg-blue-600 text-white p-2 hover:bg-blue-700 rounded cursor-pointer w-full sm:w-max"
        >
          Írj véleményt
        </button>
      </div>
      {reviewList.map((item) => (
        <ReviewItem
          key={item._id}
          name={item.name}
          rating={item.rating}
          text={item.text}
          created={item.created}
        />
      ))}
    </div>
  );
};

export default ReviewList;
