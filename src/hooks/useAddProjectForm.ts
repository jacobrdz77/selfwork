import { Priority } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../lib/projectsFunctions";
import { useAppSelector } from "../store/hooks";

/*
    Needs in hook
    - Initialize the addprojectform state for all of the inputs
    - And for each REQUIRED input will have a isTouched & isValid state 
    - Handle of the validation here
    */
const useAddProjectForm = (afterSubmit: () => void) => {
  const { user } = useAppSelector((state) => state.userSlice)
  const [page, setPage] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isClientTouched, setIsClientTouched] = useState(false);
  const [isClientError, setIsClientError] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("NONE");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dueDate, setDueDate] = useState<string | null>("");

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
    setIsNameError(false);
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
    setName("");
    setIsNameError(false);
    setIsNameTouched(false);
    setSelectedClient("");
    setIsClientTouched(false);
    setIsClientError(false);
    setDescription("");
    setPriority("NONE");
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setDueDate("");
    setHourlyRate(0);
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
    // const date = format(new Date(e.target.value), "yyyy-MM-dd");
    setStartDate(e.target.value);
    console.log(e.target.value);
  };
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const unformatedDate = new Date(e.target.value);
    setDueDate(e.target.value);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ["createProject"],
    createProject, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"])
        resetForm();
        afterSubmit()
      }
    }
  );
  
  const submitHandler = (e: any) => {
    e.preventDefault();
    mutate({
      name,
      description,
      priority,
      hourlyRate,
      startDate,
      dueDate: dueDate === "" ? null : dueDate,
      clientId: selectedClient,
      userId: user.id
    },);
  }

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
export default useAddProjectForm;
