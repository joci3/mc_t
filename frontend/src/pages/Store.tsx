import { useEffect, useState } from "react";
import { ReviewForm } from "../components/Review/ReviewForm";
import ReviewList from "../components/Review/ReviewList";
import { StoreInfo } from "../components/StoreInfo";

const URL = "http://localhost:5000";

export interface FormProps {
  isAddReviewEnabled?: boolean;
  handleIsAddReviewEnabled: () => void;
  refresh: () => void;
}

export interface StoreResponse {
  _id: string;
  name: string;
  description: string;
  address: string;
}

export interface ReviewResponse {
  _id: string;
  name: string;
  text: string;
  rating: number;
  created: string;
}

export default function Store() {
  const [isAddReviewEnabled, setIsAddReviewEnabled] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<StoreResponse | null>(null);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  const numberOfReviews = reviews.length;
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleIsAddReviewEnabled = () =>
    setIsAddReviewEnabled(!isAddReviewEnabled);

  useEffect(() => {
    fetchStore();
  }, []);

  useEffect(() => {
    if (storeData) {
      fetchReviews();
    }
  }, [storeData]);

  const fetchStore = async () => {
    const response = await fetch(`${URL}/stores/67e67fefbe5e1913f1f25fe3`);
    if (!response.ok) {
      console.error(response.statusText);
      return;
    } else {
      const store = await response.json();
      setStoreData(store);
    }
  };

  const fetchReviews = async () => {
    const response = await fetch(`${URL}/reviews/`);
    if (!response.ok) {
      return;
    }
    const reviewsData: ReviewResponse[] = await response.json();
    setReviews(reviewsData.reverse());
  };

  const refetchAll = async () => {
    await fetchStore();
    await fetchReviews();
  };

  return (
    <>
      <StoreInfo
        storeData={storeData}
        avgRating={avgRating}
        numberOfReviews={numberOfReviews}
      />
      <ReviewForm
        isAddReviewEnabled={isAddReviewEnabled}
        handleIsAddReviewEnabled={handleIsAddReviewEnabled}
        refresh={refetchAll}
      />
      <ReviewList
        handleIsAddReviewEnabled={handleIsAddReviewEnabled}
        reviewList={reviews}
      />
    </>
  );
}
