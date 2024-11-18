import { Link } from "react-router-dom";

export default function UserOrdersPage() {
  return (
    <div className="min-h-screen pt-20 gap-4 w-full items-center flex flex-col">
      <span className="text-2xl font-semibold">My Orders</span>
      <table className="w-[70%]   flex flex-col">
        <thead>
          <tr className="flex border-b-2  border-b-slate-900 h-8 items-center justify-center gap-10 font-bold">
            <td>#</td>
            <td>Date</td>
            <td>Total</td>
            <td>Delivered</td>
            <td>Order details</td>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-slate-900/10 [&>*:nth-child(even)]:bg-slate-900/30 ">
          <tr className="flex h-8  text-sm items-center justify-around ">
            <td>1</td>
            <td>2022-03-17</td>
            <td>100</td>
            <td>x</td>
            <td>
              <Link>go to order</Link>
            </td>
          </tr>
          <tr className="flex h-8 text-sm items-center justify-around ">
            <td>1</td>
            <td>2022-03-17</td>
            <td>100</td>
            <td>x</td>
            <td>
              <Link>go to order</Link>
            </td>
          </tr>
          <tr className="flex h-8 text-sm items-center justify-around ">
            <td>1</td>
            <td>2022-03-17</td>
            <td>100</td>
            <td>x</td>
            <td>
              <Link>go to order</Link>
            </td>
          </tr>
          <tr className="flex h-8 text-sm items-center justify-around ">
            <td>1</td>
            <td>2022-03-17</td>
            <td>100</td>
            <td>x</td>
            <td>
              <Link>go to order</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
