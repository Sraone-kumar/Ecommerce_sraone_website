import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChatComponent";

export default function RoutesWithUserChatComponent() {
  return (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  );
}
