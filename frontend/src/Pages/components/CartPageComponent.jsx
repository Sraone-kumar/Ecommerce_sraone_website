import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export default function CartPageComponent({
  addToCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
}) {
  const changeQuantity = (productID, quantity) => {
    reduxDispatch(addToCart({ productID, quantity }));
  };

  return cartItems && cartItems.length > 0 ? (
    <div className="flex flex-col gap-5 min-h-screen w-full">
      <div id="cartItemsComponent" className="flex p-2 w-full flex-col">
        <div
          id="cartHeadings"
          className="flex border-b-2 font-bold items-center justify-between"
        >
          <div className="flex w-[40%] ">Item</div>
          <div className="min-w-[100px] flex justify-center">price</div>
          <div className="min-w-[200px] flex justify-center">Quantity</div>
          <div className="min-w-[100px] flex justify-center">Total</div>
        </div>

        {/* <CartItemComponent />
        <CartItemComponent /> */}

        {cartItems.map((item, idx) => {
          return (
            <CartItemComponent
              key={item.productID}
              item={item}
              changeQuantity={changeQuantity}
            />
          );
        })}
      </div>
      <div
        id="subTotalComponent"
        className="flex px-4 mb-10 self-end flex-col w-[300px] "
      >
        <div className="flex  py-3 justify-between p-2">
          <span className="font-bold">Subtotal:</span>
          <span>{`$${cartSubtotal}`}</span>
        </div>
        <button className="p-2 w-fit hover:bg-slate-900/90 self-end bg-slate-900 rounded-sm shadow flex items-center justify-center text-white">
          checkout
        </button>
      </div>
    </div>
  ) : (
    <CartIsEmptyComponent />
  );
}

function CartItemComponent({ item, orderCreated = false, changeQuantity }) {
  //   console.log(item);
  return (
    <div
      id="item"
      className="flex py-2 border-b-2 items-center justify-between"
    >
      <div className="flex px-2 gap-3 items-center w-[40%] py-4 ">
        <div className=" min-w-[100px] h-[100px] bg-black">
          <img
            className="w-full h-full object-cover"
            src="https://placehold.co/150x150"
            alt=""
          />
        </div>
        <div className="flex  flex-col">
          <span className="text-2xl">{item.title}</span>
          <span className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui earum
            veritatis et quam? Sequi quidem vel ut. Hic, illum poss
          </span>
        </div>
      </div>
      <div className="min-w-[100px] flex justify-center">
        <span>{`$${item.price}`}</span>
      </div>
      <div className="min-w-[200px] flex justify-center">
        <DropDownBox
          itemCount={item.count}
          quantity={item.quantity}
          changeQuantity={changeQuantity}
          productID={item.productID}
          width={"100px"}
        />
      </div>
      <div className="min-w-[100px] flex gap-2 items-center justify-center">
        <span className="font-bold">{`${item.quantity * item.price}`}</span>
        <div className="p-1 cursor-pointer hover:bg-slate-900/90 rounded-full bg-slate-900">
          <XMarkIcon className="size-3 fill-white" />
        </div>
      </div>
    </div>
  );
}

function DropDownBox({
  itemCount,
  quantity,
  changeQuantity,
  productID,
  width,
}) {
  let optionsList = [];

  if (itemCount) {
    optionsList = Array.from(Array(itemCount), (e, i) => {
      return { id: i + 1, value: `${i + 1}` };
    });
  } else {
    optionsList = [{ id: 1, value: "no options" }];
  }

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({});

  useEffect(() => {
    // console.log("quantity:  ", quantity);
    // console.log("productID in dropdown box", productID);
    setSelected({ id: quantity, value: `${quantity}` });
  }, []);

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
        onChange={(option) => {
          changeQuantity(productID, Number(option.value));
          setSelected(option);
        }}
        onClose={() => setQuery("")}
      >
        <div className="flex">
          <ComboboxInput
            className={clsx(
              "outline-none focus:outline-none rounded-lg py-1.5 pl-3 text-sm ",
              "w-[" + width + "]"
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

function CartIsEmptyComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
      <span className="text-slate-900 text-5xl font-light">Cart is Empty!</span>
      <NavLink
        to={"/"}
        className="flex items-center justify-center p-2 text-white rounded-sm bg-slate-900 hover:bg-sla'"
      >
        start shopping
      </NavLink>
    </div>
  );
}
