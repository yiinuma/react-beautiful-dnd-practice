const initialData = {
  tasks: [
    { id: 'task1', content: 'Take out the garbage' },
    { id: 'task2', content: 'Watch my favorite show' },
    { id: 'task3', content: 'Charge my phone' },
    { id: 'task4', content: 'Cook dinner' },
  ],
  // tasks: {
  //   task1: { id: 'task1', content: 'Take out the garbage' },
  //   task2: { id: 'task2', content: 'Watch my favorite show' },
  //   task3: { id: 'task3', content: 'Charge my phone' },
  //   task4: { id: 'task4', content: 'Cook dinner' },
  // },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      // taskIds: ['task1', 'task2', 'task3', 'task4'],
      taskIds: [0, 1, 2, 3],
    },

    'column-2': {
      id: 'column-2',
      title: 'progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'], // 追加
};

export default initialData;
