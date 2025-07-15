// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// first app
// import React, { useState } from 'react';

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([...todos, newTodo]);
//       setNewTodo("");
//     }
//   };

//   const removeTodo = (index) => {
//     const updatedTodos = todos.filter((_, i) => i !== index);
//     setTodos(updatedTodos);
//   };

//   return (
//     <div style={{ textAlign: 'center', margin: '20px' }}>
//       <h1>Todo App</h1>
//       <input 
//         type="text" 
//         value={newTodo} 
//         onChange={(e) => setNewTodo(e.target.value)} 
//         placeholder="Lägg till en uppgift" 
//       />
//       <button onClick={addTodo}>Lägg till</button>
//       <ul>
//         {todos.map((todo, index) => (
//           <li key={index}>
//             {todo} <button onClick={() => removeTodo(index)}>Ta bort</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

//Improved app
import React from 'react';
import TodoApp from './components/TodoApp';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <TodoApp />
    </div>
  );
}

export default App;
