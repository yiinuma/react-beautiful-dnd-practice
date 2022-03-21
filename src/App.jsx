/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import { Column } from './Column';
import initialData from './initial-data';

const Container = styled.div`
  display: flex;
`;

export function App() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // destination: ドロップ先 がない場合には処理を終了
    if (!destination) {
      return;
    }

    // ドロップ前後のIDが同じで、ドロップ前後のindexが同じ場合には処理を終了
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = state.columns[source.droppableId]; // 開始時のカラムを取得
    const finish = state.columns[destination.droppableId]; // 終了時のカラムを取得

    if (start === finish) {
      // 開始時のカラムと終了時のカラムが同じであれば実行
      const newTasksIds = [...start.taskIds];
      const [removed] = newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, removed);

      const newColumn = {
        ...start,
        taskIds: newTasksIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      console.log(newColumn, newState);
      return;
    }

    // 開始カラムと終了カラムが違う場合の処理
    const startTasksIds = [...start.taskIds]; // 開始時のカラムからタスクのidを取得
    const [add] = startTasksIds.splice(source.index, 1); // draggableなコンポーネントが元あった場所から1つ配列を削除する

    const newStart = {
      ...start, // 開始時のカラムをコピー
      taskIds: startTasksIds, // taskIdsの値をstartTaskIdsに置き換える
    };

    const finishTasksIds = [...finish.taskIds]; // 終了時のカラムからタスクのidを取得
    finishTasksIds.splice(destination.index, 0, add); // draggableなコンポーネントが置かれた場所にdraggableなコンポーネントを追加する
    const newFinish = {
      ...finish, // 終了時のカラムをコピー
      taskIds: finishTasksIds, // taskIdsの値をfinishTaskIdsに置き換える
    };

    const newState = {
      ...state, // stateをコピー
      columns: {
        ...state.columns, // columnsをコピー
        [newStart.id]: newStart, // start時のid: {id: start時のid, title: 'start時のtitle', taskIds: 'start時のids'}
        [newFinish.id]: newFinish, // finish時のid: {id: finish時のid, title: 'finish時のtitle', taskIds: 'finish時のids'}
      },
    };
    setState(newState); //stateの更新→再レンダリング
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}
