import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./Button";
import TodoItem from "./TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState({
    index: null,
    content: "",
  });
  const [showCongratulation, setShowCongratulation] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (editTodo.index !== null) {
      saveEditedTodo();
    } else if (newTodo) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { content: newTodo, done: false, id: Date.now() },
      ]);
      setNewTodo("");
    }
  }

  function handleDone(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    checkAllDone(updatedTodos);
  }

  function removeTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function editTodos(index) {
    setEditTodo({
      index: index,
      content: todos[index].content,
    });
  }

  function saveEditedTodo() {
    const updatedTodos = todos.map((todo, i) =>
      i === editTodo.index ? { ...todo, content: editTodo.content } : todo
    );
    setTodos(updatedTodos);
    setEditTodo({
      index: null,
      content: "",
    });
  }

  function checkAllDone(updatedTodos) {
    const allDone = updatedTodos.every((todo) => todo.done);
    if (allDone) {
      setShowCongratulation(true);
    } else {
      setShowCongratulation(false);
    }
  }

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          placeholder="Enter task"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={addTodo} title="Add" className="add-task-btn">
          Add task
        </Button>
      </div>
      {showCongratulation && (
        <div className="congratulation">
          <p>Congratulations, you are done with all your tasks!</p>
        </div>
      )}
      <TodoItem
        todos={todos}
        handleDone={handleDone}
        removeTodo={removeTodo}
        editTodos={editTodos}
        saveEditedTodo={saveEditedTodo}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
    </>
  );
}

export default App;