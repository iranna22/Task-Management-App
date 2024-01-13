import React, { useEffect, useState,memo } from 'react';
import Section from './Section';
import './ListTasks.css'; 
const ListTasks = memo(({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === 'todo');
    const fInProgress = tasks.filter((task) => task.status === 'inprogress');
    const fClosed = tasks.filter((task) => task.status === 'closed');
    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ['todo', 'inprogress', 'closed'];
  return (
    <div className="list-tasks-container">
      {statuses.map((status, index) => (
        <Section
          key={status}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
});

export default ListTasks;
