import axiosClient from "./axiosClient";

export const generateTextToImage = async (prompt: string) => {
  const response = await axiosClient.get(`/text-to-image/?prompt=${prompt}`);
  return response;
};
