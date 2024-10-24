import { SearchIcon, ShoppingBasketIcon } from "@/components/icons";
import ProductDetailDrawer from "@/components/product-detail-drawer/ProductDetailDrawer";
import { useAppContext } from "@/context/AppContext";
import dataJson from "@/constants";
import { useDebounceState } from "@/hooks/useDebounceState";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import clsx from "clsx";

const HomePage = () => {
  const { state } = useAppContext();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const debouncedSearchInput = useDebounceState(searchInput, 200);

  const totalQuantityInCart = state.cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const filterData = useMemo(() => {
    return dataJson
      .filter((data) => {
        if (selectedCategory !== "all") {
          if (!data.category.includes(selectedCategory)) {
            return false;
          }
          return true;
        }
        return true;
      })
      .filter((data) => {
        if (
          data.name
            .toLocaleLowerCase()
            .startsWith(debouncedSearchInput.toLocaleLowerCase())
        ) {
          return true;
        }
        return false;
      });
  }, [debouncedSearchInput, selectedCategory]);

  return (
    <>
      <div className="py-4 px-2">
        <div className="mb-4">
          <h5>Hello, User</h5>
          <h3 className="font-medium text-xl">
            Let's get some fresh items for you!
          </h3>
        </div>
        <div className="flex relative">
          <input
            placeholder="Search products..."
            className="bg-white w-full py-2 text-sm px-3 border placeholder:text-sm border-transparent focus:outline-none focus:border-green-600 rounded-full shadow-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <SearchIcon width={16} height={16} />
          </button>
        </div>
        <div className="my-2">
          <ScrollArea className="w-full whitespace-nowrap p-2">
            <div className="flex items-center gap-2">
              {["all", "veggies", "meats", "drinks", "fishes", "fruits"].map(
                (category) => {
                  return (
                    <div
                      key={category}
                      role="button"
                      className={clsx(
                        "border px-4 py-1 min-w-[60px] capitalize rounded-full text-sm text-center",
                        category === selectedCategory &&
                          "bg-green-500 text-white"
                      )}
                      onClick={() => {
                        setSelectedCategory(category);
                      }}
                    >
                      {category}
                    </div>
                  );
                }
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <h4 className="text-lg mb-2 underline underline-offset-4 capitalize decoration-stone-300">
          {selectedCategory !== "all" ? selectedCategory : "All Items"}
        </h4>
        <main className="grid grid-cols-2 gap-2">
          {filterData.map((product) => {
            const initialQuantityInCart =
              state.cart.find((item) => item.id === product.id)?.quantity || 1;
            return (
              <ProductDetailDrawer
                key={product.id}
                product={product}
                initialProductQuantityInCart={initialQuantityInCart}
              />
            );
          })}
        </main>
      </div>
      {/* <OrderInformation
        renderTriggerBtn={() => {
          return (
            <button className="fixed bottom-4 shadow-md right-4 p-3 rounded-full bg-green-600 text-white">
              <ShoppingBasketIcon width={24} height={24} />
            </button>
          );
        }}
      /> */}
      <Link
        to="/order-info"
        className="fixed bottom-4 shadow-md right-4 p-3 rounded-full bg-green-600 text-white"
      >
        <div className="absolute top-0 right-0 text-center flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-white text-[10px]">
          {totalQuantityInCart}
        </div>
        <ShoppingBasketIcon width={24} height={24} />
      </Link>
    </>
  );
};

export default HomePage;
