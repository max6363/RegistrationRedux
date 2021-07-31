import React from 'react';
import {shallow} from 'enzyme';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({adapter: new Adapter()});

import TextFieldView from './TextFieldView';

describe('Test TextFieldView', () => {
  it('can test TextFieldView with props', () => {
    const wrapper = shallow(
      <TextFieldView
        label="Label"
        text="Text"
        error={() => {
          return 'error message';
        }}
        onBlur={() => {}}
        onFocus={() => {}}
        onChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('can test TextFieldView with props (error is null)', () => {
    const wrapper = shallow(
      <TextFieldView
        label="Label"
        text="Text"
        error={() => {
          return null;
        }}
        onBlur={() => {}}
        onFocus={() => {}}
        onChangeText={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
