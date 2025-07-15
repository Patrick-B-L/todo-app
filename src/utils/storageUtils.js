//This file is for storing and retrieving todos locally on the computer
export const exportData = (todos) => {
  const dataStr = JSON.stringify(todos, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "todos.json";
  link.click();
};

export const importData = (event, setTodos) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedTodos = JSON.parse(e.target.result);
      setTodos(importedTodos);
    } catch (error) {
      alert("Felaktig fil. Kunde inte importera todo-listan.");
    }
  };
  reader.readAsText(file);
};
