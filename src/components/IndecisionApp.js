import React, { Component } from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  // show alert box when what should i do is clicked
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const selectedOption = this.state.options[randomNum];
    this.setState(() => ({ selectedOption }));
  };

  // to close alert box on okay button click i.e. clearing selected option
  handleClearSelectedOptions = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  // to remove all items
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] })); // for returning object in one line in arrow functions just wrap the object in parentheses.
  };

  // to remove single item
  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      // if filter return false that item will be removed from array
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  };

  handleAddOption = option => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  };

  // @Override (annotation is not available in js just written for understanding)
  // will be called as soon as component is rendered to screen
  componentDidMount() {
    try {
      // getting data from local storage as soon as component is rendered to screen for first time
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing
    }
  }

  // @Override
  // will be called as soon as component is updated i.e. any state change or prop change
  componentDidUpdate(prevProp, prevState) {
    // saving data to local storage if there is any change in data
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json); // saving data to localStorage
    }
  }

  // @Override
  // called just before component goes away
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // @Override
  render() {
    const subTitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subTitle={subTitle} />
        {/* whatever is passed as property from here can be used in the class (Header) in this case under this.props as objects */}
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        {/* if a function reference is passed then that function can also be called under this.props inside the class. That call will call the function here do the tasks */}
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
          // want to delete single option so it should passed to Option but we can't pass it to Option directly so we have to pass it to Options first then from Options we will pass it to Option
        />
        <AddOption handleAddOption={this.handleAddOption} />
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOptions={this.handleClearSelectedOptions}
        />
      </div>
    );
  }
}

export default IndecisionApp;
