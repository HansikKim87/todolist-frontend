import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Input from "./components/input";
import Todo from "./components/todo";

function App() {
  
  const baseUrl = "http://localhost:8080";

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, [])

  async function getTodos() {
    await axios
      .get(baseUrl + "/todo")
      .then((response) => {
        setTodos(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await axios
            .post(baseUrl + "/todo", {
              todoName: input
            })
            .then((response) => {
              console.log(response.data);
              setInput("");
              getTodos();
            })
            .catch((error) => {
              console.error(error);
            })
    }

    insertTodo();
    console.log("Register completed")
  }

  function updateTodo(id) {
    console.log(id);
    const updateTodo = async () => {
      await axios
            .put(baseUrl + "/todo/" + id, {}
            )
            .then((response) => {
              console.log(response.data);
              setTodos(
                todos.map((todo) =>
                  todo.id === response.data.id ? { ...todo, completed: response.data.completed} : todo
                )
              )
            })
            .catch((error) => {
              console.error(error);
            })
    }

    updateTodo();
    console.log("Update completed")
  }

  function deleteTodo(id) {
    console.log(id);
    const deleteTodo = async () => {
      await axios
            .delete(baseUrl + "/todo/" + id, {}
            )
            .then((response) => {
              console.log(response.data);
              setTodos(
                todos.filter((todo) => todo.id !== id)
              )
            })
            .catch((error) => {
              console.error(error);
            })
    }

    deleteTodo();
    console.log("Delete completed")
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <Input handleSubmit={insertTodo} input={input} handleChange={changeText} />

      {
        todos
        ? todos.map((todo) => {
          return (
            <Todo key={todo.id} todo={todo} handleUpdateTodo={() => updateTodo(todo.id)} handleDeleteTodo={() => deleteTodo(todo.id)} />
          )

        })
        : null
      }
    </div>
  );
}

export default App;
