import React from 'react';

const Option = props => (
  <div className="option">
    <p className="option__text">
      {props.count}. {props.optionText}
    </p>
    <button
      className="button button--link"
      onClick={e => {
        // if button is clicked call handleDeleteOption with the argument as optionText
        // it will trigger method in Options which will call method in IndecisionApp
        props.handleDeleteOption(props.optionText);
      }}
    >
      Remove
    </button>
  </div>
);

export default Option;
