import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskProps = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find(task => task.title === newTaskTitle);

    if(taskExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok!"
          }
        ],
        {
          cancelable: true,
        }
      )

      return
    }

    const data = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldTasks => [...oldTasks, data])
  }

  function handleToggleTaskDone(id: number) {
    const findTask = tasks.find(task => task.id === id);

    const updateTask = tasks.map(task => task.id === id ? {
     ...task,
      done: !findTask?.done,
    } : 
    task);

    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => setTasks(oldTasks => oldTasks.filter(task => task.id !== id)),
        },
        {
          text: "Não",
          style: "cancel"
        }
      ],
      {
        cancelable: true,
      }
    )
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskProps) {
    const updateTask = tasks.map(task => task.id === taskId ? {
      ...task,
       title: taskNewTitle,
     } : 
     task);
 
     setTasks(updateTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})