import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { httpOptions } from "../services/httpOptions";
import { DEFAULT_API_CONTEXT } from "../services/uriNavigation";

const PRODUCTS = "/products";
const CATEGORIES = "/categories";
const SINGLE_PRODUCT = "/product";
const SINGLE_CATEGORY_PRODUCTS = `${PRODUCTS}${CATEGORIES}`;

const fetchProducts = (sort) => {
  return axios(`${DEFAULT_API_CONTEXT}/products?sort=${sort}`, {
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

const fetchProductsFromCategory = (category, sort) => {
  return axios(
    `${DEFAULT_API_CONTEXT}/products/category/${category}?sort=${sort}`,
    {
      ...httpOptions.get("GET"),
    }
  );
};

const useFetchProducts = (sort = "asc") => {
  return useQuery({
    queryKey: [PRODUCTS],
    queryFn: () => fetchProducts(sort),
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

const useFetchProductsFromCategory = (category, sort = "asc") => {
  return useQuery({
    queryKey: [SINGLE_CATEGORY_PRODUCTS, category],
    queryFn: () => fetchProductsFromCategory(category, sort),
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
