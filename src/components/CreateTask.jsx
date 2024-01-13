import React, { useState, memo, useCallback } from 'react';
import { v4 as uuidv4 } from "uuid";
import toast from 'react-hot-toast';
import './CreateTask.css'; 

const CreateTask = memo(({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (task.name.length < 3) return toast.error("A task must have more than 3 characters");
    if (task.name.length > 100) return toast.error("A task must not be more than 100 characters");

    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  }, [task.name, setTasks]);

  const handleInputChange = useCallback((e) => {
    setTask({ ...task, id: uuidv4(), name: e.target.value });
  }, [task]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="custom-input"
        value={task.name}
        onChange={handleInputChange}
      />
      <button className='custom-button'>Create</button>
    </form>
  );
});

export default CreateTask;
