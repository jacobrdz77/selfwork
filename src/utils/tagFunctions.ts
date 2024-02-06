import { NewTag, UpdateTagData } from "@/types/types";
import { Color, Tag } from "@prisma/client";
import { axios } from "libs/axios";

export const getTags = async () => {
  try {
    const response = await axios.get(``);

    return response.data as Tag[];
  } catch (error) {
    console.log(error);
  }
};

export const createTag = async (newTag: NewTag) => {
  try {
    const response = await axios.post("/tags", newTag);

    return response.data as Tag;
  } catch (error) {
    console.log(error);
  }
};

export const updateTag = async (tagId: string, tagData: UpdateTagData) => {
  try {
    const response = await axios.put(`/tags/${tagId}`, tagData);
    return response.data as Tag;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTag = async (tagId: string) => {
  const response = await axios.delete(`/tags/${tagId}`);
  return response.data as Tag;
};
