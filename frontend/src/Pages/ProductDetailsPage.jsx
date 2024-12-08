import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import api from "../axiosbase";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    const { data } = await api.get(`/api/products/get-one/${id}`);
    // console.log("data:", data);
    return data;
  };
  return (
    <ProductDetailsPageComponent
      fetchProduct={fetchProduct}
      dispatch={dispatch}
      productId={id}
    />
  );
}
