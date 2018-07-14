import React, { Component } from 'react';

// class based components (useful when want to define some states & other properties)
export default class AddOption extends Component {
  state = {
    error: undefined
  };

  handleAddOption = e => {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option); // this is calling function from props
    if (!error) {
      e.target.elements.option.value = '';
    }
    this.setState(() => ({ error }));
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          {/* this.handleAddOption is fnction from this class not from props */}
          <input type="text" name="option" />
          <button>Add option</button>
        </form>
      </div>
    );
  }
}
