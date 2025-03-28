import { useState } from "react";
import EmptyStar from "./EmptyStar";
import FilledStar from "./FilledStar";

const StarRating = ({ ...props }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setRating(index + 1);
    props.onSetRating(index + 1);
  };

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onClick={(event) => handleClick(index, event)}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(0)}
        >
          {index < (hover || rating) ? (
            <FilledStar size={6} />
          ) : (
            <EmptyStar size={6} />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
