import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ todo, onRemove, onToggle }) {
    // Jämför dagens datum med deadline
    const today = new Date();
    const deadlineDate = todo.deadline ? new Date(todo.deadline) : null;
    const isWithinOneWeek = deadlineDate && (deadlineDate - today) / (1000 * 60 * 60 * 24) <= 7; // Mindre än 7 dagar
    const isOverdue = deadlineDate && deadlineDate < today; // Deadlinen har passerat
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
    <input 
      type="checkbox" 
      checked={todo.completed} 
      onChange={onToggle} 
    />
    <div className="todo-content">
       <span className="todo-text">{todo.text}</span>
       {todo.deadline && <span className="todo-deadline">Deadline: {todo.deadline}</span>}
                    {/* Visa ikonen baserat på deadline */}
      {!todo.completed && isWithinOneWeek && !isOverdue && (
        <div className="warning">
          <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon orange-icon" />
          <span className="warning-text">Mindre än en vecka till deadline</span>
        </div>
      )}
      {!todo.completed && isOverdue && (
        <div className="warning">
          <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon red-icon" />
          <span className="warning-text">Deadline har passerat</span>
        </div>
      )}
       </div>

      <button onClick={onRemove}>Ta bort</button>
    </li>
  );
}

export default TodoItem;
