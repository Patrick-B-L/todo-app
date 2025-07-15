import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import TodoList from './TodoList';
import { exportData, importData } from '../utils/storageUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { filterTodos } from '../utils/filterUtils';
import sortTodos from "../utils/sortTodos"



function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('created-asc')


// Ladda uppgifter från localStorage vid sidladdning
useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
}, []); // Körs endast en gång vid första renderingen

// Spara uppgifter i localStorage vid varje ändring av `todos`
useEffect(() => {
    console.log('Saving todos to localStorage:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

  const addTodo = (newTodo, deadline) => {
    if (!deadline) {
      alert('Vänligen ange en deadline innan du lägger till en uppgift.');
      return; // Stoppar funktionen om deadline saknas
    }

    if (newTodo.trim()) {
      setTodos([...todos, {id: Date.now(), text: newTodo, completed: false, deadline: deadline || null }]);
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };


  return (
    <div className="todo-app">
      <div className='add-item-container'>
      <h1>Todo App</h1>
      <InputField onAddTodo={addTodo} />
      </div>
      <div className="filters">
        <div className="filters-header">Vilka uppgifter vill du visa?</div>
        <button onClick={() => setFilter('all')}
        className={filter === 'all' ? 'active-filter' : ''} 
        >Alla
        </button>
        <button onClick={() => setFilter('active')}
        className={filter === 'active' ? 'active-filter' : ''} 
        >Aktiva
        </button>
        <button onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'active-filter' : ''} 
        >Slutförda
        </button>
      </div>
      <div className="sort-options">
        <label htmlFor="sortOrder">Sortera efter:</label>
          <select
            id="sortOrder"
            value={sortOrder} // Binder till sorteringsordningens state
            onChange={(e) => setSortOrder(e.target.value)} // Uppdatera state vid ändring
          >
            <option value="created-asc">Skapad: Tidigast först</option>
            <option value="created-desc">Skapad: Senast först</option>
            <option value="deadline-asc">Deadline: Tidigast först</option>
            <option value="deadline-desc">Deadline: Senast först</option>
          </select>
      </div>
      <TodoList todos={sortTodos(filterTodos(todos, filter), sortOrder)} onRemoveTodo={removeTodo} onToggleTodo={toggleTodo}/>
      {/* <button onClick={() => exportData(todos)}>Exportera Todo-data</button>
      <input type="file" accept=".json" onChange={(event) => importData(event, setTodos)} />
      <label htmlFor="file-upload" className="custom-file-upload">
        Importera Todo-data
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={(event) => importData(event, setTodos)}
        style={{ display: "none" }} // Dölj det ursprungliga input-elementet
      /> */}
      <button onClick={() => exportData(todos)} className="custom-file-export">
        <FontAwesomeIcon icon={faFileExport} /> Exportera
      </button>
      <label htmlFor="file-upload" className="custom-file-upload">
      <FontAwesomeIcon icon={faFileImport} /> Importera
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={(event) => importData(event, setTodos)}
        style={{ display: "none" }}
      />



    </div>
  );
}

export default TodoApp;
