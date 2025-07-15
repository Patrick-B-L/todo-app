const sortTodos = (todos, order) => {
  switch (order) {
    case 'deadline-asc':
      return [...todos].sort((a, b) => new Date(a.deadline || Infinity) - new Date(b.deadline || Infinity));
    case 'deadline-desc':
      return [...todos].sort((a, b) => new Date(b.deadline || 0) - new Date(a.deadline || 0));
    case 'created-desc':
      return [...todos].reverse();
    case 'created-asc':
    default:
      return todos; // Ingen sortering, använd ursprunglig ordning
  }
};
export default sortTodos;