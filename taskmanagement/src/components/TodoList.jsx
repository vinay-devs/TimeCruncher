import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
  // const completedTask = () => {
  //   setCompletedTask([1, 2, 3]);
  // };
  return (
    <Content>
      <H1>Todo List</H1>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Add Todo"
          fullWidth
          variant="outlined"
          type="text"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <Button
          style={{ backgroundColor: "lightgreen" }}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </Form>
      <Tasks>
        <Task>
          <H2>In Progress</H2>
          <DragDropContext draggableId="drag">
            <Droppable droppableId="todolist">
              {(provided) => (
                <ul
                  style={{ padding: "0px" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todos
                    .filter((item) => !item.status)
                    .map((todo, index) => {
                      return (
                        <TodoItem
                          key={todo.id}
                          id={todo.id}
                          todo={todo.text}
                          deleteItem={deleteItem}
                          status={todo.status}
                          updateStatus={updateStatus}
                          index={index}
                          // completedTask={completedTask}
                        />
                      );
                    })}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </Task>
        <Task>
          <H2>Completed</H2>
          <ul style={{ padding: "0px" }}>
            {todos
              .filter((item) => item.status)
              .map((todo, index) => {
                // console.log(todo);
                return (
                  <TodoItem
                    key={index}
                    id={todo.id}
                    todo={todo.text}
                    deleteItem={deleteItem}
                    status={todo.status}
                    updateStatus={updateStatus}
                    // completedTask={completedTask}
                  />
                );
              })}
          </ul>
        </Task>
      </Tasks>
    </Content>
  );
}

const Task = styled.div`
  width: 35%;
  min-height: 300px;
  height: 40%;
  border-radius: 7px;
  border: 2px solid black;
`;
const Tasks = styled.div`
  display: flex;
  justify-content: space-around;
`;

const H1 = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 13px;
`;
const Content = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  row-gap: 25px;
`;

const H2 = styled.h2`
  text-align: center;
  margin: 1px;
  border: 2px solid black;
  border-radius: 7px;
`;
export default TodoList;
