export const board_data = {
    tasks: {
    task1: {id: 'task1', content: 'Hold the Column or task to drag in between them.', createdAt: new Date().toISOString()},
    task2: {id: 'task2', content: 'Press + to add new Column.', createdAt: new Date().toISOString()},
    task3: {id: 'task3', content: 'Press + inside column to add task.', createdAt: new Date().toISOString()},
    task4: {id: 'task4', content: 'Double-click on task to delete.', createdAt: new Date().toISOString()}
},
    columns: {
        column1: {
            id: 'column1',
            title: 'New Tasks',
            taskIds: ['task3']
        },
        column2: {
            id: 'column2',
            title: 'In Progress',
            taskIds: ['task1']
        },
        column3: {
            id: 'column3',
            title: 'In Review',
            taskIds: ['task4']
        },
        column4: {
            id: 'column4',
            title: 'Done',
            taskIds: []
        }
    },
    columnOrder: ['column1', 'column2', 'column3', 'column4']
}

;