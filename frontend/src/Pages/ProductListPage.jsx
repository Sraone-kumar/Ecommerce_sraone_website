import api from "../axiosbase";
import ProductListPageComponent from "./components/ProductListPageComponent";

const getProducts = async (pageNum = "") => {
  const url = `/api/products${pageNum !== "" ? `?pageNum=${pageNum}` : ""}`;
  console.log(url);
  const { data } = await api.get(url);
  console.log(data);
  return data;
};

export default function ProductListPage() {
  return <ProductListPageComponent getProducts={getProducts} />;
}
