import { useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";

function AddTask({ columnId, board, setBoard, onAddTask }) {
  const [newTaskButton, setNewTaskButton] = useState(true);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleInputChange = () => {
    if (value) {
      addNewTask(columnId, value);
      setValue("");
      setNewTaskButton(true);
    } else {
      setNewTaskButton(true);
    }
  };

  const addNewTask = (columnId, content) => {
    const newTaskId =
      "task-" + Date.now() + "-" + Math.floor(Math.random() * 10000000);

    // Check the taskId
    if (!board.tasks[newTaskId]) {
      const newTask = {
        id: newTaskId,
        content: content,
        createdAt: new Date().toISOString(),
      };

      setBoard((prevBoard) => {
        const newTaskIds = [...prevBoard.columns[columnId].taskIds];
        // Add a new uniq taskId
        if (!newTaskIds.includes(newTaskId)) {
          newTaskIds.push(newTaskId);
        }

        return {
          ...prevBoard,
          tasks: {
            ...prevBoard.tasks,
            [newTaskId]: newTask,
          },
          columns: {
            ...prevBoard.columns,
            [columnId]: {
              ...prevBoard.columns[columnId],
              taskIds: newTaskIds,
            },
          },
        };
      });

      onAddTask(newTask);
    }
  };

  return (
    <div>
      {newTaskButton ? (
        <button onClick={() => setNewTaskButton(false)}>
          <MdOutlineAddBox className="text-4xl" />
        </button>
      ) : (
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleInputChange}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              handleInputChange();
            }
          }}
        />
      )}
    </div>
  );
}

export default AddTask;
