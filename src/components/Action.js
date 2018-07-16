import React from 'react';

const Action = props => (
  <div>
    <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      {/* here props.handlePick is a function reference passed as property & used as onCLick property for button here. onClick event on button will call that function. */}
      What should I do?
    </button>
  </div>
);

export default Action;
