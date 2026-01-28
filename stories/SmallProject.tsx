import React, { useCallback, useState } from "react";

import {
  Gantt,
  OnChangeTasks,
  Task,
  TaskOrEmpty,
  TitleColumn,
} from "../src";

import { initSmallTasks , onAddTask, onEditTask } from "./helper";

import "../dist/style.css";

export const SmallProject: React.FC = props => {
  const [tasks, setTasks] = useState<readonly TaskOrEmpty[]>(initSmallTasks());

  const onChangeTasks = useCallback<OnChangeTasks>((nextTasks, action) => {
    switch (action.type) {
      case "delete_relation":
        if (
          window.confirm(
            `Do yo want to remove relation between ${action.payload.taskFrom.name} and ${action.payload.taskTo.name}?`
          )
        ) {
          setTasks(nextTasks);
        }
        break;

      case "delete_task":
        if (window.confirm("Are you sure?")) {
          setTasks(nextTasks);
        }
        break;

      default:
        setTasks(nextTasks);
        break;
    }
  }, []);

  const handleDblClick = useCallback((task: Task) => {
    alert("On Double Click event Id:" + task.id);
  }, []);

  const handleClick = useCallback((task: TaskOrEmpty) => {
    console.log("On Click event Id:" + task.id);
  }, []);
  const COLUMNS = [
    {
      id: "TitleColumn",
      Cell: TitleColumn,
      width: 340,
      title: "Name",
      canResize: true,
    },
  ];
  return (
    <Gantt
      isShowChildOutOfParentWarnings={false}
      isShowDependencyWarnings={false}
      {...props}
      onAddTask={onAddTask}
      onChangeTasks={onChangeTasks}
      onDoubleClick={handleDblClick}
      onEditTask={onEditTask}
      onClick={handleClick}
      tasks={tasks}
      //viewMode={ViewMode.Week}
      columns={COLUMNS}
    />
  );
};
