import { fastAPIbackendRoute, nextAPIRoute } from "./helpers";
import axios from "axios";

export const FastAPIClient = axios.create({
  baseURL: fastAPIbackendRoute,
});
