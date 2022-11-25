import React, { useState, useEffect } from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   {text: 'Cortar Cebolla', completed: false},
//   {text: 'Cortar Tomate', completed: true},
//   {text: 'Cortar Zanahoria', completed: true},
//   {text: 'Blop', completed: false},
// ]

function useLocalStorage(itemName, initialValue) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [item, setItem] = useState(initialValue);

    useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;

                if (!localStorageItem) {
                    parsedItem = initialValue;
                    localStorage.setItem(itemName, JSON.stringify(parsedItem));
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }
                setItem(parsedItem);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        }, 1000);
    });

    const saveItem = (newItem) => {
        try {
            const todosString = JSON.stringify(newItem);
            localStorage.setItem(itemName, todosString);
            setItem(newItem);
        } catch (error) {
            setError(true);
        }
    };

    return {
        item,
        saveItem,
        loading,
        error,
    };
}

function App() {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage("TODOS_V2", []);
    const [searchValue, setSearchValue] = useState("");

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
        <AppUI
            error={error}
            loading={loading}
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
