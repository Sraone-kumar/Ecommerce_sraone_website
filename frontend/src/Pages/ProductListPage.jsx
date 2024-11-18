import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";

export default function ProductListPage() {
  return (
    <div>
      <div
        id="filterBar"
        className=" flex flex-col  p-2 gap-5 w-60 bg-slate-200 overflow-auto"
      >
        <SortOptionsComponent />
        <PriceFilterComponent />
        <RatingFilterComponent />
        <CategoryFilterComponent />
        <AttributesFilterComponent />
      </div>
      <div id="productsAndPagination" className="flex flex-col">
        <div id="prodcutsListContainer"></div>
        <div id="pagination"></div>
      </div>
    </div>
  );
}
