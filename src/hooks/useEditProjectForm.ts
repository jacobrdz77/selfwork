import { Priority } from "@prisma/client";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";

export const useEditProjectForm = () => {
  const [name, setName] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isClientTouched, setIsClientTouched] = useState(false);
  const [isClientError, setIsClientError] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("NONE");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFirstFormValid, setFirstFormValid] = useState(false);
  const clients = useAppSelector((state) => state.userSlice.user.clients);

  const submitEditedProject = (e: Event) => {
    e.preventDefault();
    const data = {
      name,
      selectedClient,
      description,
      priority,
      startDate,
      endDate,
      hourlyRate,
    };

    // use Fetch to send update request
  };
};
