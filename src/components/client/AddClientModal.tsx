import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import validateEmail from "@/utils/validateEmail";
import validatePhone from "@/utils/validatePhone";
import { createClient } from "@/utils/clientFunctions";
import { useCreateClient } from "@/hooks/ClientHooks";
import { useRouter } from "next/router";

const AddClientModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setPhoneError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const { mutateAsync: createClient } = useCreateClient();

  const phoneBlurHandler = (e: any) => {
    if (phone.trim().length === 0) {
      return;
    }
    if (validatePhone(phone)) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const emailBlurHandler = (e: any) => {
    if (validateEmail(email)) {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const client = await createClient({
      name,
      companyName,
      businessAddress,
      email,
      phone,
    });

    setIsModalOpen(false);
    // router.push(`/projects/${client}/overview`);
  };

  useEffect(() => {
    if (name.trim().length > 0 && email.trim().length > 0) {
      if (validateEmail(email)) {
        return setIsFormValid(true);
      }
      return setIsFormValid(true);
    } else {
      return setIsFormValid(false);
    }
  }, [name, email, phone]);

  return (
    <Modal
      closeBtn={true}
      isOpen={true}
      closeHandler={() => {
        setIsModalOpen(false);
      }}
    >
      <h1>Create a Client</h1>
      {/* FORMS */}
      <form onSubmit={submitHandler} className="new-client form">
        <div className="input-block">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            name="name"
            value={name!}
            onChange={(e) => {
              setName(e.target.value);
              setIsNameError(false);
            }}
            onBlur={() => {
              if (name.trim().length === 0) {
                setIsNameError(true);
              } else {
                setIsNameError(false);
              }
            }}
            placeholder="John Baker"
            className={`input ${isNameError ? "input--error" : ""}`}
            id="name"
          />
          {isNameError && <p className="error-text">Please enter a name</p>}
        </div>
        <div className="input-block">
          <label htmlFor="client">Email*</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={emailBlurHandler}
            placeholder="john@gmail.com"
            className={`input ${isEmailError ? "input--error" : ""}`}
          />
          {isEmailError && <p className="error-text">Enter a valid email</p>}
        </div>
        <div className="input-block">
          <label htmlFor="name">Company Name</label>
          <input
            id="address"
            type="text"
            className="input"
            value={companyName}
            placeholder="Google LLC"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label>Business Address</label>
          <input
            className="input address"
            placeholder="1234 Lakeview"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="name">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="123-123-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={phoneBlurHandler}
            className={`input ${isPhoneError ? "email--error" : ""}`}
          />
          {isPhoneError && <p>Enter a valid US phone number</p>}
        </div>
        <div className="submit-button">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`button ${
              !isFormValid ? "submit-button--disabled" : ""
            } `}
          >
            Create Client
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddClientModal;
