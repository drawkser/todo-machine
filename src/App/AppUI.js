import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateToDoButton } from '../CreateToDoButton';

function AppUI({
  totalTodos,
  completedTodos,
  searchValue,
  setSearchValue,
  filteredTodos,
  completeTodo,
  deleteTodo,
}) {
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
        onComplete={() => completeTodo(todo.text)}
        onDelete={() => deleteTodo(todo.text)}
        />)}
    </TodoList>
    <CreateToDoButton />
  </>
  );
}

export { AppUI };