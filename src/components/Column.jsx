// import React, { useState, useEffect } from "react";
// import Task from "./Task";
// import AddTask from "./AddTask";
// import { Draggable, Droppable } from "react-beautiful-dnd";

// function Column({ column, board, setBoard }) {
//   const [sortOrder, setSortOrder] = useState("default");

//   useEffect(() => {
//     const sortTasks = () => {
//       return column.taskIds
//         .map((taskId) => board.tasks[taskId])
//         .sort((a, b) => {
//           return sortOrder === "createdAt"
//             ? new Date(a.createdAt) - new Date(b.createdAt)
//             : 0;
//         });
//     };

//     const newSortedTaskIds = sortTasks().map((task) => task.id);
//     const orderChanged = newSortedTaskIds.some(
//       (taskId, index) => taskId !== column.taskIds[index]
//     );

//     if (orderChanged) {
//       setBoard((prevBoard) => {
//         const newColumns = {
//           ...prevBoard.columns,
//           [column.id]: { ...column, taskIds: newSortedTaskIds },
//         };
//         return { ...prevBoard, columns: newColumns };
//       });
//     }
//   }, [sortOrder, column, board, setBoard]);

//   const toggleSortOrder = () => {
//     setSortOrder((prevSortOrder) =>
//       prevSortOrder === "default" ? "createdAt" : "default"
//     );
//   };

//   return (
//     <Draggable
//       draggableId={column.id}
//       index={parseInt(column.id.replace("column", ""), 10)}
//     >
//       {(provided) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           className="border-2 border-slate-300 dark:border-slate-700 dark:bg-slate-800 m-2 rounded-xl w-52 min-h-[500px] flex flex-col text-center p-2 relative"
//         >
//           <div className="flex justify-between items-center">
//             <h1 className="mt-5 mb-5 font-bold dark:text-cyan-400">
//               {column.title}
//             </h1>
//             <button onClick={toggleSortOrder}>⚙️</button>
//           </div>
//           <Droppable droppableId={column.id} type="task">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {column.taskIds.map((taskId, index) => (
//                   <Task
//                     key={taskId}
//                     task={board.tasks[taskId]}
//                     index={index}
//                     columnId={column.id}
//                     board={board}
//                     setBoard={setBoard}
//                   />
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <AddTask columnId={column.id} board={board} setBoard={setBoard} />
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default Column;

// import React, { useState } from "react";
// import Task from "./Task";
// import AddTask from "./AddTask";
// import { Draggable, Droppable } from "react-beautiful-dnd";

// function Column({ column, board, setBoard }) {
//   const [tasks, setTasks] = useState(
//     column.taskIds.map((taskId) => board.tasks[taskId])
//   );

//   // Функция для сортировки задач по дате создания
//   const sortTasksByCreatedAt = () => {
//     const sortedTasks = [...tasks].sort(
//       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//     );
//     setTasks(sortedTasks);
//   };

//   const handleAddTask = (newTask) => {
//     setTasks((prevTasks) => [...prevTasks, newTask]);
//   };

//   return (
//     <Draggable
//       draggableId={column.id}
//       index={parseInt(column.id.replace("column", ""), 10)}
//     >
//       {(provided) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           className="border-2 border-slate-300 dark:border-slate-700 dark:bg-slate-800 m-2 rounded-xl w-52 min-h-[500px] flex flex-col text-center p-2 relative"
//         >
//           <div className="flex justify-between items-center">
//             <h1 className="mt-5 mb-5 font-bold dark:text-cyan-400">
//               {column.title}
//             </h1>
//             <button onClick={sortTasksByCreatedAt}>Sort by Date</button>
//           </div>
//           <Droppable droppableId={column.id} type="task">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {tasks.map((task, index) => (
//                   <Task
//                     key={task.id}
//                     task={task}
//                     index={index}
//                     columnId={column.id}
//                     board={board}
//                     setBoard={setBoard}
//                   />
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <AddTask columnId={column.id} board={board} setBoard={setBoard} />
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default Column;

// import React, { useState, useEffect } from "react";
// import Task from "./Task";
// import AddTask from "./AddTask";
// import { Draggable, Droppable } from "react-beautiful-dnd";

// function Column({ column, board, setBoard }) {
//   const [tasks, setTasks] = useState(
//     column.taskIds.map((taskId) => board.tasks[taskId])
//   );

//   useEffect(() => {
//     setTasks(column.taskIds.map((taskId) => board.tasks[taskId]));
//   }, [column.taskIds, board.tasks]);

//   const sortTasksByCreatedAt = () => {
//     setTasks(
//       [...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//     );
//   };

//   const handleAddTask = (newTask) => {
//     setTasks((prevTasks) => [...prevTasks, newTask]);
//   };

//   return (
//     <Draggable
//       draggableId={column.id}
//       index={parseInt(column.id.replace("column", ""), 10)}
//     >
//       {(provided) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           className="border-2 border-slate-300 dark:border-slate-700 dark:bg-slate-800 m-2 rounded-xl w-52 min-h-[500px] flex flex-col text-center p-2 relative"
//         >
//           <div className="flex justify-between items-center">
//             <h1 className="mt-5 mb-5 font-bold dark:text-cyan-400">
//               {column.title}
//             </h1>
//             <button onClick={sortTasksByCreatedAt}>Sort by Date</button>
//           </div>
//           <Droppable droppableId={column.id} type="task">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {tasks.map((task, index) => (
//                   <Task
//                     key={task.id}
//                     task={task}
//                     index={index}
//                     columnId={column.id}
//                     board={board}
//                     setBoard={setBoard}
//                   />
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <AddTask
//             columnId={column.id}
//             board={board}
//             setBoard={setBoard}
//             onAddTask={handleAddTask}
//           />
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default Column;

// import React, { useState, useEffect } from "react";
// import Task from "./Task";
// import AddTask from "./AddTask";
// import { Draggable, Droppable } from "react-beautiful-dnd";

// function Column({ column, board, setBoard }) {
//   const [tasks, setTasks] = useState(
//     column.taskIds.map((taskId) => board.tasks[taskId])
//   );

//   useEffect(() => {
//     // Синхронизация локального состояния с общим состоянием доски
//     setTasks(column.taskIds.map((taskId) => board.tasks[taskId]));
//   }, [column.taskIds, board.tasks]); // Обновление при изменении taskIds в column или при изменениях в tasks в board

//   const sortTasksByCreatedAt = () => {
//     setTasks(
//       [...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//     );
//   };

//   const handleAddTask = (newTask) => {
//     setTasks((prevTasks) => [...prevTasks, newTask]);
//   };

//   return (
//     <Draggable
//       draggableId={column.id}
//       index={parseInt(column.id.replace("column", ""), 10)}
//     >
//       {(provided) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           className="border-2 border-slate-300 dark:border-slate-700 dark:bg-slate-800 m-2 rounded-xl w-52 min-h-[500px] flex flex-col text-center p-2 relative"
//         >
//           <div className="flex justify-between items-center">
//             <h1 className="mt-5 mb-5 font-bold dark:text-cyan-400">
//               {column.title}
//             </h1>
//             <button onClick={sortTasksByCreatedAt}>Sort by Date</button>
//           </div>
//           <Droppable droppableId={column.id} type="task">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {tasks.map((task, index) => (
//                   <Task
//                     key={task.id}
//                     task={task}
//                     index={index}
//                     columnId={column.id}
//                     board={board}
//                     setBoard={setBoard}
//                   />
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <AddTask
//             columnId={column.id}
//             board={board}
//             setBoard={setBoard}
//             onAddTask={handleAddTask}
//           />
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default Column;

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

    // Обновляем состояние board с новым порядком taskIds после сортировки
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

  return (
    <Draggable
      draggableId={column.id}
      index={parseInt(column.id.replace("column", ""), 10)}
    >
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
            <button onClick={sortTasksByCreatedAt}>Sort by Date</button>
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
