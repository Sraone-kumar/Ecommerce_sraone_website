import { useState } from "react";

const priceRange = { min: 1, max: 500 };

export default function PriceFilterComponent() {
  const [price, setPrice] = useState(40);
  return (
    <div className="flex border-t border-slate-900/30 flex-col gap-1">
      <span className="font-semibold">Filter:</span>
      <span className="text-sm">Price no greater than ${price}</span>
      <input
        className="mt-1 appearance-none accent-slate-900  outline-none rounded-full h-[8px]"
        type="range"
        min={priceRange?.min}
        max={priceRange?.max}
        value={price}
        onInput={(e) => setPrice(e.target.value)}
      />
    </div>
  );
}
