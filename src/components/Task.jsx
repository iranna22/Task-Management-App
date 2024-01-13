import React, { memo, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import toast from 'react-hot-toast';
import './Task.css'; 

const Task = memo(({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = useCallback((id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(fTasks));
    setTasks(fTasks);

    toast('Task Removed');
  }, [tasks, setTasks]);

  return (
    <div ref={drag} className={`task-container ${isDragging ? 'dragging' : ''}`}>
      <p className="task-name">{task.name}</p>
      <button className="remove-button" onClick={() => handleRemove(task.id)}>
        <div className="custom-remove-icon"></div>
      </button>
    </div>
  );
});

export default Task;
