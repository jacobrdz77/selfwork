import { Task } from "@prisma/client";
import { useState } from "react";
import Button from "./UI/Button";

const Tasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  console.log(tasks);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div>
      <header>
        <h1>Tasks</h1>
        <Button>Add Task List</Button>
        <input
          type="text"
          value={searchValue}
          onChange={(e: any) => setSearchValue(e.target.value)}
        />
      </header>
      <main>
        {}
      </main>
    </div>
  );
};

export default Tasks;
