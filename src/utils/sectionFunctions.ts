import { SectionWithTasks, UserSections } from "@/types/types";
import { Section } from "@prisma/client";
import { axios } from "libs/axios";

export const getSectionsofProject = async (projectId: string) => {
  try {
    const response = await axios.get(`/sections?projectId=${projectId}`);
    return response.data as SectionWithTasks[];
  } catch (error) {
    console.log(error);
  }
};
export const getSectionsofUser = async (userId: string) => {
  try {
    const response = await axios.get(`/sections?userId=${userId}`);
    return response.data as UserSections;
  } catch (error) {
    console.log(error);
  }
};

export const createProjectSection = async (
  projectId: string,
  sectionData: {
    name: string;
    order: number;
  }
) => {
  try {
    // For new backend
    // const response = await axios.put(
    //   `/sections/${sectionData.sectionId}/sections`,
    //   sectionData
    // );
    const response = await axios.post(
      `/sections?projectId=${projectId}`,
      sectionData
    );
    return response.data as SectionWithTasks;
  } catch (error) {
    console.log(error);
  }
};

export const createUserSection = async (
  userId: string,
  sectionData: {
    name: string;
    order: number;
  }
) => {
  try {
    // For new backend
    // const response = await axios.post(`/users/${userId}/sections`)
    const response = await axios.post(
      `/sections?userId=${userId}`,
      sectionData
    );
    return response.data as SectionWithTasks;
  } catch (error) {
    console.log(error);
  }
};

export const updateSection = async (
  sectionId: string,
  sectionData: { name: string }
) => {
  try {
    const response = await axios.put(`/sections/${sectionId}`, sectionData);
    return response.data as Section;
  } catch (error) {
    console.log(error);
  }
};

export const updateSectionOrder = async (sectionData: {
  id: string;
  currentOrder: number;
  newOrder: number;
}) => {
  try {
    const response = await axios.put(
      `/sections/${sectionData.id}?order_change=true`,
      {
        currentOrder: sectionData.currentOrder,
        newOrder: sectionData.newOrder,
      }
    );
    return response.data as Section;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSection = async (sectionId: string) => {
  try {
    const response = await axios.delete(`/sections/${sectionId}`);
    return response.data as Section;
  } catch (error) {
    console.log(error);
  }
};
