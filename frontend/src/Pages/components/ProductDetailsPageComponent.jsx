import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Textarea,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { addToCart } from "../../Redux/cartSlice";
import api from "../../axiosbase";
import { NavLink } from "react-router-dom";
export default function ProductDetailsPageComponent({
  fetchProduct,
  dispatch,
  productId,
}) {
  const [quantity, setQuantity] = useState({});
  const [product, setProduct] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct().then((data) => setProduct(data));
  }, []);

  useEffect(() => {}, [quantity]);

  return (
    <div className="w-full  p-5 min-h-screen gap-5 flex flex-col">
      <div id="productDetailsImagesAndAddToCart" className="flex ">
        <div
          id="imageContainer"
          className="w-[150px] min-w-[150px] flex flex-col gap-3"
        >
          <div className="">
            <img
              className="w-full h-full  object-cover"
              src="https://m.media-amazon.com/images/I/61MvrHP73ZL._AC_UL480_FMwebp_QL65_.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="https://m.media-amazon.com/images/I/71m1Mlg3NWL._AC_UL480_FMwebp_QL65_.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src="https://m.media-amazon.com/images/I/61MvrHP73ZL._AC_UL480_FMwebp_QL65_.jpg"
              alt=""
            />{" "}
          </div>
        </div>
        <div id="productDetails" className="flex flex-col p-2 flex-grow  ">
          <span className="text-3xl">
            {/* Product1 lenovo comp1 name lorem dolor sit amet */}
            {product.name}
          </span>
          <div className="border-t-2 py-2  relative ">
            <RatingComponent />
          </div>
          <span className="border-t-2 py-2 ">
            price: <b>{`$${product.price}`}</b>
          </span>
          <span className="text-sm border-t-2 py-2 ">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia omnis
            harum impedit natus! Eaque voluptatibus non quod officiis nihil odit
            dolores labore, aut, ipsum ad, dolor mollitia nobis repudiandae
            quasi! */}
            {product.description}
          </span>
        </div>
        <div
          id="addToCartContainer"
          className="flex min-w-fit h-fit rounded border-2 text-sm  p-2 gap-2 flex-col"
        >
          <span>status: in stock</span>
          <span className="">
            Price:<b>{`$${product.price}`}</b>
          </span>
          <div className="flex flex-col gap-2">
            <span>quantity:</span>
            <DropDownBox
              setQuantity={setQuantity}
              optionsListData={Array.from(Array(product.count), (e, i) => {
                return { id: i + 1, value: `${i + 1}` };
              })}
              width={"100px"}
            />
          </div>
          <button
            onClick={() => {
              api.get(`/api/products/get-one/${productId}`).then((res) => {
                const data = res.data;
                dispatch(
                  addToCart({
                    name: data.name,
                    productID: data._id,
                    quantity: Number(quantity.value),
                    image: data.images[0] ?? null,
                    price: data.price,
                    count: data.count,
                  })
                );
              });

              setIsAddedToCart(true);
            }}
            className="w-fit hover:bg-slate-900/75 bg-slate-900 text-white flex items-center justify-center p-2 rounded-sm shadow"
          >
            Add to cart
          </button>
          {isAddedToCart && (
            <>
              <span className="text-green-500">Item added to cart! </span>
              <NavLink className={"text-blue-500"} to={"/cart"}>
                go to cart
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div
        id="reviews"
        className="flex max-w-[600px] m-auto flex-col justify-center"
      >
        <div className="font-semibold text-xl">REVIEWS</div>
        <div className="flex text-sm p-2 flex-col">
          <span className="">John Doe</span>
          <span>
            <RatingComponent />
          </span>
          <span>2022-03-16</span>
          <span className="text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
            numquam quae fuga nisi molestiae labore assumenda eos, optio
            corporis itaque odio cupiditate enim ad architecto perferendis
            recusandae laboriosam consectetur aut.
          </span>
        </div>
        <div className="flex text-sm p-2 flex-col">
          <span className="">John Doe</span>
          <span>
            <RatingComponent />
          </span>
          <span>2022-03-16</span>
          <span className="text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
            numquam quae fuga nisi molestiae labore assumenda eos, optio
            corporis itaque odio cupiditate enim ad architecto perferendis
            recusandae laboriosam consectetur aut.
          </span>
        </div>
        <div id="reviewComponent">
          <span className="font-semibold">Write a review</span>
          <TextBoxComponent />
          <span>
            your Rating:{" "}
            <DropDownBox
              optionsListData={[
                { id: 1, value: "your Rating" },
                { id: 2, value: "1" },
                { id: 3, value: "2" },
                { id: 4, value: "3" },
                { id: 5, value: "4" },
                { id: 6, value: "5" },
              ]}
              width={"100px"}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function RatingComponent() {
  return (
    <div className="flex items-center relative w-fit">
      <div className="absolute text-sm -top-2 -right-4">(5)</div>
      <svg
        className="w-4 h-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg
        className="w-4 h-4 text-yellow-300 ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg
        className="w-4 h-4 text-yellow-300 ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg
        className="w-4 h-4 text-yellow-300 ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg
        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    </div>
  );
}

function DropDownBox({ setQuantity, optionsListData, width }) {
  let optionsList = [];

  if (optionsListData) {
    optionsList = [...optionsListData];
  } else {
    optionsList = [
      { id: 1, value: "1" },
      { id: 2, value: "2" },
      { id: 3, value: "3" },
      { id: 4, value: "4" },
      { id: 5, value: "5" },
    ];
  }

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(optionsList[0]);

  useEffect(() => {
    setQuantity && setQuantity(selected);
  }, [selected, setQuantity]);

  const filteredOptionsList =
    query === ""
      ? optionsList
      : optionsList.filter((option) => {
          return option.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="text-black focus:border-2 focus:border-slate-900 border-2 rounded-md w-fit">
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          setQuantity(value);
        }}
        onClose={() => setQuery("")}
      >
        <div className="flex">
          <ComboboxInput
            className={clsx(
              "outline-none focus:outline-none rounded-lg py-1.5 pl-3 text-sm ",
              `w-[${width}]`
            )}
            displayValue={(option) => option?.value}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="px-1">
            <ChevronDownIcon className="size-4 fill-slate-900 group-data-[hover]:fill-slate-900/50" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            `w-[${width}] rounded-xl border-2 bg-slate-900 p-1 [--anchor-gap:2px] empty:invisible`,
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredOptionsList.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white ">{option.value}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

function TextBoxComponent() {
  return (
    <div className="w-full py-2 max-w-md ">
      <Field>
        <Textarea
          className={clsx(
            "block w-full resize-none rounded-lg border-2  py-1.5 px-3 text-sm/6 ",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-slate-900/50"
          )}
          rows={3}
        />
      </Field>
    </div>
  );
}
