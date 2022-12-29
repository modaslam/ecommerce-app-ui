import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { httpOptions } from "../services/httpOptions";
import { DEFAULT_API_CONTEXT } from "../services/uriNavigation";

const login = (data) => {
  return axios.post(`${DEFAULT_API_CONTEXT}/auth/login`, data, {
    ...httpOptions.get("POST", true, httpOptions.getContentOptionsJSON()),
  });
};
