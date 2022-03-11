import React from 'react';
import { ReactDOM } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import Aircraft, { GET_AIRCRAFTS } from '../Aircraft';
import { MockedProvider } from '@apollo/react-testing';
import renderer from 'react-test-renderer';
import waait from 'waait';


afterEach(cleanup);

const aircrafts = [
    { id: 1, manufacturer: "Boeing", model: "A380", image: "A380Image", roleId: 1, role: { id: 1, name: "Wide body aircraft" } },
    { id: 2, manufacturer: "Lockheed Martin", model: "F22", image: "F22Image", roleId: 3, role: { id: 3, name: "Air superiority fighter" } }
];

const aircraftMocks = [
    {
        request: {
            query: GET_AIRCRAFTS,
        },
        result: {
            data: {
                aircraft: aircrafts
            }
        }
    }
];

it("renders without error.", () => {
    render(
        <MockedProvider mocks={aircraftMocks} addTypename={false} >
            <Aircraft />
        </MockedProvider>
    );
});

it('should renders loading state initially', () => {
    //arrange
    const component = renderer.create(
        <MockedProvider mocks={[]}>
            <Aircraft />
        </MockedProvider>,
    );

    const tree = component.toJSON();

    // assert
    expect(tree).toMatchSnapshot();

    expect(tree.children).toContain('Loading...');
});

// it('should renders aircrafts', async () => {
//     //arrange
//     render(
//         <MockedProvider mocks={aircraftMocks} addTypename={false} >
//             <Aircraft />
//         </MockedProvider>
//     );

//     await waait(2000);
//     //act
//     // jest.mock("aircrafts", () => aircrafts);

//     // const h2s = queryAllByText(/Boeing|Lockheed Martin/i);
//     //assert

//     screen.debug();
// });
