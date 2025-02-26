import { NavLink, useNavigate } from "react-router-dom";

export default function CategoryCardComponent({ data }) {
  const navigate = useNavigate();
  return (
    <div className="flex overflow-hidden flex-col w-[350px] h-[450px] border-2 border-solid border-slate-400 shadow rounded-lg ">
      <div className="flex h-[60%] bg-green-300">
        <img
          className="w-full h-full object-cover"
          src={data.image}
          alt={data.name}
        />
      </div>
      <div className="flex p-2 gap-2 text-sm flex-col">
        <span className="font-bold text-lg">{data.name}</span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet vero
          corporis doloremque accusamus,
        </span>
        <NavLink to={"/product-list"}>
          <button className="flex w-fit text-white bg-slate-800 p-2 shadow rounded-sm hover:bg-slate-900 ">
            go to category
          </button>
        </NavLink>
      </div>
    </div>
  );
}
