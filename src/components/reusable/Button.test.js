import React from 'react';
import {shallow} from 'enzyme';
import Button from './Button';

describe('Test Button', () => {
  it('can test Button with title (Enabled)', () => {
    const wrapper = shallow(<Button title="Button" isDisabled={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('can test Button with title (Disabled)', () => {
    const wrapper = shallow(<Button title="Button" isDisabled={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
