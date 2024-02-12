import React, { useState, useEffect } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Column({ column, board, setBoard }) {
  const [tasks, setTasks] = useState(
    column.taskIds.map((taskId) => board.tasks[taskId])
  );

  useEffect(() => {
    setTasks(column.taskIds.map((taskId) => board.tasks[taskId]));
  }, [column.taskIds, board.tasks]);

  const sortTasksByCreatedAt = () => {
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const sortedTaskIds = sortedTasks.map((task) => task.id);
    setBoard((prevBoard) => ({
      ...prevBoard,
      columns: {
        ...prevBoard.columns,
        [column.id]: {
          ...prevBoard.columns[column.id],
          taskIds: sortedTaskIds,
        },
      },
    }));
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleClose = () => {
    const newColumns = { ...board.columns };
    delete newColumns[column.id];
    const newColumnOrder = board.columnOrder.filter((id) => id !== column.id);
    setBoard({
      ...board,
      columns: newColumns,
      columnOrder: newColumnOrder,
    });
  };

  const columnIndex = board.columnOrder.indexOf(column.id);

  return (
    <Draggable draggableId={column.id} index={columnIndex}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="border-2 border-slate-300 dark:border-slate-700 dark:bg-slate-800 m-2 rounded-xl w-52 min-h-[500px] flex flex-col text-center p-2 relative"
        >
          <div className="flex justify-between items-center">
            <h1 className="mt-5 mb-5 font-bold dark:text-cyan-400">
              {column.title}
            </h1>
            <button
              onClick={sortTasksByCreatedAt}
              className="underline text-[#026AA7]"
            >
              Sort
            </button>
            <button
              onClick={handleClose}
              className="absolute top-0 left-0 m-2 text-lg font-semibold"
            >
              &times;
            </button>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={column.id}
                    board={board}
                    setBoard={setBoard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddTask
            columnId={column.id}
            board={board}
            setBoard={setBoard}
            onAddTask={handleAddTask}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
