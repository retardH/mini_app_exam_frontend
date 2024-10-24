import { FC } from "react";
import { LoveIcon, StarIcon } from "../icons";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  rating: number;
  isFavorite: boolean;
  onFavoriteIconClick: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  price,
  image,
  rating,
  isFavorite,
  onFavoriteIconClick,
}) => {
  return (
    <div className="w-full relative p-3 pt-4 rounded-md flex-col bg-white flex items-center justify-center gap-1 border">
      <button
        className="absolute p-1 top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteIconClick();
        }}
      >
        <LoveIcon
          width={16}
          height={16}
          strokeColor="red"
          fill={isFavorite ? "red" : "none"}
        />
      </button>
      <img
        className="object-contain w-[120px] h-[120px] object-center"
        src={image}
        alt={name}
        width={120}
        height={120}
      />
      <div className="w-full">
        <h4 className="text-md w-full truncate">{name}</h4>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-sm">${price}</p>
        <div className="flex items-center gap-1">
          <StarIcon
            // fill="#f59e0b"
            strokeColor="#f59e0b"
            width={20}
            height={20}
          />
          <span className="text-sm">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
