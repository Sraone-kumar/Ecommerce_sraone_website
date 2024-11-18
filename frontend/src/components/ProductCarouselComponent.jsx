import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1ui3tHewthbZD5YS0vQxUeJ0HtQwIk5fJw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgfTou4u7qyLetKPI39fjFgFAIuw6d4_Syg&s",
  "/slides/one.png",
  "/slides/two.jpg",
  "/slides/three.jpg  ",
  "/slides/four.jpg",
];

export default function ProductCarouselComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => setCurrentIndex(slideIndex);
  return (
    <div className="max-w-full h-[60vh] w-full   relative">
      <div className="flex px-8 absolute inset-0    items-center justify-between">
        <button
          onClick={prevSlide}
          className="p-2 pr-2.5  rounded-full shadow  bg-white/80 hover:bg-white"
        >
          <ChevronLeftIcon className="-mr-1 h-5 w-6  " />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 pr-2.5 rounded-full shadow bg-white/80 hover:bg-white"
        >
          <ChevronRightIcon className="-mr-1 h-5 w-6" />
        </button>
      </div>
      <div className="flex pb-6 absolute bottom-5  left-[50%] translate-x-[-50%] -translate-y-0 gap-2 ">
        {images.map((image, index) => {
          if (currentIndex === index) {
            return (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className=" size-3 rounded-full cursor-pointer bg-black shadow "
              ></div>
            );
          } else {
            return (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className=" size-3 rounded-full bg-slate-300 cursor-pointer shadow"
              ></div>
            );
          }
        })}
      </div>
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="flex text-3xl font-bold  items-end pb-32 text-white justify-center w-full h-full  bg-center bg-cover  duration-500"
      >
        <span className="text-slate-200">Best Seller in Consoles category</span>
      </div>
    </div>
  );
}
