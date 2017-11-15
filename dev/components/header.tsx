import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

export const Header: React.StatelessComponent<{}> = () => {
  return (
    <div>

      <Button content='Menu' />

      <nav className="navbar navbar-default">
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><NavLink to="/about" className="item" activeClassName="active">About</NavLink></li>
            <li><NavLink to="/members" className="item" activeClassName="active">Members</NavLink></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
