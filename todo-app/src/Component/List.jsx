import React, { useState } from 'react';
import '../App.css';

function List({ taskList, setTaskList }) {
  let [completed, setCompleted] = useState([]);
  let [editingIndex, setEditingIndex] = useState(null);
  let [editedTask, setEditedTask] = useState("");

  const handleDelete = (index) => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
    setCompleted(prev => prev.filter(i => i !== index));
  };

  let toggleComplete = (index) => {
    setCompleted(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  let handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTask(taskList[index]);
  };

  let handleSave = (index) => {
    if (editedTask.trim() === "") {
      alert("Task can't be empty");
      return;
    }

    let updatedList = [...taskList];
    updatedList[index] = editedTask.trim();
    setTaskList(updatedList);
    setEditingIndex(null);
  };

  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task, index) => (
          <li
            key={index}
            className={`task-item ${completed.includes(index) ? 'completed' : ''}`}
            onClick={() => {
              if (editingIndex !== index) toggleComplete(index);
            }}
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="edit-input"
                />
                <button onClick={(e) => { e.stopPropagation(); handleSave(index); }}>
                  Save
                </button>
              </>
            ) : (
              <>
                {task}
                <div className="btn-group">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(index); }}>
                    Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </>
  );
}

export default List;
