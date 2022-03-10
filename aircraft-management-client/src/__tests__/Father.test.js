import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import toJson from 'enzyme-to-json';
import React from 'react';
import Father from '../pages/Father';

Enzyme.configure({ adapter: new Adapter() });

test("Father should renders", () => {
    const father = shallow(<Father />);

    expect(toJson(father)).toMatchSnapshot();
});