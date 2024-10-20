import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [editId, setEditId] = useState(null); // New state to track which todo is being edited

  const addOrUpdateTodo = () => {
    if (inputVal.trim() !== "") {
      if (editId) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputVal } : todo
        );
        setTodos(updatedTodos);
        setEditId(null); 
      } else {
        const newTodo = {
          id: new Date().getTime(),
          text: inputVal,
        };
        setTodos([...todos, newTodo]);
      }
      setInputVal(""); 
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, text) => {
    setInputVal(text); 
    setEditId(id); 
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Todo List</h2>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        style={{
          width: "calc(100% - 22px)",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={addOrUpdateTodo}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: editId ? "#ffc107" : "#28a745", 
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {editId ? "Update" : "ADD"} 
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: "#fff",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <span>{todo.text}</span>
            <div>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => editTodo(todo.id, todo.text)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
