import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  console.log(todos);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo.trim().length !== 0) {
      setTodos((prev) => [
        ...prev,
        { id: uuidv4(), text: todo, status: false },
      ]);
    }
    setTodo("");
    // add new todo item to the todos array
  };
  const updateStatus = (id, newStatus) => {
    const updatedItems = todos.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setTodos(updatedItems);
  };
  const deleteItem = (id) => {
    setTodos((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            id={todo.id}
            todo={todo.text}
            deleteItem={deleteItem}
            status={todo.status}
            updateStatus={updateStatus}
          />
        ))}
      </ul>
      <div></div>
    </div>
  );
}

export default TodoList;
