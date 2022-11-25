import React, { useState } from 'react';
import { AppUI } from './AppUI';

const defaultTodos = [
  {text: 'Cortar Cebolla', completed: false},
  {text: 'Cortar Tomate', completed: true},
  {text: 'Cortar Zanahoria', completed: true},
  {text: 'Blop', completed: false},
]

function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1');
  let parsedTodos;
  
  if(!localStorageTodos) {
    parsedTodos = []
    localStorage.setItem('TODOS_V1', JSON.stringify(parsedTodos));
  } else {
    parsedTodos = JSON.parse(localStorageTodos)
  }

  const [todos, setTodos] = useState(parsedTodos);
  const [searchValue, setSearchValue] =  useState('');


  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const filteredTodos = todos.filter((todo) => (todo.text.toLowerCase().includes(searchValue.toLowerCase())) );
  
  const saveTodos = (newTodos) => {
    const todosString = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', todosString)
    setTodos(newTodos)
  }

  const completeTodo = (text) => {
    var todoTemp = [...todos]
    var objIndex = todoTemp.findIndex((todo => todo.text === text));
    todoTemp[objIndex].completed ? todoTemp[objIndex].completed=false: todoTemp[objIndex].completed=true
    saveTodos(todoTemp)
  }  

  const deleteTodo = (text) => {
    var todoTemp = [...todos]
    var objIndex = todoTemp.findIndex((todo => todo.text === text));
    todoTemp.splice(objIndex,1)
    saveTodos(todoTemp)
  } 
  

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      filteredTodos={filteredTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
