import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { httpOptions } from "../services/httpOptions";
import { DEFAULT_API_CONTEXT } from "../services/uriNavigation";

const GET_PRODUCTS = "/products";

const fetchProducts = () => {
  return axios(`${DEFAULT_API_CONTEXT}/products`, {
    ...httpOptions.get("GET"),
  });
};

const useFetchProducts = () => {
  return useQuery({
    queryKey: [GET_PRODUCTS],
    queryFn: () => fetchProducts(),
    select: ({ data }) => data,
  });
};

export { useFetchProducts };
