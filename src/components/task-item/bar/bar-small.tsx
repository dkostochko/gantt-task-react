import React, { useCallback } from "react";
import stylesRelationHandle from "./bar-relation-handle.module.css";
import { BarDisplay } from "./bar-display";
import type { TaskItemProps } from "../task-item";

import styles from "./bar.module.css";
import { BarDateHandle } from "./bar-date-handle";
import { BarMoveAction } from "../../../types/public-types";

export const BarSmall: React.FC<
  TaskItemProps & {
    onTaskEventStart: (action: BarMoveAction, clientX: number) => void;
  }
> = ({
  children: relationhandles,
  colorStyles,
  distances: { barCornerRadius, handleWidth, minimalBarWidth },
  hasChildren,
  isSelected,
  isCritical,
  isDateChangeable,
  onTaskEventStart,
  progressWidth,
  progressX,
  taskYOffset,
  task,
  taskHeight,
  x1,
}) => {
  const startMoveFullTask = useCallback(
    (clientX: number) => {
      onTaskEventStart("move", clientX);
    },
    [onTaskEventStart]
  );

  const startMoveStartOfTask = useCallback(
    (clientX: number) => {
      onTaskEventStart("start", clientX);
    },
    [onTaskEventStart]
  );

  const startMoveEndOfTask = useCallback(
    (clientX: number) => {
      onTaskEventStart("end", clientX);
    },
    [onTaskEventStart]
  );

  let handleHeight = taskHeight - 2;
  return (
    <g
      className={`${styles.barWrapper} ${stylesRelationHandle.barRelationHandleWrapper}`}
      tabIndex={0}
    >
      <BarDisplay
        taskName={task.name}
        barCornerRadius={barCornerRadius}
        hasChildren={hasChildren}
        height={taskHeight}
        isCritical={isCritical}
        isSelected={isSelected}
        showProgress={false}
        progressWidth={progressWidth}
        progressX={progressX}
        startMoveFullTask={startMoveFullTask}
        styles={colorStyles}
        width={minimalBarWidth}
        x={x1}
        y={taskYOffset}
      />
      {/* left */}
      {isDateChangeable && (
        <BarDateHandle
          dataTestid={`task-date-handle-left-${task.name}`}
          barCornerRadius={barCornerRadius}
          height={handleHeight}
          startMove={startMoveStartOfTask}
          width={handleWidth}
          x={x1 - handleWidth}
          y={taskYOffset + 1}
        />
      )}
      {/* right */}
      {isDateChangeable && (
        <BarDateHandle
          dataTestid={`task-date-handle-right-${task.name}`}
          barCornerRadius={barCornerRadius}
          height={handleHeight}
          startMove={startMoveEndOfTask}
          width={handleWidth}
          x={x1 + minimalBarWidth}
          y={taskYOffset + 1}
        />
      )}

      {relationhandles}
    </g>
  );
};
