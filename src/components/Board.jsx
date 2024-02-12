import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { board_data } from "../data";
import AddColumn from "./AddColumn";
import Column from "./Column";

function Board() {
  const [board, setBoard] = useState(board_data);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard((prevBoard) => ({
        ...prevBoard,
        columnOrder: newColumnOrder,
      }));
      return;
    }

    const startColumn = board.columns[source.droppableId];
    const finishColumn = board.columns[destination.droppableId];

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
