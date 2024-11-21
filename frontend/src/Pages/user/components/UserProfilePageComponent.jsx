import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function UserProfilePageComponent({
  updateUserApiRequest,
  fetchUser,
  userInfo,
  userInfoRedux,
  userRegisterLoginDetailsRedux,
  localStorage,
  sessionStorage,
}) {
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [isMatch, setIsMatch] = useState("true");
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id]);

  const [updateUserResState, setUpdateUserResState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUpdateUserResState({ isLoading: true });
    const form = e.currentTarget.elements;
    const name = form.firstName.value;
    const lastname = form.lastName.value;
    const email = form.email.value;
    const phonenumber = form.PhoneNumber.value;
    const address = form.Address.value;
    const country = form.Country.value;
    const postalcode = form.PostalCode.value;
    const city = form.City.value;
    const state = form.State.value;
    const pass = form.password.value;

    if (
      e.currentTarget.checkValidity() === true &&
      pass === form.repassword.value
    ) {
      console.log(
        name,
        lastname,
        email,
        phonenumber,
        address,
        country,
        postalcode,
        city,
        state,
        pass,
        e.currentTarget.repassword.value
      );

      updateUserApiRequest(
        name,
        lastname,
        phonenumber,
        address,
        country,
        postalcode,
        city,
        state,
        pass
      )
        .then((data) => {
          setUpdateUserResState({
            success: data.success,
            error: "",
            isLoading: false,
          });
          userInfoRedux(
            userRegisterLoginDetailsRedux({
              keepMeSignedIn: userInfo.keepMeSignedIn,
              ...data.userUpdated,
            })
          );

          if (userInfo.keepMeSignedIn) {
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ keepMeSignedIn: true, ...data.userUpdated })
            );
          } else {
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ keepMeSignedIn: false, ...data.userUpdated })
            );
          }
        })
        .catch((error) => {
          setUpdateUserResState({
            error: error.response.data.message
              ? error.response.data.message
              : error.response.data,
            loading: false,
          });
        });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            User profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  defaultValue={user.name}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lasName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  defaultValue={user.lastName}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  disabled
                  value={`${user.email} If email needs change, remove and create new account`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="PhoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="PhoneNumber"
                  name="PhoneNumber"
                  type="text"
                  defaultValue={user.phoneNumber}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  placeholder={"Phone number"}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="Adress"
                  name="Address"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  placeholder={"Address"}
                  defaultValue={user.address}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  id="Country"
                  name="Country"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  placeholder={"Country"}
                  defaultValue={user.country}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="PostalCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Postal code
              </label>
              <div className="mt-2">
                <input
                  id="PostalCode"
                  name="PostalCode"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  placeholder={"Postal code"}
                  defaultValue={user.zipCode}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="City"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="City"
                  name="City"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  placeholder={"City"}
                  defaultValue={user.city}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="State"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  id="State"
                  name="State"
                  type="text"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                  placeholder={"State"}
                  defaultValue={user.state}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setPass(e.target.value);
                    setIsMatch(e.target.value === repass);
                  }}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Re-enter password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setRepass(e.target.value);
                    setIsMatch(pass === e.target.value);
                  }}
                  id="repassword"
                  name="repassword"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={`block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    isMatch ? "ring-green-300" : "ring-red-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                    isMatch ? "focus:ring-green-900" : "focus:ring-red-400"
                  } sm:text-sm sm:leading-6`}
                />
                <p className={`text-sm text-red-400 ${isMatch && "hidden"}`}>
                  please re-enter valid password
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-900/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
          <div
            className={`${
              updateUserResState &&
              !updateUserResState.isLoading &&
              updateUserResState.error !== ""
                ? ""
                : "hidden"
            } mt-2 py-2 text-center text-sm text-red-900 bg-red-300 rounded-md`}
          >
            Something went wrong. Try again
          </div>
          <div
            className={`${
              updateUserResState &&
              updateUserResState.success === "user updated"
                ? ""
                : "hidden"
            } mt-2 py-2 text-center text-sm text-green-900 bg-green-300 rounded-md`}
          >
            User updated
          </div>
        </div>
      </div>
    </>
  );
}
