import React from 'react';

const Action = props => (
  <div>
    <button onClick={props.handlePick} disabled={!props.hasOptions}>
      {/* here props.handlePick is a function reference passed as property & used as onCLick property for button here. onClick event on button will call that function. */}
      What should i do
    </button>
  </div>
);

export default Action;
