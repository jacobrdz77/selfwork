import { useState, useEffect } from "react";
import { TaskWithAssignee } from "@/types/types";
import sortArray from "@/utils/sortSections";

const useSortedTasks = (tasks: TaskWithAssignee[]) => {
  const [sortedtasks, setSortedtasks] = useState(sortArray(tasks));

  useEffect(() => {
    setSortedtasks(sortArray(tasks));
  }, [tasks]);

  return { sortedtasks, setSortedtasks };
};

export default useSortedTasks;
