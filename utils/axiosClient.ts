import { backendApiRoute } from "./constants";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: backendApiRoute,
});

export default axiosClient;
