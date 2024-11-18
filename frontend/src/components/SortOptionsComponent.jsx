import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const sortList = [
  { id: 0, value: "sort by" },
  { id: 1, value: "AtoZ" },
  { id: 2, value: "Price High to Low" },
  { id: 3, value: "Price Low to High" },
];

export default function SortOptionsComponent() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(sortList[0]);

  const filteredsortList =
    query === ""
      ? sortList
      : sortList.filter((sortOption) => {
          return sortOption.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={(value) => setSelected(value)}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "w-full rounded-lg border-none bg-white py-1.5 pr-8 pl-3 text-sm/6 ",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-slate-900/50"
          )}
          displayValue={(sortOption) => sortOption?.value}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-slate-900/60 group-data-[hover]:fill-slate-900" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] rounded-xl  bg-slate-900 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {filteredsortList.map((sortOption) => (
          <ComboboxOption
            key={sortOption.id}
            value={sortOption}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
          >
            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
            <div className="text-sm/6 text-white">{sortOption.value}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
