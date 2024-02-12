import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

function Task({ task, index, columnId, board, setBoard }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleBlur = () => {
    updateTaskContent();
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateTaskContent();
      setIsEditing(false);
    }
  };

  const updateTaskContent = () => {
    setBoard((prevBoard) => {
      const updatedTasks = {
        ...prevBoard.tasks,
        [task.id]: { ...task, content: newContent },
      };
      return { ...prevBoard, tasks: updatedTasks };
    });
  };

  const deleteTask = () => {
    const newTaskIds = board.columns[columnId].taskIds.filter(
      (id) => id !== task.id
    );
    setBoard((prevBoard) => ({
      ...prevBoard,
      columns: {
        ...prevBoard.columns,
        [columnId]: {
          ...prevBoard.columns[columnId],
          taskIds: newTaskIds,
        },
      },
      tasks: Object.keys(prevBoard.tasks).reduce((acc, key) => {
        if (key !== task.id) {
          acc[key] = prevBoard.tasks[key];
        }
        return acc;
      }, {}),
    }));
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="shadow-[0px_1px_1px_#091e4240,0px_0px_1px_#091e424f] text-[#172b4d] border dark:border-slate-700 rounded-md p-2 mb-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={toggleEdit}
        >
          {isEditing ? (
            <textarea
              className="w-full h-full p-1 text-sm"
              value={newContent}
              onChange={handleContentChange}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          ) : (
            <p className="font-small">{task.content}</p>
          )}
          <button
            onClick={deleteTask}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
