'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.state = {
      options: []
    };
    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    return _this;
  }

  // @Override (annotation is not available in js just written for understanding)
  // will be called as soon as component is rendered to screen


  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        // getting data from local storage as soon as component is rendered to screen for first time
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);

        if (options) {
          this.setState(function () {
            return { options: options };
          });
        }
      } catch (e) {
        // Do nothing
      }
    }

    // @Override
    // will be called as soon as component is updated i.e. any state change or prop change

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProp, prevState) {
      // saving data to local storage if there is any change in data
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json); // saving data to localStorage
      }
    }

    // @Override
    // called just before component goes away

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('componentWillUnmount');
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var randomNum = Math.floor(Math.random() * this.state.options.length);
      var option = this.state.options[randomNum];
      alert(option);
    }

    // to remove all items

  }, {
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      }); // for returning object in one line in arrow functions just wrap the object in parentheses.
    }

    // to remove single item

  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          // if filter return false that item will be removed from array
          options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(option) {
      if (!option) {
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }

      this.setState(function (prevState) {
        return { options: prevState.options.concat(option) };
      });
    }

    // @Override

  }, {
    key: 'render',
    value: function render() {
      var subTitle = 'Put your life in the hands of a computer';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subTitle: subTitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePick: this.handlePick
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption
          // want to delete single option so it should passed to Option but we can't pass it to Option directly so we have to pass it to Options first then from Options we will pass it to Option
        }),
        React.createElement(AddOption, { handleAddOption: this.handleAddOption })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

// stateless components (fadster as compared to class)
// better to use these for simple tasks like only want to render something without state changes and other things


var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subTitle && React.createElement(
      'h2',
      null,
      props.subTitle
    )
  );
};

// defaultProps will be used if property is not found in the props object
Header.defaultProps = {
  title: 'Indecision'
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: props.handlePick,
        disabled: !props.hasOptions },
      'What should i do'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.handleDeleteOptions },
      'Remove all'
    ),
    props.options.length === 0 && React.createElement(
      'p',
      null,
      'Please add an option to get started'
    ),
    props.options.map(function (optionText) {
      return React.createElement(Option, {
        key: optionText,
        optionText: optionText,
        handleDeleteOption: props.handleDeleteOption
        // this is to delete single optiom which will be used in Option so we will directly pass it to Option
      });
    })
  );
};

var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'li',
      null,
      props.optionText
    ),
    React.createElement(
      'button',
      {
        onClick: function onClick(e) {
          // if button is clicked call handleDeleteOption with the argument as optionText
          // it will trigger method in Options which will call method in IndecisionApp
          props.handleDeleteOption(props.optionText);
        }
      },
      'Remove'
    )
  );
};

// class based components (useful when want to define some states & other properties)

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'handleAddOption',
    value: function handleAddOption(e) {
      e.preventDefault();
      var option = e.target.elements.option.value.trim();
      var error = this.props.handleAddOption(option); // this is calling function from props
      if (!error) {
        e.target.elements.option.value = '';
      }
      this.setState(function () {
        return { error: error };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            null,
            'Add option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
