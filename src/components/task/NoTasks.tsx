import React from "react";

const NoTasks: React.FC<{
  setIsModalOpen: (isOpen: boolean) => any;
}> = ({ setIsModalOpen }) => {
  return (
    <div className="h-full flex mt-[10rem] justify-center text-center ">
      <div className="flex flex-col">
        <h1 className="text-2xl mt-4">No tasks</h1>
        <p className="mt-1 text-gray-400">
          Create a task and add any necessary data you need.
        </p>

        <div>
          <button
            className="mt-5 bg-blue-500
           text-white p-3 rounded-lg hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoTasks;
