import React from "react";
import FilledStar from "../FilledStar";

export interface ReviewItemProps {
  name: string;
  rating: number;
  text: string;
  created: string;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  name,
  rating,
  text,
  created,
}) => {
  return (
    <div className=" flex flex-col border-1 border-gray-300 rounded-lg shadow-md shadow-gray-300">
      <div className="p-2 flex justify-between border-b-1 border-gray-300 gap-2">
        <div className="flex flex-col gap-2.5">
          <span className="font-bold">{name}</span>
          <div className="flex items-center">
            {Array.from({ length: rating }).map((_, index) => (
              <FilledStar key={index} size={6} />
            ))}
          </div>
        </div>
        <span>{created}</span>
      </div>
      <p className="p-2 break-words">
        {text || (
          <span className="italic">A felhasználó nem írt megjegyzést.</span>
        )}
      </p>
    </div>
  );
};
