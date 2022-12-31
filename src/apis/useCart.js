import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { httpOptions } from "../services/httpOptions";
import { DEFAULT_API_CONTEXT } from "../services/uriNavigation";

const USER_CART = "USER_CART";
const CREATE_CART = "CREATE_CART";
const UPDATE_CART = "UPDATE_CART";
const DELETE_CART = "DELETE_CART";

const fetchUserCart = (userId) => {
  return axios(`${DEFAULT_API_CONTEXT}/carts/user/${userId}`, {
    ...httpOptions.get("GET"),
  });
};

const createCart = () => {
  return axios.post(`${DEFAULT_API_CONTEXT}/carts`, data, {
    ...httpOptions.get("POST", true, httpOptions.getContentOptionsJSON()),
  });
};

const updateCart = ({ id, data }) => {
  return axios.post(`${DEFAULT_API_CONTEXT}/carts/${id}`, data, {
    ...httpOptions.get("PUT", true, httpOptions.getContentOptionsJSON()),
  });
};

const deleteCart = (cartId) => {
  return axios(`${DEFAULT_API_CONTEXT}/carts/${cartId}`, {
    ...httpOptions.get("DELETE"),
  });
};

const useFetchUserCart = (userId) => {
  return useQuery({
    queryKey: [USER_CART, userId],
    queryFn: () => fetchUserCart(userId),
    select: ({ data }) => data,
  });
};

const useCreateCart = () => {
  return useMutation(createCart, {
    queryKey: [CREATE_CART],
  });
};

const useUpdateCart = () => {
  return useMutation(updateCart, {
    queryKey: [UPDATE_CART],
    onSuccess: () => {
      queryClient.invalidateQueries([USER_CART]);
    },
  });
};

const useDeleteCart = () => {
  return useMutation(deleteCart, {
    queryKey: [DELETE_CART],
    onSuccess: () => {
      queryClient.invalidateQueries([USER_CART]);
    },
  });
};

export { useFetchUserCart, useCreateCart, useUpdateCart, useDeleteCart };
