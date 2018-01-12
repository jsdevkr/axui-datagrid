import * as React from 'react';
import get from 'lodash-es/get';
import * as Examples from '../example';

const ExampleRoot = (props) => {
  const name = get(props, 'match.params.name');
  const Layout = Examples[name];

  // const layoutName = `${_.startCase(name).replace(/ /g, '')}Layout`
  // const Layout = Examples[layoutName];
  return Layout ? <Layout /> : null;
}

export default ExampleRoot;