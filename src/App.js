import './App.css';
import React, { useState } from 'react';
import { TodoCounter } from './TodoCounter';
import {TodoSearch} from './TodoSearch';
import {TodoList} from './TodoList';
import {CreateToDoButton} from './CreateToDoButton';
import {TodoItem} from './TodoItem';

const defaultTodos = [
  {text: 'Cortar Cebolla', completed: true},
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
        {filteredTodos.map(todos => 
        <TodoItem 
          key={todos.text} 
          text={todos.text}
          completed={todos.completed} />)}
      </TodoList>
      <CreateToDoButton />
    </>
  );
}

export default App;
