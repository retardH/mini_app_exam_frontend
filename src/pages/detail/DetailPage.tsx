import { useParams } from "react-router";
import dataJson from "@/data.json";
import TopBar from "@/components/top-bar/TopBar";
import { LoveIcon, StarIcon } from "@/components/icons";
import OrderInformation from "@/components/order-info/OrderInformation";
import { useAppContext } from "@/context/AppContext";

const DetailPage = () => {
  const { id = "" } = useParams();
  const { state, dispatch } = useAppContext();
  const productDetail = dataJson.find((product) => product.id === +id);

  return (
    <>
      <TopBar
        title="Product Detail"
        renderRightIcon={() => (
          <button>
            <LoveIcon />
          </button>
        )}
      />
      <div className="mt-[60px] h-[calc(100vh-60px)] flex flex-col gap-2 p-2 pt-1">
        <section className="flex-grow space-y-3">
          <figure className="w-full flex items-center justify-center p-4 rounded-md bg-white">
            <img
              src={productDetail?.image}
              alt={productDetail?.name}
              width={200}
              className="w-[200px] object-contain object-center"
            />
          </figure>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {productDetail?.category.map((cat) => {
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
              <div className="flex items-center gap-1">
                <StarIcon
                  width={20}
                  height={20}
                  fill="#f59e0b"
                  strokeColor="#f59e0b"
                />
                <span className="text-sm">4.5</span>
              </div>
            </div>
            <h4 className="text-xl font-medium">{productDetail?.name}</h4>
            <p>${productDetail?.price}</p>
          </div>
          <div className="w-full h-[0.5px] bg-stone-400"></div>
          <div>
            <span>Description</span>
            <p className="text-sm text-stone-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              reiciendis obcaecati, a dignissimos sed non fuga corporis modi
              fugiat, eum commodi expedita odit quae quaerat, sunt explicabo
              mollitia inventore sit.
            </p>
          </div>
        </section>
        <div>
          <OrderInformation
            renderTriggerBtn={() => (
              <button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      id: productDetail?.id,
                      name: productDetail?.name,
                      price: productDetail?.price,
                      image: productDetail?.image,
                      quantity: 1,
                    },
                  });
                }}
                className="py-2 px-4 w-full text-white bg-green-600 rounded-md"
              >
                Add to Cart
              </button>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
