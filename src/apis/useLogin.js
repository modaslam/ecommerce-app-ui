import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { httpOptions } from "../services/httpOptions";
import { DEFAULT_API_CONTEXT } from "../services/uriNavigation";

const LOGIN = "/login";

const login = (data) => {
  return axios.post(`${DEFAULT_API_CONTEXT}/auth/login`, data, {
    ...httpOptions.get("POST", true, httpOptions.getContentOptionsJSON()),
  });
};

const useLogin = () => {
  return useMutation(login, {
    queryKey: [LOGIN],
  });
};

export { useLogin };
