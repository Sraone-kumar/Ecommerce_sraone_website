import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function RegisterPageComponent({
  registerUserApiReq,
  reduxDispatch,
  setReduxUserState,
}) {
  const [registerUserResState, setRegisterUserResState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const [isMatch, setIsMatch] = useState("true");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget.elements;
    const email = form.email.value;
    const firstname = form.firstName.value;
    const lastName = form.lastName.value;
    const password = form.password.value;

    if (
      e.currentTarget.checkValidity() === true &&
      email &&
      firstname &&
      lastName &&
      password &&
      isMatch
    ) {
      setRegisterUserResState({ loading: true });
      registerUserApiReq(firstname, lastName, email, password)
        .then((data) => {
          setRegisterUserResState({
            success: data.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        .catch((er) =>
          setRegisterUserResState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
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
                  htmlFor="repassword"
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
                className="flex w-full items-center justify-center rounded-md bg-slate-900 min-h-9 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-900/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* Register */}
                {registerUserResState.loading ? <Spinner /> : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <NavLink
              to={"/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              login here
            </NavLink>
          </p>

          <div
            className={`${
              registerUserResState &&
              registerUserResState.error === "user exists"
                ? ""
                : "hidden"
            } mt-2 py-2 text-center text-sm text-red-900 bg-red-300 rounded-md`}
          >
            user with that email exists
          </div>
        </div>
      </div>
    </>
  );
}

function Spinner() {
  return (
    <div className="size-4  border-x-2 animate-spin border-x-white border-t-2 border-b-2 border-b-slate-900 border-t-white rounded-lg"></div>
  );
}
