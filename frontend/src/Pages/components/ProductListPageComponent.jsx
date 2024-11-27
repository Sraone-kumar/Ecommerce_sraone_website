import { useCallback, useEffect, useState } from "react";
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import SortOptionsComponent from "../../components/SortOptionsComponent";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export default function ProductListPageComponent({ getProducts }) {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [pagination, setPagination] = useState({ pageNum: 0, TotalPages: 0 });

  const fetchData = useCallback(
    (pageNum = "") =>
      getProducts(pageNum)
        .then((products) => {
          setFetchedProducts(products.products);
          setPagination({
            pageNum: Number(products.pageNum),
            TotalPages: Number(products.paginationLinksNumber),
          });
        })
        .catch((er) => console.log(er)),
    [getProducts, setFetchedProducts, setPagination]
  );
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //   useEffect(() => {
  //     console.log(fetchedProducts);
  //   }, [fetchedProducts]);

  return (
    <div className="flex min-h-screen">
      <div
        id="filterBar"
        className=" flex flex-col min-w-[200px]  p-2 gap-5 w-60 bg-slate-200 overflow-auto"
      >
        <SortOptionsComponent />
        <PriceFilterComponent />
        <RatingFilterComponent />
        <CategoryFilterComponent />
        <AttributesFilterComponent />
      </div>
      <div id="productsAndPagination" className="flex flex-col">
        <div className="flex flex-col gap-2" id="prodcutsListContainer">
          {fetchedProducts.map((product) => {
            return <Product key={product._id} productDetails={product} />;
          })}
          {/* <Product /> */}
        </div>
        <div
          id="pagination"
          className="py-10 px-3 flex items-center justify-end"
        >
          <Pagination pagination={pagination} getProducts={fetchData} />
        </div>
      </div>
    </div>
  );
}

function Product({ productDetails }) {
  return (
    <div className="flex items-center border-b-2  p-4 gap-4">
      <div className="min-w-[250px] h-[250px]">
        <img
          src={
            //TODO: pass dynamic path of image fetched from db.
            "https://placehold.co/250x250"
          }
          className="w-full h-full object-cover"
          alt="image suppose to be loaded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{productDetails.name}</span>
        <span className="text-sm">{productDetails.description}</span>
        <div>Rating:{productDetails.rating}</div>
        <div>Number of reviews:{productDetails.reviewsNumber}</div>
        <span className="font-semibold">{`$ ${productDetails.price}`}</span>
        <NavLink to={`/product-details/${productDetails._id}`}>
          <button className="flex items-center justify-center w-fit shadow px-6 p-2  rounded-sm text-white bg-slate-900">
            see product
          </button>
        </NavLink>
      </div>
    </div>
  );
}

function Pagination({ pagination, getProducts }) {
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = (setPage) => {
    if (setPage === "Inc") {
      if (currentPage + 1 <= pagination.TotalPages) {
        getProducts(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }
    } else if (setPage === "Dec") {
      if (currentPage - 1 >= 1) {
        getProducts(currentPage - 1);

        setCurrentPage(currentPage - 1);
      }
    } else {
      getProducts(setPage);
      setCurrentPage(setPage);
    }
  };

  useEffect(() => {
    // console.log(`pagination: ${pagination.pageNum},${pagination.TotalPages}`);
    // console.log(`currentpage: ${currentPage}`);
    setCurrentPage(pagination.pageNum);
  }, [pagination]);

  useEffect(() => {
    console.log(`currentPage:${currentPage}`);
  }, [currentPage]);
  return (
    <div className="flex gap-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleCurrentPage("Dec");
        }}
        className="p-3 bg-slate-900 rounded-sm"
      >
        <ChevronLeftIcon className="size-4 fill-white" />
      </button>
      {/* <button className="border-2 px-3 border-slate-900">1</button>
      <button className="border-2 px-3 border-slate-900">2</button>
      <button className="border-2 px-3 border-slate-900">3</button> */}
      {Array.from(Array(pagination.TotalPages), (e, i) => {
        return (
          <button
            key={i}
            value={i + 1}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCurrentPage(e.target.value);
            }}
            className={
              currentPage === i + 1
                ? "px-3 bg-slate-900 text-white"
                : "border-2 px-3 border-slate-900"
            }
          >
            {i + 1}
          </button>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleCurrentPage("Inc");
        }}
        className="p-3 bg-slate-900 rounded-sm"
      >
        <ChevronRightIcon className="size-4 fill-white" />
      </button>
    </div>
  );
}
