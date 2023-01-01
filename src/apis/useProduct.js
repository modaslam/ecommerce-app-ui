import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { httpOptions } from "../services/httpOptions";
import { DEFAULT_API_CONTEXT } from "../services/uriNavigation";

const PRODUCTS = "/products";
const CATEGORIES = "/categories";
const SINGLE_PRODUCT = "/product";
const SINGLE_CATEGORY_PRODUCTS = `${PRODUCTS}${CATEGORIES}`;

const fetchProducts = () => {
  return axios(`${DEFAULT_API_CONTEXT}/products`, {
    ...httpOptions.get("GET"),
  });
};

const fetchSingleProduct = (productId) => {
  return axios(`${DEFAULT_API_CONTEXT}/products/${productId}`, {
    ...httpOptions.get("GET"),
  });
};

const fetchAllCategories = () => {
  return axios(`${DEFAULT_API_CONTEXT}/products/categories`, {
    ...httpOptions.get("GET"),
  });
};

const fetchProductsFromCategory = (category) => {
  return axios(
    `${DEFAULT_API_CONTEXT}/products/category/${category}`,
    {
      ...httpOptions.get("GET"),
    }
  );
};

const useFetchProducts = () => {
  return useQuery({
    queryKey: [PRODUCTS],
    queryFn: () => fetchProducts(),
    select: ({ data }) => data,
  });
};

const useFetchAllCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES],
    queryFn: () => fetchAllCategories(),
    select: ({ data }) => data,
  });
};

const useFetchProductsFromCategory = (category) => {
  return useQuery({
    queryKey: [SINGLE_CATEGORY_PRODUCTS, category],
    queryFn: () => fetchProductsFromCategory(category),
    select: ({ data }) => data,
    enabled: !!category,
  });
};

const useFetchSingleProduct = (productId) => {
  return useQuery({
    queryKey: [SINGLE_PRODUCT, productId],
    queryFn: () => fetchSingleProduct(productId),
    select: ({ data }) => data,
  });
};

export {
  useFetchProducts,
  useFetchAllCategories,
  useFetchProductsFromCategory,
  useFetchSingleProduct,
};
