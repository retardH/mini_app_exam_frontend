import { SearchIcon, ShoppingBasketIcon } from "@/components/icons";
import OrderInformation from "@/components/order-info/OrderInformation";
import ProductCard from "@/components/product-card/ProductCard";
import dataJson from "@/data.json";
import { Link } from "react-router-dom";

const HomePage = () => {
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
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <SearchIcon width={16} height={16} />
          </button>
        </div>
        <main className="mt-4 grid grid-cols-2 gap-2">
          {dataJson.map((product) => {
            return (
              <Link key={product.id} to={`/detail/${product.id}`}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={4.5}
                />
              </Link>
            );
          })}
        </main>
      </div>
      <OrderInformation
        renderTriggerBtn={() => {
          return (
            <button className="fixed bottom-4 shadow-md right-4 p-3 rounded-full bg-green-600 text-white">
              <ShoppingBasketIcon width={24} height={24} />
            </button>
          );
        }}
      />
    </>
  );
};

export default HomePage;
