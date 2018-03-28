import React from 'react';
import { shallow } from 'enzyme';
import { AXDatagrid } from '../index';

describe('datagrid empty', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(<AXDatagrid columns={[]} data={[]} options={{}} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
