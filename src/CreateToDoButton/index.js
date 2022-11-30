import React from "react";
import "./CreateToDoButton.css";
import PlusIconImage from "./plus-icon.svg";

function CreateToDoButton(props) {
    const onClickButton = () => {
        props.setOpenModal((prevState) => !prevState);
    };
    return (
        <button className="CreateToDoButton" onClick={onClickButton}>
            {/* <div className="CreateTODOButton-circle">h</div> */}
            <img className="hijo" src={PlusIconImage} alt="Add Todo" />
        </button>
    );
}

export { CreateToDoButton };
