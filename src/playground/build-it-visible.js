let visibility = false;

const visibilityToggle = () => {
  visibility = !visibility;
  render();
};

const appRoot = document.getElementById('app');

const render = () => {
  const template = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={visibilityToggle}>{visibility ? 'Hide details' : 'Show details'}</button>
      {visibility && <p>Hey, these are some details you can now see!</p>}
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
