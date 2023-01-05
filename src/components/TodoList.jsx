import { useRef } from "react";
const TodoList = ({ loading, data, err, BASE_URL, setErr }) => {
  const todoRef = useRef(null);
  const handleComplete = async (id) => {
    const complete = await fetch(BASE_URL + `todo/update/${id}`)
      .then((res) => {
        res.json();
        todoRef.current.style.textDecoration = "line-through";
      })
      .catch((e) => {
        setErr(true);
        console.log(e);
      });
    console.log(complete);
  };
  const handleDelete = async (id) => {
    await fetch(BASE_URL + `todo/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((e) => {
        setErr(true);
        console.log(e);
      });
  };
  return (
    <div className="todos">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {err ? (
            <h1>Something went Wrong please reload</h1>
          ) : (
            <>
              {data
                .sort((a, b) => b.id - a.id)
                .map((todo, i) => {
                  return (
                    <div key={i} className="todo">
                      <input
                        type="checkbox"
                        onChange={() => handleComplete(todo._id)}
                      />
                      <h5 ref={todoRef}>{todo.text}</h5>
                      <button onClick={() => handleDelete(todo._id)}>
                        DELETE
                      </button>
                    </div>
                  );
                })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
