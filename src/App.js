import React, { useEffect, useState } from 'react';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import CompletedList from './Components/CompletedList';

function App() {
  const [task, setTask] = useState('');
  const [taskArray, setTaskArray] = useState([]);
  const [completedArray, setCompletedArray] = useState([]);

  const saveToLS = (params) => {
    localStorage.setItem('taskArray',JSON.stringify(taskArray));
    localStorage.setItem('completedArray',JSON.stringify(completedArray));
  }

  useEffect(() => {
    let taskArray = localStorage.getItem('taskArray');
    if (taskArray) {
      let taskArray = JSON.parse(localStorage.getItem('taskArray'));
      setTaskArray(taskArray);
    }

    let completedArray = localStorage.getItem('completedArray');
    if (completedArray) {
      let completedArray = JSON.parse(localStorage.getItem('completedArray'));
      setCompletedArray(completedArray);
    }

  },[])

  const taskAdder = () => {
    if (task.trim() !== '') {
      const newTask = { id: Date.now(), text: task }; // Create a task with a unique ID
      let updatedArray = [newTask, ...taskArray];
      setTaskArray(updatedArray);
      toast.success('Task Added successfully');
      setTask(''); // Clear the input field after adding the task
      saveToLS();
    }
  };

  const deleteTask = (id) => {
    let updatedArray = taskArray.filter(task => task.id !== id); // this filter function will store all the values in updatedArray, that does not have the id of element which we have selected. So, new array will have all the elements except which we have selected. 
    setTaskArray(updatedArray);
    toast.success('Task deleted successfully.');
    saveToLS();
  };

  const handleCompletion = (id, task) => {

    let completedTasks = [...completedArray, task];
    setCompletedArray(completedTasks);
    console.log(completedArray);
    let updatedArray = taskArray.filter(task => task.id !== id);
    setTaskArray(updatedArray);
    toast.success('Task completed.');
    saveToLS();
  };

  return (
    <div className='todoComponent'>
      <div className='todoBox'>
        <h1 className='heading'>To-Do List</h1>
        <div className="taskAdder">
          <input
            type="text"
            id='task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Enter task to add'
          />
          <button className='btn' onClick={taskAdder}>Add Task</button>
        </div>

        <div className="listItems">
          {taskArray.length === 0 ? <div>No To-Do's to display  </div> : taskArray.map((task) => (
            <div key={task.id}>
              <input type="text" value={task.text} readOnly />
              <button className="btn" onClick={() => deleteTask(task.id)}>Delete</button>
              <input type="checkbox" onChange={() => handleCompletion(task.id, task)} />
            </div>
          ))}
        </div>
      </div>

      <CompletedList completedArray={completedArray} />
      <Toaster />
    </div>
  );
}

export default App;
