import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, updateClient } from "../utils/clientFunctions";
import validateEmail from "../utils/validateEmail";
import { Client } from "@prisma/client";
import { useUserStore } from "../store/user";

/*
    Needs in hook
    - Initialize the EditClientForm state from getOneProject request.
    - Handle form validation here
    - Handle update client request
*/

const useClientForm = (
  action: "create" | "update",
  afterSubmit: () => void,
  clientData: Client
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
  const userId = useUserStore((state) => state.userId);
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

  // CREATE Client
  // const queryClient = useContext();

  // const { refetch } = useQuery();

  const { mutate: createClient } = useMutation({
    onSuccess: () => {
      // refetch();
      resetForm();
      afterSubmit();
    },
  });
  const { mutate: updateClient } = useMutation({
    onSuccess: () => {
      // refetch();
      resetForm();
      afterSubmit();
    },
  });
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
  const submitHandler = (e: SubmitEvent) => {
    e.preventDefault();
    validateSubmit();
    // if (action === "create") {
    //   return createClient(
    //     {
    //       client: {
    //         name,
    //         description,
    //         userId,
    //         businessAddress,
    //         email,
    //         phone,
    //         website,
    //       },
    //     },
    //     {
    //       onSuccess: () => {
    //         afterSubmit();
    //       },
    //     }
    //   );
    // } else {
    //   return updateClient(
    //     {
    //       clientId: clientData.id,
    //       newClientData: {
    //         name,
    //         description,
    //         userId,
    //         businessAddress,
    //         email,
    //         phone,
    //         website,
    //       },
    //     },
    //     {
    //       onSuccess: () => {
    //         afterSubmit();
    //       },
    //     }
    //   );
    // }
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
