import axios from "axios";
import { fastAPIbackendRoute } from "./helpers";

export const FastAPIClient = axios.create({
  baseURL: fastAPIbackendRoute,
});
