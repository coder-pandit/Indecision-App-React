import React from 'react';

// stateless components (fadster as compared to class)
// better to use these for simple tasks like only want to render something without state changes and other things
const Header = props => (
  <div>
    <h1>{props.title}</h1>
    {/* props contains all the attributes passed to the component when it is rendered as object */}
    {props.subTitle && <h2>{props.subTitle}</h2>}
  </div>
);

// defaultProps will be used if property is not found in the props object
Header.defaultProps = {
  title: 'Indecision'
};

export default Header;
