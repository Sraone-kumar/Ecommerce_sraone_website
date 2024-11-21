import { Checkbox } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPageComponent({
  loginUserRequest,
  reduxDispatch,
  userRegisterLoginRedux,
}) {
  const [enabled, setEnabled] = useState(false);
  const [loginUserRes, setLoginUserRes] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const keepMeSignedIn = form.keepMeSignedIn.checked;

    if (e.currentTarget.checkValidity() === true && email && password) {
      setLoginUserRes({ loading: true });
      loginUserRequest(email, password, keepMeSignedIn)
        .then((res) => {
          setLoginUserRes({ success: res.success, loading: false, error: "" });
          if (res.userLoggedIn)
            reduxDispatch(userRegisterLoginRedux(res.userLoggedIn));
          if (res.success === "user logged in" && !res.userLoggedIn.isAdmin)
            navigate("/user/profile", { replace: true });
          else navigate("/admin/orders", { replace: true });
        })
        .catch((error) =>
          setLoginUserRes({
            error: error.response.data.message
              ? error.response.data.message
              : error.response.data,
            loading: false,
          })
        );
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <KeepMeSignedIn enabled={enabled} setEnabled={setEnabled} />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md min-h-9 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-900/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* Sign in */}
                {loginUserRes.loading ? <Spinner /> : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No Account?{" "}
            <NavLink
              to={"/register"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </NavLink>
          </p>
          <div
            className={`${
              loginUserRes && loginUserRes.error === "Invalid credentials"
                ? ""
                : "hidden"
            } mt-2 py-2 text-center text-sm text-red-900 bg-red-300 rounded-md`}
          >
            Invalid username or password
          </div>
        </div>
      </div>
    </>
  );
}

function KeepMeSignedIn({ enabled, setEnabled }) {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        id="keepMeSignedIn"
        name="keepMeSignedIn"
        checked={enabled}
        onChange={setEnabled}
        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
      >
        {/* Checkmark icon */}
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      <span className="text-black">keep me signed in</span>
    </div>
  );
}

function Spinner() {
  return (
    <div className="size-4 border-x-2 animate-spin border-x-white border-t-2 border-b-2 border-b-slate-900 border-t-white rounded-lg"></div>
  );
}
