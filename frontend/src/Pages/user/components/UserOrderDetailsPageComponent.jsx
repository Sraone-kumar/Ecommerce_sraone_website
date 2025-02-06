import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import CartItemComponent from "../../commonComponents/CartItemComponent";
import { useNavigate, useParams } from "react-router-dom";

export default function UserOrderDetailsPageComponent({
  userInfo,
  itemsCount,
  getUser,
  createOrder,
  getOrder,
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);

  //   const changeQuantity = (productID, quantity) => {
  //     reduxDispatch(addToCart({ productID, quantity }));
  //   };

  //   const removeFromCartHandler = (productID, quantity, price) => {
  //     if (window.confirm("are you sure?")) {
  //       // console.log(productID);
  //       // console.log(quantity);
  //       // console.log(price);
  //       reduxDispatch(removeFromCart({ productID, quantity, price }));
  //     }
  //   };

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        // console.log(`order details ${data}`);

        console.log(data);

        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveretAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);

        if (data.isPaid) {
          setOrderButtonMessage("your order is processed");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "cash on delivery") {
            setOrderButtonMessage(
              "order out for delivery, on wait to recieve payment"
            );
            setButtonDisabled(true);
          } else {
            setOrderButtonMessage("pay for your order");
          }
        }
        console.log(paymentMethod);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
          state: data.state,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((er) => {
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        );
      });
  }, [userInfo._id]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productID: item.productID,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };

    // console.log(orderData);
    createOrder(orderData)
      .then((data) => {
        if (data) {
          navigate("/user/order-details/" + data._id);
        }
      })
      .catch((err) => console.log(err));
  };

  //   const choosePayment = (value) => {
  //     // console.log(value);
  //     setPaymentMethod(value);
  //   };

  return (
    <div className="p-2 flex flex-col">
      <div className="flex justify-between px-10">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-semibold">shipping</span>
          <span>
            <span className="font-bold">Name: </span>
            <span>
              {userInfo.name} {userInfo.lastName}
            </span>
          </span>
          <span>
            <span className="font-bold">Address: </span>
            <span>
              {userAddress.address} {userAddress.city} {userAddress.state}{" "}
              {userAddress.zipCode}
            </span>
          </span>
          <span>
            <span className="font-bold">Phone: </span>
            <span>{userAddress.phoneNumber}</span>
          </span>
          <div
            className={`border-2 ${
              isDelivered
                ? "bg-green-300 border-green-700 text-green-900 "
                : "bg-red-300   border-red-700 text-red-900"
            } px-3 flex items-center py-2 justify-center`}
          >
            <span>
              {isDelivered ? `Delivered at ${isDelivered}` : "Not Delivered"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-3xl font-semibold">choose payment</span>
          <ListBox paymentMethod={paymentMethod} />
          <div
            className={`border-2 ${
              isPaid
                ? "bg-green-300 border-green-700 text-green-900 "
                : "bg-red-300   border-red-700 text-red-900"
            } px-3 flex items-center py-2 justify-center`}
          >
            <span>{isPaid ? `Paid on ${isPaid}` : "Not paid"}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-semibold">order summary</span>
          <span className="border pl-2 py-2">
            Items price(after tax):{`$${cartSubtotal}`}
          </span>
          <span className="border pl-2 py-2">Shipping:include</span>
          <span className="border pl-2 py-2">Tax:included</span>
          <span className="border pl-2 py-2 text-red-400">
            Total price: {`$${cartSubtotal}`}
          </span>
          <button
            disabled={buttonDisabled}
            onClick={orderHandler}
            className="w-full hover:bg-slate-900/90 bg-slate-900 text-white flex items-center justify-center disabled:cursor-not-allowed py-2 rounded-sm"
          >
            {orderButtonMessage}
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        {cartItems &&
          cartItems.map((item, idx) => {
            return (
              <CartItemComponent
                key={item.productID}
                orderCreated={true}
                item={item}
                // changeQuantity={changeQuantity}
                // removeFromCartHandler={removeFromCartHandler}
              />
            );
          })}
      </div>
    </div>
  );
}

function ListBox({ paymentMethod }) {
  const options = [
    { id: 0, name: "" },
    { id: 1, name: "phonepay" },
    { id: 2, name: "paytm" },
    { id: 3, name: "cash on delivery" },
  ];
  const [selected, setSelected] = useState(options[1]);
  useEffect(() => {
    if (paymentMethod) {
      //   console.log("list box payment method ", paymentMethod);
      const option = options.find(({ id, name }) => name === paymentMethod);
      //   console.log(`option ${option}`);
      setSelected(option);
    } else {
      setSelected(options[0]);
    }
  }, [paymentMethod]);
  return (
    <div className="">
      <Listbox value={selected}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-slate-900 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-white/5 bg-slate-900 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.name}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{option.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
