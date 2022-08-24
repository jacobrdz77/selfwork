import Modal from "./UI/Modal";
import { Client } from "@prisma/client";
import { useAppSelector, useAppDispatch } from "../src/store/hooks";
import useAddProjectForm from "../src/hooks/useAddProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../src/lib/projectsFunctions";

const AddProjectModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen }) => {
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  const { user } = useAppSelector((state) => state.userSlice);
  const {
    page,
    setPage,
    name,
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
    hourlyRate,
    startDate,
    dueDate,
    handlePriorityChange,
    handleEndDateChange,
    handleHourlyRateChange,
    handleStartDateChange,
    validateFirstPageHandler,
    submitHandler,
  } = useAddProjectForm(closeHandler);
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <div className="flex flex-col items-center">
        <svg
          className="w-[178px] h-auto"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          width="931.56299"
          height="512.801"
          viewBox="0 0 931.56299 512.801"
        >
          <circle cx="347.12667" cy="325.96388" r="26.43632" fill="#50438e" />
          <polygon
            points="344.607 337.123 336.695 326.95 341.296 323.371 345.043 328.188 357.699 314.827 361.932 318.837 344.607 337.123"
            fill="#fff"
          />
          <path
            d="M986.01772,278.199h-393v-84h393Z"
            transform="translate(-133.7185 -194.199)"
            fill="#fff"
          />
          <circle cx="510.22347" cy="42" r="21.33847" fill="#50438e" />
          <path
            d="M693.22364,221.97335a3.55641,3.55641,0,0,0,0,7.11282H952.883a3.55642,3.55642,0,0,0,0-7.11282Z"
            transform="translate(-133.7185 -194.199)"
            fill="#3f3d56"
          />
          <path
            d="M693.22364,243.31177a3.55641,3.55641,0,0,0-.015,7.11281H857.368a3.55641,3.55641,0,1,0,0-7.11281Z"
            transform="translate(-133.7185 -194.199)"
            fill="#3f3d56"
          />
          <path
            d="M986.01772,278.199h-393v-84h393Zm-387-6h381v-72h-381Z"
            transform="translate(-133.7185 -194.199)"
            fill="#ccc"
          />
          <path
            d="M986.01772,383.199h-393v-84h393Z"
            transform="translate(-133.7185 -194.199)"
            fill="#fff"
          />
          <circle cx="510.22347" cy="147" r="21.33847" fill="#e6e6e6" />
          <path
            d="M693.22364,326.97335a3.55641,3.55641,0,0,0,0,7.11282H952.883a3.55642,3.55642,0,0,0,0-7.11282Z"
            transform="translate(-133.7185 -194.199)"
            fill="#e6e6e6"
          />
          <path
            d="M693.22364,348.31177a3.55641,3.55641,0,0,0-.015,7.11281H857.368a3.55641,3.55641,0,1,0,0-7.11281Z"
            transform="translate(-133.7185 -194.199)"
            fill="#e6e6e6"
          />
          <path
            d="M986.01772,383.199h-393v-84h393Zm-387-6h381v-72h-381Z"
            transform="translate(-133.7185 -194.199)"
            fill="#e6e6e6"
          />
          <path
            d="M986.01772,488.199h-393v-84h393Z"
            transform="translate(-133.7185 -194.199)"
            fill="#fff"
          />
          <circle cx="510.22347" cy="252" r="21.33847" fill="#e6e6e6" />
          <path
            d="M693.22364,431.97335a3.55641,3.55641,0,0,0,0,7.11282H952.883a3.55642,3.55642,0,0,0,0-7.11282Z"
            transform="translate(-133.7185 -194.199)"
            fill="#e6e6e6"
          />
          <path
            d="M693.22364,453.31177a3.55641,3.55641,0,0,0-.015,7.11281H857.368a3.55641,3.55641,0,1,0,0-7.11281Z"
            transform="translate(-133.7185 -194.199)"
            fill="#e6e6e6"
          />
          <path
            d="M986.01772,488.199h-393v-84h393Zm-387-6h381v-72h-381Z"
            transform="translate(-133.7185 -194.199)"
            fill="#e6e6e6"
          />
          <path
            d="M334.47656,508.12823a9.97931,9.97931,0,0,1,3.22535-14.95832L335.618,470.46084l13.49137-4.63223,2.49246,32.11093a10.03341,10.03341,0,0,1-17.12527,10.18869Z"
            transform="translate(-133.7185 -194.199)"
            fill="#ffb8b8"
          />
          <path
            d="M348.96005,377.79135s9.25835-19.42981,17.48513-12.59513-11.2788,64.28457-11.2788,64.28457l-2.96666,55.77082-15.63538-1.5628-4.42059-54.336Z"
            transform="translate(-133.7185 -194.199)"
            fill="#ccc"
          />
          <polygon
            points="91.056 471.047 102.662 480.442 144.423 440.146 127.294 426.28 91.056 471.047"
            fill="#ffb8b8"
          />
          <path
            d="M224.88113,659.06021l22.85715,18.50239.00092.00075a18.74161,18.74161,0,0,1,2.77431,26.35741l-.38318.47334-37.42364-30.29388Z"
            transform="translate(-133.7185 -194.199)"
            fill="#2f2e41"
          />
          <polygon
            points="252.357 497.127 267.289 497.127 274.393 439.53 252.354 439.531 252.357 497.127"
            fill="#ffb8b8"
          />
          <path
            d="M382.26623,686.45109l29.40727-.00118h.00119a18.74161,18.74161,0,0,1,18.74062,18.74031v.609l-48.14818.00178Z"
            transform="translate(-133.7185 -194.199)"
            fill="#2f2e41"
          />
          <path
            d="M412.27729,421.309s28.01383,34.1038,21.92386,68.2076-10.96193,59.68164-10.96193,59.68164l-9.74394,76.73354s3.654,20.89769-1.218,26.28275c0,0,7.308,12.693-6.09,17.565s-20.627-1.68313-20.627-1.68313-9.82287-14.15077-3.7329-17.80475l2.56545-150.58774L286.824,627.1498s-1.79342,15.50264-14.29463,15.66827l-14.93719,11.12757-17.0519-9.744,8.52595-10.96193s-4.872-12.17993,6.09-14.61591l63.33562-82.82351,15.83391-42.62975s8.52595-32.8858,31.66781-46.28372V432.6306Z"
            transform="translate(-133.7185 -194.199)"
            fill="#2f2e41"
          />
          <path
            d="M364.16657,362.23637l0,0a23.25794,23.25794,0,0,1,30.656-4.32849l1.01179.67453,0,0A89.77768,89.77768,0,0,1,416.8508,401.853l4.56143,24.937L364.16657,439.1905l-13.42025-46.284a26.14871,26.14871,0,0,1,13.42023-30.67011Z"
            transform="translate(-133.7185 -194.199)"
            fill="#ccc"
          />
          <path
            d="M458.21768,513.43011a11.42107,11.42107,0,0,1-6.51527-16.25582l-16.51369-20.21048L445.023,463.933l22.91966,28.86864a11.483,11.483,0,0,1-9.725,20.62849Z"
            transform="translate(-133.7185 -194.199)"
            fill="#ffb8b8"
          />
          <path
            d="M388.52643,380.50627s-3.654-24.35986,8.526-23.14187,30.44981,68.2076,30.44981,68.2076L460.388,480.38167l-15.83391,8.526-38.97576-48.71971Z"
            transform="translate(-133.7185 -194.199)"
            fill="#ccc"
          />
          <path
            d="M410.83066,344.89318h-58a4.50508,4.50508,0,0,1-4.5-4.5v-25a33.5,33.5,0,0,1,67,0v25A4.50508,4.50508,0,0,1,410.83066,344.89318Z"
            transform="translate(-133.7185 -194.199)"
            fill="#2f2e41"
          />
          <circle cx="254.99606" cy="125.55118" r="24.56103" fill="#ffb8b8" />
          <path
            d="M423.256,317.89318H392.34632l-.317-5.0918-1.58477,5.0918h-4.75942l-.62812-10.0918-3.141,10.0918h-9.20925v-.5c0-14.61231,10.36059-26.5,23.09557-26.5h4.35791c12.735,0,23.09578,11.88769,23.09578,26.5Z"
            transform="translate(-133.7185 -194.199)"
            fill="#2f2e41"
          />
          <path
            d="M393.62553,349.55993a7.43613,7.43613,0,0,1-1.12823-.087l-36.79061-5.66667V305.4864a14.75984,14.75984,0,0,1,14.75984-14.75984h25.73955l-1.00268,1.02053C381.253,305.95,391.763,328.98021,399.26945,341.444a4.9119,4.9119,0,0,1-.49909,5.82127A6.68354,6.68354,0,0,1,393.62553,349.55993Z"
            transform="translate(-133.7185 -194.199)"
            fill="#2f2e41"
          />
          <circle cx="905.12667" cy="41.96388" r="26.43632" fill="#50438e" />
          <polygon
            points="902.607 53.123 894.695 42.95 899.296 39.371 903.043 44.188 915.699 30.827 919.932 34.837 902.607 53.123"
            fill="#fff"
          />
          <path
            d="M515.7185,707h-381a1,1,0,1,1,0-2h381a1,1,0,0,1,0,2Z"
            transform="translate(-133.7185 -194.199)"
            fill="#ccc"
          />
        </svg>
        <h1 className="mt-4 text-xl">Create a Project</h1>
      </div>

      {/****  Navbar ****/}
      <nav className="flex justify-center gap-16 py-5 select-none">
        <div className="flex flex-col items-center w-[15px]">
          <button
            className={`${
              page === 1 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center border-[1px] rounded-full w-6 h-6 text-[13px] font-bold hover:bg-blue-500 hover:text-white`}
            onClick={() => {
              setPage(1);
            }}
          >
            1
          </button>
          <p className="text-[14px]">Details</p>
        </div>
        <div className="flex flex-col items-center w-[15px] ">
          <button
            className={`${
              page === 2 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center border-[1px] rounded-full w-6 h-6 text-[13px] font-bold hover:bg-blue-500 hover:text-white`}
            onClick={validateFirstPageHandler}
          >
            2
          </button>
          <p className="text-[14px]">Extra</p>
        </div>
      </nav>

      {/* FORMS */}

      {page === 1 ? (
        <div>
          <form className="flex flex-col w-full h-full mt-2 text-[14px] sm:px-[40px]">
            <div className="flex w-full maxsm:flex-col ">
              <div className="flex flex-col w-[50%] maxsm:w-full mr-[16px]">
                <label htmlFor="name">Choose a name</label>
                <input
                  type="text"
                  value={name!}
                  onChange={handleNameChange}
                  onBlur={nameBlurHandler}
                  placeholder="Give your project a name"
                  className={`${
                    isNameError
                      ? "border-[1px] border-red-600 focus:border-red-600"
                      : ""
                  } h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px] `}
                  id="name"
                />
                {isNameError && (
                  <p className="text-red-600 mt-1">Please enter a name</p>
                )}
              </div>

              <div className="flex flex-col w-[50%] maxsm:w-full maxsm:mt-3 sm:ml-[16px]">
                <label htmlFor="client">Choose a Client</label>
                <select
                  className={`${
                    isClientError
                      ? "border-[1px] border-red-600 focus:border-red-600"
                      : ""
                  } h-[38px] w-full py-[5px] px-[12px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500 maxsm:focus:outline-[0px]`}
                  id="client"
                  value={selectedClient}
                  onChange={handleClientChange}
                  onBlur={clientBlurHandler}
                >
                  <option value="default">Select a client</option>
                  <option value="cl6sboytg010762gpaev4owqm">James Bond</option>
                  {/*! NEED TO FETCH user's clients */}
                  {user.clients.map((client: Client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {isClientError && (
                  <p className="text-red-600 mt-1">Please choose a client</p>
                )}
              </div>
            </div>

            <div className="w-full mt-5 rounded-md">
              <textarea
                className="w-full min-h-[130px] 
                max-h-[200px]
                bg-gray-100 px-3 p-2 focus:outline-none focus:border-[1px] focus:border-blue-500  rounded-md maxsm:focus:outline-[0px]"
                placeholder="Add a description"
                value={description!}
                onChange={handleDescriptionChange}
              />
            </div>
          </form>
          <footer className="flex justify-between pt-5 sm:px-[40px] maxxs:pt-[3.5rem] ">
            <button
              className="px-3 py-2 w-[90px]   bg-red-500 text-white rounded-md"
              onClick={() => {
                resetForm();
                setIsModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2  bg-gray-300 hover:bg-blue-500 hover:text-white rounded-md"
              onClick={validateFirstPageHandler}
            >
              Next Page
            </button>
          </footer>
        </div>
      ) : (
        //*** Second Form ***/
        <div>
          <form
            className="flex flex-col w-full h-full mt-2 mb-2 text-[14px] sm:px-[40px]"
            onSubmit={submitHandler}
          >
            <div className="flex w-full gap-4 mr-[16px] maxxs:flex-col">
              <div className="flex flex-col w-full">
                <label htmlFor="name">Priority</label>
                <select
                  value={priority}
                  onChange={handlePriorityChange}
                  className={` h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px] `}
                  id="name"
                >
                  <option value="NONE">None</option>
                  <option value="LOW">Low</option>
                  <option value="MID">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                {isNameError && (
                  <p className="text-red-600 mt-1">Please enter a name</p>
                )}
              </div>

              <div className="flex flex-col w-full ">
                <label htmlFor="name">Hourly Rate</label>
                <input
                  id="name"
                  type="number"
                  value={hourlyRate}
                  max={9999999}
                  onChange={handleHourlyRateChange}
                  className={` h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px] `}
                />
              </div>
            </div>

            <div className="flex gap-4 my-5 maxxs:flex-col">
              <div className="flex flex-col w-[50%] maxxs:w-full">
                <label>Start Date</label>
                <input
                  type="date"
                  onChange={handleStartDateChange}
                  min={new Date().toISOString()}
                  value={startDate}
                  className="h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px]"
                />
              </div>
              <div className="flex flex-col w-[50%] maxxs:w-full">
                <label>Due Date</label>
                <input
                  type="date"
                  onChange={handleEndDateChange}
                  min={startDate}
                  value={dueDate!}
                  className="h-[38px] py-[5px] px-[8px] mt-1 bg-gray-100 rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500  maxsm:focus:outline-[0px]"
                />
              </div>
            </div>
            <footer className="flex justify-between sm:pt-5 text-[16px] maxxs:pt-[3.5rem]  ">
              <button
                className="px-3 py-2 w-[90px]  bg-red-500 text-white rounded-md"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <div className="flex gap-3">
                <button
                  className="px-3 py-2  bg-gray-300  hover:bg-blue-500 hover:text-white rounded-md"
                  onClick={() => setPage(1)}
                >
                  Back
                </button>
                <button
                  className="px-3 py-2 bg-blue-500 text-white rounded-md"
                  type="submit"
                >
                  Create Project
                </button>
              </div>
            </footer>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default AddProjectModal;
