const AddTaskRow = () => {
  const addTaskHandler = () => {
    console.log("click");
  };

  return (
    <div className="add-task" onClick={addTaskHandler}>
      <div>Add task...</div>
    </div>
  );
};
export default AddTaskRow;
