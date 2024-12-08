import { NavLink } from "react-router-dom";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../Redux/userSlice";

function DropDownAll() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex py-1 gap-1 justify-center  rounded-l-md bg-slate-900 text-white px-3  text-sm     ">
          all
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Games
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Gaming PCs
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Consoles
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                GPUs
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}

function DropDownUser() {
  const dispatch = useDispatch();
  const userName = useSelector((state) =>
    state.user?.userInfo?.name ? state.user.userInfo.name : "user"
  );
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex py-1 gap-1 justify-center   text-white px-3  text-sm     ">
          {userName}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <NavLink
              to={"/user/my-orders"}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 aria-[current=page]:bg-green-400"
            >
              my orders
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to={"/user/profile"}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 aria-[current=page]:bg-green-400"
            >
              my profile
            </NavLink>
          </MenuItem>
          <MenuItem>
            <a
              onClick={() => dispatch(userLogout())}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              logout
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default function HeaderComponent() {
  const { userInfo } = useSelector((state) => state.user);
  const { itemsCount } = useSelector((state) => state.cart);

  return (
    <div className="text-white text-sm px-2 justify-evenly items-center flex h-[50px] bg-slate-800">
      <NavLink to={"/"} className={"font-semibold"}>
        DealsDotCom
      </NavLink>
      <div className="flex">
        <DropDownAll />
        <input
          type="text"
          placeholder="search"
          className="h-7 pl-2  text-black outline-none"
        />
        <button className="flex items-center justify-center w-8 bg-slate-900 rounded-r-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center gap-3">
        {userInfo.isAdmin ? (
          <NavLink to={"/admin/orders"} className={"relative"}>
            Admin
            <div className="absolute top-0 right-0 rounded size-2 bg-red-500"></div>
          </NavLink>
        ) : userInfo.name && !userInfo.isAdmin ? (
          <DropDownUser />
        ) : (
          <>
            <NavLink to={"/login"} className={"relative"}>
              Login
            </NavLink>
            <NavLink to={"/register"} className={"relative"}>
              Register
            </NavLink>
          </>
        )}
        {/* <div>Login</div> */}

        <NavLink to={"/cart"} className="flex items-center justify-center">
          <div className="flex rounded-full text-xs size-4 items-center justify-center bg-red-500 ">
            {/* 1 */}
            {itemsCount}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <span>Cart</span>
        </NavLink>
      </div>
    </div>
  );
}
