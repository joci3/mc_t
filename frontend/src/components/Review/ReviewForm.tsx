import React, { useState } from "react";
import StarRating from "../StarRating";
import { FormProps } from "../../pages/Store";

interface Review {
  name: string;
  text: string;
  rating: number;
  created: string;
  storeId: string;
}

export const ReviewForm = ({
  isAddReviewEnabled,
  handleIsAddReviewEnabled,
  refresh,
  storeId,
}: FormProps) => {
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isButtonDisabled = !name || !rating || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const newReview: Review = {
      name,
      text,
      rating,
      storeId: storeId ?? "",
      created: new Date().toLocaleDateString("hu-HU"),
    };

    await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    handleIsAddReviewEnabled();
    refresh();

    setIsSubmitting(false);
    setName("");
    setText("");
    setRating(0);
  };

  return (
    isAddReviewEnabled && (
      <div className="bg-white p-5 my-3 rounded-lg shadow-md shadow-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Írd meg a véleményed
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Neved"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Írd le a véleményed..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <StarRating onSetRating={setRating} />
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full h-11 flex justify-center items-center bg-blue-600 text-white p-2 disabled:bg-blue-300 rounded hover:bg-blue-700 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Küldés"
            )}
          </button>
        </form>
      </div>
    )
  );
};
