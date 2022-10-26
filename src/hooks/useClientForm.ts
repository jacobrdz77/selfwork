import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../store/user";
import { createClient, updateClient } from "../lib/clientFunctions";
import validateEmail from "../lib/validateEmail";
import { Client } from "@prisma/client";

/*
    Needs in hook
    - Initialize the EditClientForm state from getOneProject request.
    - Handle form validation here
    - Handle update project request
*/
export interface NewClientData {
  id?: string;
  name: string;
  description: string;
  businessAddress?: string;
  email?: string;
  phone?: string;
  website?: string;
  userId: string;
  user: {
    connect: {
      id: string;
    };
  };
}

const useClientForm = (
  asyncFn: () => any,
  afterSubmit: () => void,
  clientData?: NewClientData
) => {
  const initialClient = {
    id: clientData?.id || "",
    name: clientData?.name || "",
    description: clientData?.description || "",
    businessAddress: clientData?.businessAddress || "",
    email: clientData?.email || "",
    phone: clientData?.phone || "",
    website: clientData?.website || "",
    userId: clientData?.userId || "",
  };
  const userId = useAtomValue(userIdAtom);
  const [page, setPage] = useState<1 | 2>(1);
  const [name, setName] = useState(initialClient.name);
  const [description, setDescription] = useState(initialClient.description);
  const [businessAddress, setBusinessAddress] = useState(
    initialClient.businessAddress
  );
  const [email, setEmail] = useState(initialClient.email);
  const [phone, setPhone] = useState(initialClient.phone);
  const [website, setWebsite] = useState(initialClient.website);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [isbusinessAddressError, setIsbusinessAddressError] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isWebsiteError, setIsWebsiteError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // First Page
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleBusinessAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusinessAddress(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail((state) => {
      state = e.target.value;
      if (state.includes("@")) setIsEmailError(false);
      return state;
    });
  };
  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleChangeWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  const emailBlurHandler = () => {
    setIsEmailTouched(true);
    if (email.trim().length === 0) {
      setIsEmailError(true);
    }
  };

  const validatePhone = (phoneNumber: string) => {
    if (!phoneNumber.includes("-")) return false;
    else if (phoneNumber.length < 12) return false;
    else return true;
  };

  const phoneBlurHandler = () => {
    validatePhone(phone);
  };

  const resetForm = () => {
    setIsNameError(false);
    setIsDescriptionError(false);
    setIsbusinessAddressError(false);
    setIsEmailError(false);
    setIsPhoneError(false);
    setIsWebsiteError(false);
    setIsNameTouched(false);
    setIsEmailTouched(false);
    setName(initialClient.name);
    setDescription(initialClient.description);
    setBusinessAddress(initialClient.businessAddress);
    setEmail(initialClient.email);
    setPhone(initialClient.phone);
    setWebsite(initialClient.website);
    setPage(1);
  };

  const queryClient = useQueryClient();

  // CREATE Client
  const { mutate } = useMutation<unknown, unknown, NewClientData, unknown>(
    ["submitClient"],
    asyncFn,
    {
      onSuccess: () => {
        // Updates the cache using the id of the clients data
        queryClient.invalidateQueries(["clients"]);
        resetForm();
        afterSubmit();
      },
    }
  );

  const validateSubmit = () => {
    if (isNameError && isEmailError && isPhoneError)
      return setIsFormValid(false);
    if (!isNameTouched && !isEmailTouched) {
      setIsNameError(true);
      setIsEmailError(true);
      setIsFormValid(false);
    } else if (
      isNameTouched &&
      isEmailTouched &&
      !isNameError &&
      !isPhoneError &&
      !isEmailError
    ) {
      setIsFormValid(true);
    }
  };

  // Submit
  const submitHandler = (e: any) => {
    e.preventDefault();
    validateSubmit();
    if (isFormValid) {
      mutate({
        name,
        description,
        userId,
        businessAddress,
        email,
        phone,
        website,
        user: {
          connect: {
            id: userId,
          },
        },
      });
    }
  };

  return {
    isFormValid,
    phoneBlurHandler,
    validateSubmit,
    emailBlurHandler,
    submitHandler,
    name,
    description,
    phone,
    email,
    businessAddress,
    website,
    page,
    setPage,
    handleNameChange,
    nameBlurHandler,
    isNameError,
    isDescriptionError,
    isbusinessAddressError,
    isEmailError,
    isPhoneError,
    isWebsiteError,
    handleDescriptionChange,
    handleBusinessAddressChange,
    handleChangeEmail,
    handleChangePhone,
    handleChangeWebsite,
    resetForm,
  };
};
export default useClientForm;
