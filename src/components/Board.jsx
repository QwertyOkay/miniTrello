// import { useState, useEffect } from "react";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import { board_data } from "../data";
// import AddColumn from "./AddColumn";
// import Column from "./Column";

// function Board(props) {
//   const initialData = { tasks: {}, columns: {}, columnOrder: [] };
//   const [board, setBoard] = useState(initialData);

//   useEffect(() => {
//     setBoard(board_data);
//   }, []);

//   // async function fetchBoard() {
//   //     const response = await fetch('/board');
//   //     const data = await response;
//   //     console.log(data);
//   //     return data;
//   // }

//   function onDragEnd(result) {
//     const { destination, source, draggableId, type } = result;
//     // if there is no changes then so be it (nothing changes returns nothing)
//     if (!destination) {
//       return;
//     }
//     // if they pick and drop on the same place then so be it
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }
//     // if there is column being swap this task will trigger
//     if (type === "column") {
//       const newColumnOrder = Array.from(board.columnOrder); // copy from original column sequences
//       newColumnOrder.splice(source.index, 1); // based on the source of the column dragged, deletes its original position
//       newColumnOrder.splice(destination.index, 0, draggableId); // then add its to the new location index. Refer Array.splice method

//       // now set the column order to the new order created.
//       setBoard({
//         ...board,
//         columnOrder: newColumnOrder,
//       });

//       return;
//     }

//     // rearrange the task ids for each column that changed
//     const start = board.columns[source.droppableId]; // started column (the original location of column of task that get to be moved)
//     const finish = board.columns[destination.droppableId]; // the finish location column (final location of column of task that dragged)

//     // check up if the task moved on the same column or moved to the other
//     if (start === finish) {
//       const newTaskIds = Array.from(start.taskIds);
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...start,
//         taskIds: newTaskIds,
//       };

//       setBoard((prevBoard) => ({
//         ...prevBoard,
//         columns: {
//           ...prevBoard.columns,
//           [newColumn.id]: newColumn,
//         },
//       }));
//     }

//     console.log("Before update:", start.taskIds, finish.taskIds);

//     const startTaskIds = Array.from(start.taskIds);
//     startTaskIds.splice(source.index, 1);
//     const newStartColumn = {
//       ...start,
//       taskIds: startTaskIds,
//     };

//     const finishTaskIds = Array.from(finish.taskIds);
//     finishTaskIds.splice(destination.index, 0, draggableId);
//     const newFinishColumn = {
//       ...finish,
//       taskIds: finishTaskIds,
//     };

//     console.log(
//       "After update:",
//       newStartColumn.taskIds,
//       newFinishColumn.taskIds
//     );

//     setBoard({
//       ...board,
//       columns: {
//         ...board.columns,
//         [newStartColumn.id]: newStartColumn,
//         [newFinishColumn.id]: newFinishColumn,
//       },
//     });
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="all-columns" direction="horizontal" type="column">
//         {(provided) => (
//           <section
//             className="w-full flex justify-center items-center mx-auto my-10"
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {board.columnOrder.map((columnId, index) => {
//               const column = board.columns[columnId];
//               const tasks = column.taskIds.map(
//                 (taskIds) => board.tasks[taskIds]
//               );
//               return (
//                 <Column
//                   key={column.id}
//                   column={column}
//                   tasks={tasks}
//                   index={index}
//                   board={board}
//                   setBoard={setBoard}
//                 />
//               );
//             })}
//             {provided.placeholder}
//             <AddColumn board={board} setBoard={setBoard} />
//           </section>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

// export default Board;

import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { board_data } from "../data";
import AddColumn from "./AddColumn";
import Column from "./Column";

function Board() {
  const [board, setBoard] = useState(board_data); // Используем board_data как начальное состояние

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = board.columns[source.droppableId];
    const finishColumn = board.columns[destination.droppableId];

    // Перемещение внутри одной колонки
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: {
          ...prevBoard.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      // Перемещение между колонками
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: {
          ...prevBoard.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <section
            className="w-full flex items-center mx-auto my-10"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {board.columnOrder.map((columnId, index) => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  board={board}
                  setBoard={setBoard}
                />
              );
            })}
            {provided.placeholder}
            <AddColumn board={board} setBoard={setBoard} />
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
