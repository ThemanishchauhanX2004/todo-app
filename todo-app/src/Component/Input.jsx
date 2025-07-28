import React, { useEffect, useState } from 'react';

function Input({ taskList, setTaskList }) {
  let [newTask, setNewTask] = useState("");

  useEffect(() => {
    let storedTask = JSON.parse(localStorage.getItem("Task"));
    if (Array.isArray(storedTask)) {
      setTaskList(storedTask);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Task", JSON.stringify(taskList));
  }, [taskList]);

  let handleAdd = () => {
    const trimmedTask = newTask.trim();
    if (trimmedTask === "") {
      alert("Empty strings not allowed");
    } else if (
      taskList.some(task => task.toLowerCase() === trimmedTask.toLowerCase())
    ) {
      alert("Task already exists");
    } else {
      setTaskList([...taskList, trimmedTask]);
    }
    setNewTask("");
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}

export default Input;
