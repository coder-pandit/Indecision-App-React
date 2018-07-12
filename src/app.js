class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState(prevState => {
      return {
        options: prevState.options.concat(option)
      };
    });
  }

  render() {
    const title = 'Indecision';
    const subTitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subTitle={subTitle} />
        {/* whatever is passed as property from here can be used in the class (Header) in this case under this.props as objects */}
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        {/* if a function reference is passed then that function can also be called under this.props inside the class. That call will call the function here do the tasks */}
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {/* this.props contains all the attributes passed to the component when it is rendered as object */}
        <h2>{this.props.subTitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}>
          {/* here this.props.handlePick is a function reference passed as property & used as onCLick property for button here. onClick event on button will call that function. */}
          What should i do
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove all</button>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <li>{this.props.option}</li>;
  }
}

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

    if (error !== 'This option already exists') {
      e.target.elements.option.value = '';
    }

    this.setState(() => {
      return { error };
    });
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
