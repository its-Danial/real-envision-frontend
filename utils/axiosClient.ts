import { backendApiRoute } from "./helpers";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: backendApiRoute,
});

export default axiosClient;
