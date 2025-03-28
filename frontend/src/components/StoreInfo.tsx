import logo from "../assets/store.jpg";
import { OpeningHours } from "./OpeningHours";
import FilledStar from "./FilledStar";
import { StoreResponse } from "../pages/Store";

interface StoreInfoProps {
  storeData: StoreResponse | null;
  avgRating: number;
  numberOfReviews: number;
}

export const StoreInfo: React.FC<StoreInfoProps> = ({
  storeData,
  avgRating,
  numberOfReviews,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg my-3 overflow-hidden">
      <div className="max-w-max relative overflow-hidden">
        <img className="blur-xs" src={logo} alt="store" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-3xl sm:text-5xl font-bold uppercase font-mono text-center">
            {storeData?.name}
          </span>
        </div>
      </div>
      <div className="p-3.5 flex flex-1 flex-col justify-between gap-4">
        <div className="flex flex-col  mt-4 sm:flex-row sm:divide-x-1 sm:divide-gray-300 sm:gap-0 gap-5">
          <div className="flex-1/3">
            <p>{storeData?.description}</p>
          </div>

          <div className="flex-1 ml-3 px-6 sm:px-0">
            <OpeningHours />
          </div>
        </div>
        <div className="pt-3 flex justify-between font-light italic border-t-1 border-dashed border-gray-300">
          <span>{storeData?.address}</span>
          <div className="flex gap-0.5 items-center">
            <FilledStar size={6} />
            <span className="font-bold">{Math.round(avgRating * 10) / 10}</span>
            <span className="italic">({numberOfReviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
