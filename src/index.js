import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from '../components/Welcome';
import Clock from '../components/Clock';

function Hello(props) {
  return <s>{props.name}</s>;
}

const element = (
  <div>
    <Welcome name="Thomas" />
    <Welcome name="Kook" />
    <Welcome name="Tail" />
    <Hello name="Tail" />
    <Clock/>
    <Clock/>
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
