import { Priority } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  updateProject,
  UpdateProjectData,
} from "../lib/projectsFunctions";
import format from "date-fns/format";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../store/user";

/*
    Needs in hook
    - Initialize the EditProjectForm state from getOneProject request.
    - Handle form validation here
    - Handle update project request
*/
export interface NewProjectData {
  id?: string;
  name: string;
  description: string;
  clientId: string;
  hourlyRate: number;
  priority: Priority;
  startDate: string;
  dueDate: string | null;
  userId: string;
  client?: {
    name: string;
  };
}
const useProjectForm = (
  afterSubmit: () => void,
  projectData?: UpdateProjectData
) => {
  const initialProject = {
    id: projectData?.id || "",
    name: projectData?.name || "",
    description: projectData?.description || "",
    clientId: projectData?.clientId || "",
    hourlyRate: projectData?.hourlyRate || 0,
    startDate:
      format(projectData?.startDate!, "yyyy-MM-dd") ||
      format(new Date(), "yyyy-MM-dd"),
    dueDate:
      format(projectData?.dueDate!, "yyyy-MM-dd") ||
      format(new Date(), "yyyy-MM-dd"),
    priority: projectData?.priority || "NONE",
  };
  const userId = useAtomValue(userIdAtom);
  const [page, setPage] = useState<1 | 2>(1);
  const [name, setName] = useState(initialProject.name);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>(
    initialProject.clientId
  );
  const [isClientTouched, setIsClientTouched] = useState(false);
  const [isClientError, setIsClientError] = useState(false);
  const [description, setDescription] = useState(initialProject.description);
  const [priority, setPriority] = useState<Priority>(initialProject.priority);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [startDate, setStartDate] = useState(initialProject.startDate);
  const [dueDate, setDueDate] = useState(initialProject.dueDate);

  // First Page
  const validateFirstPageHandler = () => {
    if (!isNameTouched && !isClientTouched) {
      setIsClientError(true);
      setIsNameError(true);
    }
    if (isNameTouched && isClientTouched && !isNameError && !isClientError) {
      setPage(2);
    }
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length > 0) setIsNameError(false);
    setName(e.target.value);
  };
  const nameBlurHandler = () => {
    setIsNameTouched(true);
    if (name.trim().length === 0) {
      setIsNameError(true);
    }
  };
  const handleClientChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "default") {
      setIsClientError(true);
    } else {
      setIsClientError(false);
    }
    setSelectedClient(e.target.value);
  };
  const clientBlurHandler = (e: any) => {
    setIsClientTouched(true);
    if (e.target.value === "default") {
      setIsClientError(true);
    } else {
      setIsClientError(false);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const resetForm = () => {
    setIsNameError(false);
    setIsNameTouched(false);
    setIsClientTouched(false);
    setIsClientError(false);
    setName(initialProject.name);
    setSelectedClient(initialProject.clientId);
    setDescription(initialProject.description);
    setPriority(initialProject.priority);
    setStartDate(initialProject.startDate);
    setDueDate(initialProject.dueDate + "");
    setHourlyRate(initialProject.hourlyRate);
    setPage(1);
  };

  // Second Page
  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
  };
  const handleHourlyRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHourlyRate(Number(e.target.value));
  };
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation(["submitProject"], createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      resetForm();
      afterSubmit();
    },
  });

  // Submit
  const submitHandler = (e: Event) => {
    e.preventDefault();
    mutate({
      name,
      description,
      priority,
      hourlyRate,
      startDate: startDate + "",
      dueDate: dueDate + "",
      clientId: selectedClient,
      userId: userId,
    });
  };

  return {
    submitHandler,
    name,
    page,
    setPage,
    description,
    priority,
    handleNameChange,
    nameBlurHandler,
    isNameError,
    selectedClient,
    handleClientChange,
    clientBlurHandler,
    isClientError,
    handleDescriptionChange,
    resetForm,
    startDate,
    dueDate,
    hourlyRate,
    handlePriorityChange,
    handleHourlyRateChange,
    handleStartDateChange,
    handleEndDateChange,
    validateFirstPageHandler,
  };
};
export default useProjectForm;
