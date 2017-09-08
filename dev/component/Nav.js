import React from 'react';
import {NavLink} from 'react-router-dom';

export default () => {

  const style = {}

  return (
    <nav>
      <NavLink exact to="/" className="item" activeClassName="active">홈</NavLink>
      <NavLink to="/grid" className="item" activeClassName="active">Grid Basic</NavLink>
    </nav>
  );
}