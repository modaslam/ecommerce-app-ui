import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { httpOptions } from "../services/httpOptions";
import { DEFAULT_API_CONTEXT } from "../services/uriNavigation";

const USER_CART = "/carts/user";

const fetchUserCart = (userId) => {
  return axios(`${DEFAULT_API_CONTEXT}/carts/user/${userId}`, {
    ...httpOptions.get("GET"),
  });
};

const useFetchUserCart = (userId) => {
  return useQuery({
    queryKey: [USER_CART],
    queryFn: () => fetchUserCart(userId),
    select: ({ data }) => data,
  });
};

export { useFetchUserCart };
