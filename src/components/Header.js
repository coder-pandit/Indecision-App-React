import React from 'react';

// stateless components (fadster as compared to class)
// better to use these for simple tasks like only want to render something without state changes and other things
const Header = props => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>
      {/* props contains all the attributes passed to the component when it is rendered as object */}
      {props.subTitle && <h2 className="header__subtitle">{props.subTitle}</h2>}
    </div>
  </div>
);

// defaultProps will be used if property is not found in the props object
Header.defaultProps = {
  title: 'Indecision'
};

export default Header;
