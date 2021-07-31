import React from 'react';
import {shallow} from 'enzyme';
import LoadingView from './LoadingView';

describe('Test LoadingView', () => {
  it('can test LoadingView with text', () => {
    const wrapper = shallow(<LoadingView text="loading" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('can test LoadingView without text', () => {
    const wrapper = shallow(<LoadingView />);
    expect(wrapper).toMatchSnapshot();
  });
});
