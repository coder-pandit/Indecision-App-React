import React from 'react';
import Option from './Option';

const Options = props => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove all</button>
    {props.options.length === 0 && <p>Please add an option to get started</p>}
    {props.options.map(optionText => (
      <Option
        key={optionText}
        optionText={optionText}
        handleDeleteOption={props.handleDeleteOption}
        // this is to delete single optiom which will be used in Option so we will directly pass it to Option
      />
    ))}
  </div>
);

export default Options;
