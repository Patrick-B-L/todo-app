export const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed); // Endast aktiva uppgifter
    case 'completed':
      return todos.filter(todo => todo.completed); // Endast slutförda uppgifter
    default:
      return todos; // Alla uppgifter
  }
};
