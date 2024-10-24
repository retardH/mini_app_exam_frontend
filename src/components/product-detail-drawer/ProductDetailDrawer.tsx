import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

import { MinusIcon, PlusIcon } from "@/components/icons";
import { FC, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import { useAppContext } from "@/context/AppContext";

interface ProductDetailsProps {
  product: Record<string, any>;
  initialProductQuantityInCart: number;
}
const ProductDetailDrawer: FC<ProductDetailsProps> = ({
  product,
  initialProductQuantityInCart,
}) => {
  const [productQuantity, setProductQuantity] = useState(
    initialProductQuantityInCart
  );
  const handleIncreaseQuantity = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setProductQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const { dispatch, state } = useAppContext();

  const isFavorite = !!state.favoriteItems.find(
    (item) => item.id === product.id
  );

  const handleFavoriteIconClick = () => {
    dispatch({
      type: "TOGGLE_FAVORITE_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      },
    });
  };

  return (
    <Drawer key={product.id}>
      <DrawerTrigger asChild>
        <div role="button">
          <ProductCard
            name={product.name}
            price={product.price}
            image={product.image}
            rating={4.5}
            isFavorite={isFavorite}
            onFavoriteIconClick={handleFavoriteIconClick}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader>
          <DrawerTitle>
            <img
              src={product.image}
              alt={product.name}
              height={200}
              className="w-full h-[200px] object-contain object-center"
            />
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-2 py-1">
          <h4 className="text-xl font-medium">{product.name}</h4>
          <div className="flex items-center gap-1 my-1">
            {product.category.map((cat: string) => {
              return (
                <div
                  key={cat}
                  className="max-w-min capitalize text-xs py-1 px-4 rounded-full bg-green-100 text-green-600"
                >
                  {cat}
                </div>
              );
            })}
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores,
            delectus. Doloremque rem nemo, nulla iure commodi nesciunt
            obcaecati, quidem, consequatur culpa tenetur soluta at laborum illum
            excepturi reiciendis quasi qui. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-3 px-2">
              <button onClick={handleDecreaseQuantity}>
                <MinusIcon width={16} height={16} />
              </button>
              <span className="text-sm text-center w-[15px]">
                {productQuantity}
              </span>
              <button onClick={handleIncreaseQuantity}>
                <PlusIcon width={16} height={16} />
              </button>
            </div>
            <DrawerClose asChild>
              <button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      id: product?.id,
                      name: product?.name,
                      image: product?.image,
                      price: product?.price,
                      quantity: productQuantity,
                    },
                  });
                }}
                className="text-white flex-1 rounded-md bg-green-600 py-2 px-4"
              >
                Add to Cart
              </button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDetailDrawer;
