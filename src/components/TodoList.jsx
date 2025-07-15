import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemove={() => onRemoveTodo(todo.id)}
          onToggle={() => onToggleTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
