class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    };
  }

  // @Override
  componentDidMount() {
    // get value of count from localStorage (always return string) & parse it to int
    const count = parseInt(localStorage.getItem('count'));
    // if it is parsed successfully i.e. it is a number (isNaN is false) then change state of count
    if (!isNaN(count)) {
      this.setState(() => ({ count }));
    }
  }

  // @Override
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      // if count value is changed then update value of count in localStorage
      localStorage.setItem('count', this.state.count);
    }
  }

  handleAddOne() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  }

  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      };
    });
  }

  handleReset() {
    this.setState(() => {
      return {
        count: 0
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
