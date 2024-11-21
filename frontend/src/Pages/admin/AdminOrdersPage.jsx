import { useDispatch } from "react-redux";
import { userLogout } from "../../Redux/userSlice";

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <span>Admin orders page currently under build</span>
      <button
        onClick={() => dispatch(userLogout())}
        className="bg-slate-900 text-white p-2 rounded-sm"
      >
        logout
      </button>
    </div>
  );
}
