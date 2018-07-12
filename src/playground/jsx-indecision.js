// all comments in jsx syntax are for just above line of that comment

console.log('App.js is running');

const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of computer',
  options: []
};

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};

const onRemoveAll = () => {
  app.options = [];
  render();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const appRoot = document.getElementById('app');

// to render on browser screen
const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      {/*if first condition is true it is going to use second condition else it is going to use 1st condition (whcih is false so nothing is going to show on screen)*/}
      <p>
        {app.options && app.options.length > 0
          ? 'Here are your options'
          : 'No options'}
      </p>
      {/* if options doesn't exist or its length is 0 i.e. empty array then it is false so it will render 'No options' else it will render 'Here are your options' */}
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What should I do?
      </button>
      <button onClick={onRemoveAll}>Remove all</button>
      <ol>
        {app.options.map((value, index) => <li id={index}>{value}</li>)}
        {/* map over app.options getting back an array of lis (set key and text). Setting key (can be id also) is must when using array for dom elements */}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
