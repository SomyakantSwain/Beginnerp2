import React, { useState, useEffect } from "react";
import "../index.css";

const Todo = () => {
  const [todos, settodos] = useState([]);
  const [input, setinput] = useState("");

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      settodos(savedTodos);
    }
  }, []);

  const handleSubmit = () => {
    if (!input) return;

    const newTodo = {
      text: input,
      id: `${Math.floor(Math.random() * 10000)}` // Use a larger range for unique IDs
    };

    const updatedTodos = [...todos, newTodo];
    settodos(updatedTodos);

    // Save the updated todos array to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setinput("");
  };

  const removetodo = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    settodos(updatedTodos);

    // Save the updated todos array to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="New Todo"
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <ul className="todos-list">
        {todos.map((item) => (
          <li className="todo" key={item.id}>
            <span>{item.text}</span>
            <button className="close" onClick={() => removetodo(item.id)}>clear</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
