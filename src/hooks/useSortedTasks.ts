import { useState, useEffect } from "react";
import { SectionWithTasks, TaskWithAssignee } from "@/types/types";
import sortArray from "@/utils/sortSections";

const useSortedTasks = (tasks: TaskWithAssignee[]) => {
  const [sortedtasks, setSortedtasks] = useState(sortArray(tasks));

  console.log("Sorted arr: ", sortedtasks);

  useEffect(() => {
    setSortedtasks(sortArray(tasks));
  }, [tasks]);

  return { sortedtasks, setSortedtasks };
};

export default useSortedTasks;
