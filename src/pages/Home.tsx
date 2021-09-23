import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    setTasks(oldTasks => oldTasks.filter(
      task => task.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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