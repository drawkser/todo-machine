import React, { useContext, useState } from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

function TodoForm() {
    const [newTodoValue, setNewTodoValue] = useState("");
    const { addTodo, setOpenModal } = useContext(TodoContext);
    const [ errorMessage, setErrorMessage ] = useState("");

    const onChange = (event) => {
        if(event.target.value !== "")
            setErrorMessage("");
        setNewTodoValue(event.target.value);
    };

    const onCancel = () => {
        setOpenModal(false);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (newTodoValue === "") {
            setErrorMessage("This cannot be empty .... please try again")
        } else {
            addTodo(newTodoValue);
            setOpenModal(false);
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <label> </label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="This is a task, please provide a name"
            />
            <p className="Error-message-add-todo">{errorMessage}</p>
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    className="TodoForm-button TodoForm-button--cancel"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export { TodoForm };
