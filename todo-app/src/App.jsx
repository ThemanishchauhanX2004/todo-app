
import React, { useState } from 'react';
import Input from './Component/Input';
import List from './Component/List';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import './App.css';

function App() {
  let [taskList, setTaskList] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("Task"));
    return Array.isArray(saved) ? saved : [];
  });

  let [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`todo-container ${darkMode ? 'dark' : ''}`}>
     
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun/> : < FaMoon style={{color: 'black'}} />}
      </button>
     
      <h1>Todo App</h1>
      <Input taskList={taskList} setTaskList={setTaskList} />
      <List taskList={taskList} setTaskList={setTaskList} />
    </div>
  );
}

export default App;
