import Modal from "../ui/Modal";

const AddTaskListModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen }) => {
  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <div className="flex flex-col items-start">
        <header className="w-full">
          <h1 className="text-xl flex justify-start px-[24px] pb-2 border-b-[1px] w-full">
            Add a Task
          </h1>
        </header>
        <form className="mt-10 w-full px-[24px] text-[14px] h-full">
          <div className="flex flex-col gap-1">
            <label>Give the list a name</label>
            <input
              type="text"
              placeholder="e.g. Customer requests"
              className="outline-none px-1 py-2 rounded-md border-[1px]"
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label>
              Do you have any notes for this list?{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea className="outline-none py-2 rounded-md border-[1px] min-h-[120px] px-[10px]" />
          </div>
          <footer className="flex justify-between pt-5 maxxs:pt-[3.5rem]">
            <button className="px-3 py-2 w-[90px]   bg-red-500 text-white rounded-md">
              Cancel
            </button>
            {/* Disable if there is name.length === 0 */}
            <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Add TaskList
            </button>
          </footer>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskListModal;
