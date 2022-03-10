import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Header from '../components/Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

test("Header should renders", () => {
    const header = shallow(<Header />);

    jest.mock('react-router-dom', () => {
        // const originalModule = jest.requireActual('react-router-dom');

        return {
            // __esModule: true,
            // ...originalModule,
            BrowserRouter: jest.fn(() => { })
        };
    });

    expect(toJson(header)).toMatchSnapshot();
});