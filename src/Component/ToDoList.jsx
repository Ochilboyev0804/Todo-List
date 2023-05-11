import React from 'react'
import { useState } from 'react'
import './ToDoList.css'
const ToDoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [Edit, setEdit] = useState(null)
  const [todos, setTodos] = useState(() => {
    const storiedItem = localStorage.getItem('todos')
    return storiedItem ? JSON.parse(storiedItem) : []
  })
  const handlSubmit = (event) => {
    event.preventDefault();
    if(!newTodo.trim()) return;

    if(Edit !== null) {
        const updateTodo = todos.map((todo) => {
            if(todo.id === Edit) {
                return {...todo, text: newTodo}
            }else {
                return todo;
            }
        })
        setTodos(updateTodo);
        setEdit(null);
        setNewTodo('')
    }else {
        setTodos([...todos, { id: Date.now(), text: newTodo }]);
        setNewTodo('')
    }

 
  }
  localStorage.setItem('todos', JSON.stringify(todos))

  const handlChangeInput = (e) => {
    setNewTodo(e.target.value)
  }
  const handlDelete = (id) => {
    const updateTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodo)
  }
  const handlEdit = (id) => {
    const todoedit = todos.find((todo) => todo.id === id);
    setEdit(id);
    setNewTodo(todoedit.text);
  }
console.log(newTodo);
  return (
   <div className="Todos">
     <div className='container'>
        <div className='todo'>
        <h1>ToDoList</h1>
      <form className='forma' onSubmit={handlSubmit}>
      <input className='input' type="text" value={newTodo} onChange={handlChangeInput}/>
      <button className='Addbtn' type='submit'>Add Todo</button>
      
      </form>
      <ul>
      {
      todos.map((todo, index) => (
        <li className='list' key={index}>
          <span className='text'>{todo.text}</span>
          <button className='btn' onClick={() => handlDelete(todo.id)}>Delete</button>
          <button className='btn'  onClick={() => handlEdit(todo.id)}>Edit</button>

        </li>
      ))}
      </ul>
        </div>
    
    </div>
   </div>
  )
}

export default ToDoList