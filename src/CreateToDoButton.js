import React from 'react';
import './CreateToDoButton.css';

function CreateToDoButton(props) {
  const onClickButton = ()=> {
    alert('The modal should be opened here');
};
  return (
    <button 
      className="CreateToDoButton"
      onClick={onClickButton}
      >
      +
    </button>
  );
}

export { CreateToDoButton };