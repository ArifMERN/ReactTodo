import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const BASE_URL = "http://localhost:3001/";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  useEffect(() => {
    // setLoading(true);
    const sub = () => {
      fetch(BASE_URL + "todos")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((e) => {
          setErr(true);
          console.log(e);
        });
    };
    return () => {
      sub();
    };
  }, [data]);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodo BASE_URL={BASE_URL} setData={setData} data={data} />
      <TodoList
        data={data}
        loading={loading}
        err={err}
        BASE_URL={BASE_URL}
        setErr={setErr}
      />
    </div>
  );
};

export default App;
