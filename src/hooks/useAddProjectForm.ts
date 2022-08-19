import { Priority } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { format } from "date-fns";

const useAddProjectForm = () => {
  const [page, setPage] = useState<1 | 2>(1);

  const [name, setName] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isClientTouched, setIsClientTouched] = useState(false);
  const [isClientError, setIsClientError] = useState(false);
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState<Priority | string>("NONE");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState<string>("");
  const [isEndDateValid, setIsEndDateValid] = useState(false);
  const [isEndDateTouched, setIsEndDateTouched] = useState(false);
  const [isEndDateError, setIsEndDateError] = useState(false);

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
    setEndDate("");
    setHourlyRate(0);
    setPage(1);
  };

  // Second Page

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleHourlyRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHourlyRate(Number(e.target.value));
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const unformatedDate = new Date(e.target.value);
    setStartDate(format(unformatedDate, "yyyy-MM-dd"));
  };
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const unformatedDate = new Date(e.target.value);
    setEndDate(format(unformatedDate, "yyyy-MM-dd"));
  };
  const endDateBlurHandler = () => {
    setIsEndDateTouched(true);
    if (!endDate) {
      setIsEndDateError(true);
    } else {
      setIsEndDateError(false);
    }
  };
  const submitProjectHandler = (e: SubmitEvent) => {
    // Validate second page
    if (isEndDateTouched && !isEndDateError) {
      setIsEndDateError(true);
      return;
    }
    // Submit project
    const projectData = {
      name,
      description,
      selectedClient,
      hourlyRate,
      priority,
      startDate,
      endDate,
    };
  };

  return {
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
    endDate,
    hourlyRate,
    submitProjectHandler,
    handlePriorityChange,
    handleHourlyRateChange,
    handleStartDateChange,
    handleEndDateChange,
    endDateBlurHandler,
    validateFirstPageHandler,
  };

  /*
    PSEUDO CODE
    - Initialize the addprojectform state for all of the inputs
    - And for each REQUIRED input will have a isTouched & isValid state 
    - Handle of the validation here
    */
};
export default useAddProjectForm;
