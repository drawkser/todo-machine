import './App.css';
import React, { useState } from 'react';
import { TodoCounter } from './TodoCounter';
import {TodoSearch} from './TodoSearch';
import {TodoList} from './TodoList';
import {CreateToDoButton} from './CreateToDoButton';
import {TodoItem} from './TodoItem';

const defaultTodos = [
  {text: 'Cortar Cebolla', completed: false},
  {text: 'Cortar Tomate', completed: true},
  {text: 'Cortar Zanahoria', completed: true},
  {text: 'Blop', completed: false},
]

function App(props) {

  const [todos, setTodos] = useState(defaultTodos);
  const [searchValue, setSearchValue] =  useState('');

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const filteredTodos = todos.filter((todo) => (todo.text.toLowerCase().includes(searchValue.toLowerCase())) );

  function completeTodo (text){
    var todoTemp = [...todos]
    var objIndex = todoTemp.findIndex((todo => todo.text === text));
    todoTemp[objIndex].completed ? todoTemp[objIndex].completed=false: todoTemp[objIndex].completed=true
    setTodos(todoTemp)
    console.log("It's alive"+ text)
  }  
  

  return (
    <>
      <TodoCounter
      total = {totalTodos}
      completed={completedTodos}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList>
        {filteredTodos.map(todo => 
        <TodoItem 
          key={todo.text}
          text={todo.text}
          completed={todo.completed}
          completeTodo={completeTodo} 
          // todos={todos}
          // setTodos={setTodos}
          />)}
      </TodoList>
      <CreateToDoButton />
    </>
  );
}

export default App;
