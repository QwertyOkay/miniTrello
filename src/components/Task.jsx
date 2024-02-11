// import { Draggable } from "react-beautiful-dnd";

// function Task(props) {
//   function deleteTask(columnId, index, taskId) {
//     // to remove the task from taskIds in related column
//     const column = props.board.columns[columnId];
//     const newTaskIds = Array.from(column.taskIds);
//     newTaskIds.splice(index, 1);

//     // to remove the task from general tasks in board_data
//     const tasks = props.board.tasks;
//     const { [taskId]: oldTask, ...newTasks } = tasks;

//     props.setBoard({
//       ...props.board,
//       tasks: {
//         ...newTasks,
//       },
//       columns: {
//         ...props.board.columns,
//         [columnId]: {
//           ...column,
//           taskIds: newTaskIds,
//         },
//       },
//     });
//   }

//   return (
//     <Draggable draggableId={props.task.id} index={props.index}>
//       {(provided) => (
//         <div
//           className="shadow-[0px_1px_1px_#091e4240,0px_0px_1px_#091e424f] text-[#172b4d] border dark:border-slate-700 rounded-md p-2 mb-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white"
//           onDoubleClick={() =>
//             deleteTask(props.columnId, props.index, props.task.id)
//           }
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//         >
//           <p className="font-small">{props.task.content}</p>
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default Task;

import { Draggable } from "react-beautiful-dnd";

function Task({ task, index, columnId, board, setBoard }) {
  const deleteTask = (taskId) => {
    const column = board.columns[columnId];
    const newTaskIds = column.taskIds.filter((id) => id !== taskId);

    setBoard((prevBoard) => ({
      ...prevBoard,
      columns: {
        ...prevBoard.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
      tasks: Object.keys(prevBoard.tasks).reduce((acc, key) => {
        if (key !== taskId) {
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
          onDoubleClick={() => deleteTask(task.id)}
        >
          <p className="font-small">{task.content}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
