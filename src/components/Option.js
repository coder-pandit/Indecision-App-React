import React from 'react';

const Option = props => {
  return (
    <div>
      <li>{props.optionText}</li>
      <button
        onClick={e => {
          // if button is clicked call handleDeleteOption with the argument as optionText
          // it will trigger method in Options which will call method in IndecisionApp
          props.handleDeleteOption(props.optionText);
        }}>
        Remove
      </button>
    </div>
  );
};

export default Option;
