import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../store/user";

/*
    Needs in hook
    - Initialize the EditClientForm state from getOneProject request.
    - Handle form validation here
    - Handle update project request
*/
export interface NewClientData {
  id: string;
  name: string;
  description: string;
  businsessAddress?: string;
  email?: string;
  phone?: string;
  website?: string;
  userId: string;
}

const useClientForm = (
  mutationFn: (param: any) => any,
  clientData: NewClientData,
  afterSubmit: () => void
) => {
  const initialClient = {
    id: clientData?.id || "",
    name: clientData?.name || "",
    description: clientData?.description || "",
    businessAddress: clientData?.businsessAddress || "",
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

  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);

  const [isbusinessAddressTouched, setIsbusinessAddressTouched] =
    useState(false);
  const [isbusinessAddressError, setIsbusinessAddressError] = useState(false);

  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const [isPhoneTouched, setIsPhoneTouched] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);

  const [isWebsiteTouched, setIsWebsiteTouched] = useState(false);
  const [isWebsiteError, setIsWebsiteError] = useState(false);

  // First Page
  const validateFirstPageHandler = () => {
    if (!isNameTouched && !isDescriptionTouched) {
      setIsDescriptionError(true);
      setIsNameError(true);
    }
    if (
      isNameTouched &&
      isDescriptionTouched &&
      !isNameError &&
      !isDescriptionError
    ) {
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleBusinessAddressChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBusinessAddress(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePhone = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPhone(e.target.value);
  };
  const handleChangeWebsite = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWebsite(e.target.value);
  };

  const DescriptionBlurHandler = () => {
    setIsDescriptionTouched(true);
    if (description.trim().length === 0) {
      setIsDescriptionError(true);
    }
  };

  const resetForm = () => {
    setIsNameError(false);
    setIsDescriptionError(false);
    setIsbusinessAddressError(false);
    setIsEmailError(false);
    setIsPhoneError(false);
    setIsWebsiteError(false);
    setIsNameTouched(false);
    setIsDescriptionTouched(false);
    setIsbusinessAddressTouched(false);
    setIsEmailTouched(false);
    setIsPhoneTouched(false);
    setIsWebsiteTouched(false);
    setName(initialClient.name);
    setDescription(initialClient.description);
    setBusinessAddress(initialClient.businessAddress);
    setEmail(initialClient.email);
    setPhone(initialClient.phone);
    setWebsite(initialClient.website);
    setPage(1);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(["submitClient"], mutationFn, {
    onSuccess: () => {
      // Updates the cache using the id of the clients data
      queryClient.invalidateQueries(["clients"]);
      resetForm();
      afterSubmit();
    },
  });

  // Submit
  const submitHandler = (e: any) => {
    e.preventDefault();
    mutate({
      name,
      description,
      userId: userId,
    });
  };

  return {
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
    isDescriptionTouched,
    isEmailTouched,
    isNameTouched,
    isPhoneTouched,
    isWebsiteTouched,
    isbusinessAddressTouched,
    handleDescriptionChange,
    handleBusinessAddressChange,
    handleChangeEmail,
    handleChangePhone,
    handleChangeWebsite,
    resetForm,
    validateFirstPageHandler,
  };
};
export default useClientForm;
