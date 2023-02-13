import { useTableWidthStore } from "store/table-width";
import TaskHeadCell from "./TaskHeadCell";

const TaskTableHead = () => {
  const {
    assigneeWidth,
    dueDateWidth,
    nameWidth,
    priorityWidth,
    statusWidth,
    actions,
  } = useTableWidthStore((state) => state);
  return (
    <div className="tasks-header">
      <div className="tr">
        <TaskHeadCell
          headerWidth={nameWidth}
          setHeaderWidth={actions.setNameWidth}
          minWidth={400}
          maxWidth={800}
        >
          Task Name
        </TaskHeadCell>
        <TaskHeadCell
          headerWidth={assigneeWidth}
          setHeaderWidth={actions.setAssigneeWidth}
          minWidth={120}
          maxWidth={300}
        >
          Assignee
        </TaskHeadCell>
        <TaskHeadCell
          headerWidth={dueDateWidth}
          setHeaderWidth={actions.setDueDateWidth}
          minWidth={120}
          maxWidth={300}
        >
          Due Date
        </TaskHeadCell>
        <TaskHeadCell
          headerWidth={statusWidth}
          setHeaderWidth={actions.setStatusWidth}
          minWidth={120}
          maxWidth={300}
        >
          Status
        </TaskHeadCell>
        <TaskHeadCell
          headerWidth={priorityWidth}
          setHeaderWidth={actions.setPriorityWidth}
          minWidth={120}
          maxWidth={300}
        >
          Priority
        </TaskHeadCell>
      </div>
    </div>
  );
};

export default TaskTableHead;
