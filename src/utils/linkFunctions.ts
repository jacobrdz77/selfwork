import { NewLink } from "@/types/types";
import { Link } from "@prisma/client";
import { axios } from "libs/axios";

export const getLinks = async (projectId: string) => {
  try {
    const response = await axios.get(`/links?projectId=${projectId}`);
    return response.data as Link[];
  } catch (error) {
    console.log(error);
  }
};

export const createLink = async (linkData: NewLink) => {
  try {
    const response = await axios.post(`/links`, linkData);
    return response.data as Link;
  } catch (error) {
    console.log(error);
  }
};

export const updateLink = async (
  linkId: string,
  linkData: { name: string }
) => {
  try {
    const response = await axios.put(`/links/${linkId}`, linkData);
    return response.data as Link;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLink = async (linkId: string) => {
  try {
    const response = await axios.delete(`/links/${linkId}`);
    return response.data as Link;
  } catch (error) {
    console.log(error);
  }
};
