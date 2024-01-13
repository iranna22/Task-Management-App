import React, { memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import Header from './Header';
import Task from './Task';
import './Section.css'; 

const Section = memo(({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = 'Todo';
  let bg = '#667eea'; 
  let tasksToMap = todos;

  if (status === 'inprogress') {
    text = 'In Progress';
    bg = '#9333ea'; 
    tasksToMap = inProgress;
  }

  if (status === 'closed') {
    text = 'Closed';
    bg = '#48bb78'; 
    tasksToMap = closed;
  }

  const addItemToSection = useCallback((id) => {
    setTasks((prev) => {
      const modifiedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem('tasks', JSON.stringify(modifiedTasks));
      toast('Task status changed');
      return modifiedTasks;
    });
  }, [status, setTasks]);
return (
    <div ref={drop} className={`section-container ${isOver ? 'bg-slate-200' : ''}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      <div className="section-tasks">
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
      </div>
    </div>
  );
});

export default Section;
