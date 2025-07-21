import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onRemoveTodo, onToggleTodo, onEditTodo }) {
  const [openId, setOpenId] = useState(null);

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemove={() => onRemoveTodo(todo.id)}
          onToggle={() => onToggleTodo(todo.id)}
          isOpen={openId === todo.id}
          onToggleDescription={() => setOpenId(openId === todo.id ? null : todo.id)}
          onEdit={(id, text, deadline, description) => onEditTodo(id, text, deadline, description)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
