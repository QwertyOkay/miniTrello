// import { useState } from "react";
// import { MdOutlineAddBox } from "react-icons/md";
// function AddTask(props) {
//   const [newTaskButton, setNewTaskButton] = useState(true);
//   const [value, setValue] = useState("");

//   function handleChange(event) {
//     const { value } = event.target;
//     setValue(value);
//   }

//   function handleInputChange() {
//     if (value) {
//       setNewTaskButton(true);
//       addNewTask(props.columnId, value);
//       setValue("");
//     } else {
//       setNewTaskButton(true);
//     }
//   }

//   function addNewTask(columnId, content) {
//     const newTaskId = "task-" + Math.floor(Math.random() * 10000000);
//     const column = props.board.columns[columnId];
//     const newTaskIds = Array.from(column.taskIds);
//     newTaskIds.push(newTaskId);

//     const newTask = {
//       id: newTaskId,
//       content: content,
//     };

//     props.setBoard({
//       ...props.board,
//       tasks: {
//         ...props.board.tasks,
//         [newTaskId]: newTask,
//       },
//       columns: {
//         ...props.board.columns,
//         [columnId]: {
//           ...props.board.columns[columnId],
//           taskIds: newTaskIds,
//         },
//       },
//     });
//   }

//   return (
//     <div>
//       {newTaskButton ? (
//         <button onClick={() => setNewTaskButton(false)}>
//           <MdOutlineAddBox className="text-4xl transition-colors hover:delay-75 text-[#026AA7] hover:text-blue-700 dark:text-gray-500 dark:hover:text-cyan-500" />
//         </button>
//       ) : (
//         <input
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//           type="text"
//           value={value}
//           onChange={handleChange}
//           onBlur={handleInputChange}
//           onKeyDown={({ key }) => {
//             if (key === "Enter") {
//               return handleInputChange();
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default AddTask;

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

    // Проверяем, существует ли уже такой taskId
    if (!board.tasks[newTaskId]) {
      const newTask = {
        id: newTaskId,
        content: content,
        createdAt: new Date().toISOString(),
      };

      setBoard((prevBoard) => {
        const newTaskIds = [...prevBoard.columns[columnId].taskIds];
        // Добавляем новый taskId только если он уникален
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
