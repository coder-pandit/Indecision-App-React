class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

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

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  // to remove all items
  handleDeleteOptions() {
    this.setState(() => ({ options: [] })); // for returning object in one line in arrow functions just wrap the object in parentheses.
  }

  // to remove single item
  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      // if filter return false that item will be removed from array
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
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
      </div>
    );
  }
}

// stateless components (fadster as compared to class)
// better to use these for simple tasks like only want to render something without state changes and other things
const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {/* props contains all the attributes passed to the component when it is rendered as object */}
      {props.subTitle && <h2>{props.subTitle}</h2>}
    </div>
  );
};

// defaultProps will be used if property is not found in the props object
Header.defaultProps = {
  title: 'Indecision'
};

const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        {/* here props.handlePick is a function reference passed as property & used as onCLick property for button here. onClick event on button will call that function. */}
        What should i do
      </button>
    </div>
  );
};

const Options = props => {
  return (
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
};

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

// class based components (useful when want to define some states & other properties)
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option); // this is calling function from props
    if (!error) {
      e.target.elements.option.value = '';
    }
    this.setState(() => ({ error }));
  }

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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
