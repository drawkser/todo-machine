import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoForm } from "../TodoForm";
import { CreateToDoButton } from "../CreateToDoButton";
import { Modal } from "../Modal";

function AppUI() {
    const {
        error,
        loading,
        filteredTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
    } = useContext(TodoContext);
    return (
        <>
            <TodoCounter />
            <TodoSearch />
            <TodoList>
                {loading && <p>Loading page, please wait . . .</p>}
                {error && (
                    <p>
                        An error was found, please reload and if the failure
                        persist contact suppot.
                    </p>
                )}
                {!loading && !filteredTodos.length && (
                    <p>Create your first todo! The time is now!</p>
                )}
                {filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                ))}
            </TodoList>
            {openModal && (
                <Modal>
                    <TodoForm></TodoForm>
                </Modal>
            )}

            <CreateToDoButton setOpenModal={setOpenModal} />
        </>
    );
}

export { AppUI };
