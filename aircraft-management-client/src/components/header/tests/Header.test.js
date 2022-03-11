import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Header from '../Header';

test("Header should renders", () => {
    const header = shallow(<Header />);

    expect(toJson(header)).toMatchSnapshot();
});