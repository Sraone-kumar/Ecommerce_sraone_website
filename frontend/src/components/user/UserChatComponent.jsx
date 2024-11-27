import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Input } from "@headlessui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function UserChatComponent() {
  const [isClicked, setIsClicked] = useState(true);

  return (
    <div className="flex z-20  items-center justify-center">
      <ChatButton isClicked={isClicked} setIsClicked={setIsClicked} />
      <ChatBox isClicked={isClicked} setIsClicked={setIsClicked} />
    </div>
  );
}

function ChatButton({ isClicked, setIsClicked }) {
  return (
    <button
      onClick={() => setIsClicked(!isClicked)}
      className="size-12 p-3 fixed bottom-8 right-8 rounded-full flex items-center justify-center bg-slate-900"
    >
      {isClicked ? (
        <ChatBubbleOvalLeftEllipsisIcon className="text-white" />
      ) : (
        <XMarkIcon className="text-white" />
      )}
      <div className="absolute size-3 rounded-full bg-red-500 -top-1 left-1"></div>
    </button>
  );
}

function ChatBox({ isClicked, setIsClicked }) {
  return (
    <div
      className={`${
        isClicked ? "hidden " : ""
      }flex flex-col fixed shadow bg-white right-5 bottom-24 w-[250px] h-[300px] transition-all`}
    >
      <div className="min-h-8 bg-slate-900 flex items-center justify-center px-2 text-xs text-white">
        <span className="flex flex-auto items-center justify-center">
          Chat With Admin
        </span>{" "}
        <XMarkIcon
          onClick={() => setIsClicked(!isClicked)}
          className="cursor-pointer size-4"
        />{" "}
      </div>
      <div className="flex overflow-y-auto  flex-auto flex- flex-col-reverse gap-2 p-2 text-xs ">
        <div className="p-1 px-2 w-fit max-w-[70%] rounded-lg bg-slate-300">
          hi how are you fehih fiehfe afoehaife fehi feihafe feihafnveo ah you
          are despicable and you dont know that do you
        </div>
        <div className="p-1 px-2 w-fit self-end rounded-lg bg-slate-300">
          I am fine
        </div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">cool</div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">
          hi how are you
        </div>
        <div className="p-1 px-2 w-fit self-end rounded-lg bg-slate-300">
          I am fine
        </div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">cool</div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">
          hi how are you
        </div>
        <div className="p-1 px-2 w-fit self-end rounded-lg bg-slate-300">
          I am fine
        </div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">cool</div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">
          hi how are you
        </div>
        <div className="p-1 px-2 w-fit self-end rounded-lg bg-slate-300">
          I am fine
        </div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">cool</div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">
          hi how are you
        </div>
        <div className="p-1 px-2 w-fit self-end rounded-lg bg-slate-300">
          I am fine
        </div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">cool</div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">
          hi how are you
        </div>
        <div className="p-1 px-2 w-fit self-end rounded-lg bg-slate-300">
          I am fine
        </div>
        <div className="p-1 px-2 w-fit rounded-lg bg-slate-300">cool</div>
      </div>
      <div className="flex shadow mx-2 mb-2 items-center justify-center  rounded-lg">
        <Input
          className={
            "flex-auto sixe-8 bg-slate-300 resize-none rounded-lg rounded-r-none border-none  py-1.5 px-3 text-sm/6  text-slate-900 focus:outline-none data-[focus]:outline-2  data-[focus]:-outline-offset-2 data-[focus]:outline-slate-900/25"
          }
          rows={1}
        />
        <button className="flex  size-9 border-solid border-2 border-slate-900 rounded-r-lg  items-center justify-center bg-slate-900">
          <PaperAirplaneIcon className=" size-5 text-white" />
        </button>
      </div>
    </div>
  );
}
