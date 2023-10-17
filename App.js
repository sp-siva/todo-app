import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState('');
  let [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const newTask = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  const toggleTodoStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <div>
        <label>
          <input
            type="checkbox"
            checked={filterCompleted}
            onChange={() => setFilterCompleted(!filterCompleted)}
          />
          Show completed tasks
        </label>
      </div>
      <ul>
        {todos
          .filter((todo) => (!filterCompleted || todo.completed))
          .map((todo) => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <span onClick={() => toggleTodoStatus(todo.id)}>{todo.title}</span>
              <button onClick={() => editTodo(todo.id, prompt('Edit task:', todo.title))}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
