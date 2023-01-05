import React, { useState, useRef } from "react";

const AddTodo = ({ BASE_URL, setData, data }) => {
  const [newTodo, setNewTodo] = useState("");
  const todo = useRef(null);
  const addTodoButton = useRef(null);
  const addTodo = async (e) => {
    e.preventDefault();
    const todo = await fetch(BASE_URL + "todo/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    var todos = data;
    todos.push(newTodo);
    setData([...todos]);
    setNewTodo("");
    // console.log(data);
  };

  const showTodo = () => {
    todo.current.style.display = "block";
    addTodoButton.current.style.display = "none";
  };
  const hideTodo = () => {
    todo.current.style.display = "none";
    addTodoButton.current.style.display = "block";
  };
  return (
    <>
      <div className="createTodo" ref={todo}>
        <div className="Todo">
          <span onClick={hideTodo}>X</span>
          <input
            type="text"
            value={newTodo}
            placeholder="what's on Your mind...."
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
      </div>
      <button className="addTodo" onClick={showTodo} ref={addTodoButton}>
        +
      </button>
    </>
  );
};

export default AddTodo;
