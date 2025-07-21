import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ todo, onRemove, onToggle, isOpen, onToggleDescription, onEdit }) {
  const [editing, setEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const [editDeadline, setEditDeadline] = React.useState(todo.deadline || '');
  const [editDescription, setEditDescription] = React.useState(todo.description || '');
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleSave = () => {
    onEdit(todo.id, editText, editDeadline, editDescription);
    setEditing(false);
  };

  const today = new Date();
  const deadlineDate = todo.deadline ? new Date(todo.deadline) : null;
  const isWithinOneWeek = deadlineDate && (deadlineDate - today) / (1000 * 60 * 60 * 24) <= 7;
  const isOverdue = deadlineDate && deadlineDate < today;

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className='todo-left'>
        <input
          className='todo-checkbox'
          type="checkbox"
          title={`${todo.completed ? "Markera uppgift som ej slutförd" : "Markera uppgift som slutförd"}`}
          checked={todo.completed}
          onChange={e => { e.stopPropagation(); onToggle(); }}
        />
      </div>
      <div className='separator-line'></div>
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>

        {todo.deadline && <span className="todo-deadline">Deadline: {todo.deadline}</span>}
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
        {isOpen && todo.description && (
          <div className="todo-description">
            {todo.description}
          </div>
        )}
                <div>
        {/* Visa info-ikon om beskrivning finns */}
        {todo.description && (
          <button
            className="info-btn"
            title={isOpen ? "Dölj beskrivning" : "Visa beskrivning"}
            onClick={e => { e.stopPropagation(); onToggleDescription(); }}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
        )}
        <button
          className="edit-btn"
          title="Redigera"
          onClick={e => { e.stopPropagation(); setEditing(true); }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        </div>
        {/* Redigeringsformulär */}
        {editing && (
          <div className="modal-overlay">
            <div className="modal-content">
              <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                maxLength={50}
              />
              <input
                type="date"
                value={editDeadline}
                onChange={e => setEditDeadline(e.target.value)}
              />
              <textarea
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                maxLength={300}
                rows={3}
              />
              <button onClick={handleSave}>Spara</button>
              <button onClick={() => setEditing(false)}>Avbryt</button>
              </div>
          </div>
        )}
      </div>
      <div className='separator-line'></div>
      <div className='todo-right'>
      <button onClick={e => { e.stopPropagation(); setShowConfirm(true); }}>Ta bort</button>
      </div>
      {/* Bekräftelsemodal för borttagning */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Är du säker på att du vill ta bort denna uppgift?</p>
            <button onClick={() => { setShowConfirm(false); onRemove(); }}>Ja, ta bort</button>
            <button onClick={() => setShowConfirm(false)}>Avbryt</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
