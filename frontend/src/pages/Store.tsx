import { useEffect, useState } from "react";
import { ReviewForm } from "../components/Review/ReviewForm";
import ReviewList from "../components/Review/ReviewList";
import { StoreInfo } from "../components/StoreInfo";
import { OpeningHours } from "../components/OpeningHours";

const URL = "http://localhost:5000";
const STORE_ID = "67e82021f543686ff871b5e5";

export interface FormProps {
  isAddReviewEnabled?: boolean;
  handleIsAddReviewEnabled: () => void;
  refresh: () => void;
  storeId: string | undefined;
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
  const [storeData, setStoreData] = useState<StoreResponse>();
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  const numberOfReviews = reviews.length;
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleIsAddReviewEnabled = () =>
    setIsAddReviewEnabled(!isAddReviewEnabled);

  useEffect(() => {
    refetchAll();
  }, []);

  const fetchStore = async () => {
    const response = await fetch(`${URL}/stores/${STORE_ID}`);
    if (!response.ok) {
      console.error(response.statusText);
      return null;
    }
    const store = await response.json();
    setStoreData(store);
    return store;
  };

  const fetchReviews = async (storeId: string | undefined) => {
    const response = await fetch(`${URL}/reviews/${storeId}`);
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    const reviewsData: ReviewResponse[] = await response.json();
    setReviews(reviewsData.reverse());
  };

  const refetchAll = async () => {
    const store = await fetchStore();
    await fetchReviews(store._id);
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
        storeId={storeData?._id}
      />
      <ReviewList
        handleIsAddReviewEnabled={handleIsAddReviewEnabled}
        reviewList={reviews}
      />
    </>
  );
}
