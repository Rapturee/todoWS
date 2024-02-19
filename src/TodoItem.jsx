import React from 'react';
import Button from './Button';
import "./App.css";


export default function TodoItem({
  todos,
  handleDone,
  removeTodo,
  editTodos,
  saveEditedTodo,
  editTodo,
  setEditTodo
}) {
  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            {editTodo.index === index ? (
              <>
                <input
                  type="text"
                  value={editTodo.content}
                  onChange={(e) =>
                    setEditTodo({
                      ...editTodo,
                      content: e.target.value,
                    })
                  }
                />
                <Button onClick={saveEditedTodo} className="button-save" >Save</Button>{" "}
                <Button
                  onClick={() => setEditTodo({ index: null, content: "" })}
                  className="button-remove"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {todo.content}{" "}
                <Button onClick={() => handleDone(todo.id)} className="button-done">
                  {todo.done ? "Undo" : "Done"}
                </Button>
                <Button onClick={() => editTodos(index)} className="button-edit" >Edit task</Button>{" "}
                <Button onClick={() => removeTodo(todo.id)} className="button-remove" title={"Remove"}>
                  Remove task
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
