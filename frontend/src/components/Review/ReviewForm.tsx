import React, { useState } from "react";
import StarRating from "../StarRating";
import { FormProps } from "../../pages/Store";

interface Review {
  name: string;
  text: string;
  rating: number;
  created: string;
}

export const ReviewForm = ({
  isAddReviewEnabled,
  handleIsAddReviewEnabled,
  refresh,
}: FormProps) => {
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const isButtonDisabled = !name || !rating;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReview: Review = {
      name,
      text,
      rating,
      created: new Date().toLocaleDateString("hu-HU"),
    };

    if (newReview) {
      await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
    }

    handleIsAddReviewEnabled();
    refresh();

    setName("");
    setText("");
    setRating(0);
  };

  return (
    isAddReviewEnabled && (
      <>
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
              className="w-full bg-blue-600 text-white p-2 disabled:bg-blue-300 rounded hover:bg-blue-700 cursor-pointer"
            >
              Küldés
            </button>
          </form>
        </div>
      </>
    )
  );
};
