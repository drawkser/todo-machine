import React, { useState, useEffect } from 'react';
import { AppUI } from './AppUI';

// const defaultTodos = [
//   {text: 'Cortar Cebolla', completed: false},
//   {text: 'Cortar Tomate', completed: true},
//   {text: 'Cortar Zanahoria', completed: true},
//   {text: 'Blop', completed: false},
// ]

function useLocalStorage(itemName, initialValue) {

  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;
  
  if(!localStorageItem) {
    parsedItem = initialValue
    localStorage.setItem(itemName, JSON.stringify(parsedItem));
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = useState(parsedItem);

  const saveItem = (newItems) => {
    const todosString = JSON.stringify(newItems);
    localStorage.setItem(itemName, todosString)
    setItem(newItems)
  };

  return [
    item,
    saveItem
  ]

}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V2', []);
  const [searchValue, setSearchValue] =  useState('');

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const filteredTodos = todos.filter((todo) => (todo.text.toLowerCase().includes(searchValue.toLowerCase())) );

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

  console.log('render before use effec')

  useEffect(()=> {
    console.log('use effect code')
  });

  console.log('after use effec')

  
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
