import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

function TodoItem(props) {
  // console.log(complete);

  function removeTask(id) {
    // console.log(props.id);
    props.deleteItem(id);
  }
  function checkBoxHandler() {
    // console.log(complete);
    updateStatus(props.id, !props.status);
    // props.completedTask();
  }
  function updateStatus(id, newStatus) {
    // console.log(newStatus);
    props.updateStatus(id, newStatus);
  }
  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided, snapshot) => {
        return (
          <li
            style={{
              textDecoration: props.status ? "line-through" : null,
              listStyle: "none",
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <input
              type="checkbox"
              checked={props.status}
              onChange={() => {
                // console.log(complete);
                checkBoxHandler();
                // console.log(complete);
              }}
            />
            {props.todo}

            <Button
              size="small"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                removeTask(props.id);
              }}
            >
              Delete
            </Button>
          </li>
        );
      }}
    </Draggable>
  );
}

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 2px;
  border: 2px solid black;
`;
export default TodoItem;
