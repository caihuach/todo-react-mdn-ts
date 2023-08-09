/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import {
  IAddTask,
  IAppProps,
  IDeleteTask,
  IEditTask,
  ITask,
  IToggleTaskCompleted,
} from './interfaces';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: (task: ITask) => !task.completed,
  Completed: (task: ITask) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props: IAppProps) {
  // console.log('app');
  // const { tasks } = props;
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const addTask: IAddTask = function (name) {
    const newTask: ITask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  };

  const editTask: IEditTask = function (id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const toggleTaskCompleted: IToggleTaskCompleted = function (id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask: IDeleteTask = function (id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter as keyof typeof FILTER_MAP])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressesd={name === filter}
      setFilter={setFilter}
    />
  ));

  const headingText = `${taskList.length} task${
    taskList.length === 1 ? 'task' : 'tasks'
  } remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
