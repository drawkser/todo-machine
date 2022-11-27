import React, { createContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = createContext();

function TodoProvider(props) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage("TODOS_V2", []);
    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(false)

    const completedTodos = todos.filter((todo) => todo.completed).length;
    const totalTodos = todos.length;
    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchValue.toLowerCase())
    );

    const completeTodo = (text) => {
        var todoTemp = [...todos];
        var objIndex = todoTemp.findIndex((todo) => todo.text === text);
        todoTemp[objIndex].completed
            ? (todoTemp[objIndex].completed = false)
            : (todoTemp[objIndex].completed = true);
        saveTodos(todoTemp);
    };

    const deleteTodo = (text) => {
        var todoTemp = [...todos];
        var objIndex = todoTemp.findIndex((todo) => todo.text === text);
        todoTemp.splice(objIndex, 1);
        saveTodos(todoTemp);
    };
    return (
        <TodoContext.Provider
            value={{
                error,
                loading,
                totalTodos,
                completedTodos,
                searchValue,
                setSearchValue,
                filteredTodos,
                completeTodo,
                deleteTodo,
                openModal,
                setOpenModal,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
