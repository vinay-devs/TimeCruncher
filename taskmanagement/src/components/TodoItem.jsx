import React, { useState } from "react";

function TodoItem(props) {
  const [complete, setComplete] = useState(false);
  console.log(complete);
  function removeTask(id) {
    // console.log(props.id);
    props.deleteItem(id);
  }
  function checkBoxHandler() {
    console.log(complete);
    updateStatus(props.id, !complete);
    return complete ? setComplete(false) : setComplete(true);
  }
  function updateStatus(id, newStatus) {
    // console.log(newStatus);
    props.updateStatus(id, newStatus);
  }
  return (
    <div>
      <li
        style={{
          textDecoration: complete ? "line-through" : null,
          listStyle: "none",
        }}
      >
        <input
          type="checkbox"
          value={props.status}
          onClick={() => {
            // console.log(complete);
            checkBoxHandler();
            // console.log(complete);
          }}
        />
        {props.todo}
      </li>
      <button
        onClick={() => {
          removeTask(props.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
