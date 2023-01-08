import Modal from "../UI/Modal";
import Button from "../UI/Button";

const AddClientModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen }) => {
  const closeHandler = () => {
    setIsModalOpen(false);
    // resetForm();
  };
  // const {
  //   name,
  //   businessAddress,
  //   description,
  //   email,
  //   handleBusinessAddressChange,
  //   handleChangeEmail,
  //   handleChangePhone,
  //   handleChangeWebsite,
  //   handleDescriptionChange,
  //   handleNameChange,
  //   isEmailError,
  //   isNameError,
  //   isPhoneError,
  //   isFormValid,
  //   nameBlurHandler,
  //   page,
  //   emailBlurHandler,
  //   phone,
  //   resetForm,
  //   phoneBlurHandler,
  //   setPage,
  //   submitHandler,
  //   validateSubmit,
  // } = useClientForm("create", () => {});

  const isNameError = false;
  const isEmailError = false;
  const isPhoneError = false;

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h1>Create a Client</h1>
      {/* FORMS */}
      {/* Page 1 */}
      <form className="new-client form">
        <div>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            value={name!}
            // onChange={handleNameChange}
            // onBlur={nameBlurHandler}
            placeholder="John Doe"
            className={`${
              isNameError
                ? "border-[1px] border-red-600 focus:border-red-600"
                : ""
            }`}
            id="name"
          />
          {isNameError && <p>Please enter a name</p>}
        </div>

        <div>
          <label htmlFor="name">Company Name</label>
          <input
            id="address"
            type="text"
            // value={companyName}
            // onChange={handlecompanyNameChange}
          />
        </div>

        <div>
          <label>Business Address</label>
          <textarea
            placeholder="1234 Lakeview"
            // value={businessAddress}
            // onChange={handleBusinessAddressChange}
          />
        </div>

        <div>
          <label htmlFor="client">Email*</label>
          <input
            type="text"
            // value={email}
            // onChange={handleChangeEmail}
            // onBlur={emailBlurHandler}
            placeholder="john@gmail.com"
            className={`${isEmailError ? "border-[1px] border-red-600" : ""}`}
          />
          {isEmailError && <p>Enter a valid email</p>}
        </div>

        <div>
          <label htmlFor="name">Phone Number</label>
          <input
            type="text"
            placeholder="123-123-1234"
            // value={phone}
            // onChange={handleChangePhone}
            // onBlur={phoneBlurHandler}
          />
          {isPhoneError && <p>Enter a valid US phone number</p>}
        </div>
      </form>
      <Button type="submit">Create Client</Button>
    </Modal>
  );
};

export default AddClientModal;
