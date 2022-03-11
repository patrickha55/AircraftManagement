import { MockedProvider } from '@apollo/react-testing';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import Aircraft, { GET_AIRCRAFTS } from '../Aircraft';

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
                aircrafts: aircrafts
            },
            loading: false,
            error: undefined
        }
    }
];

// it("renders without error.", () => {
//     render(
//         <MockedProvider mocks={aircraftMocks} addTypename={false} >
//             <Aircraft />
//         </MockedProvider>
//     );
// });

// it('should renders loading state initially', () => {
//     //arrange
//     const component = renderer.create(
//         <MockedProvider mocks={[]}>
//             <Aircraft />
//         </MockedProvider>,
//     );

//     const tree = component.toJSON();

//     // assert
//     expect(tree).toMatchSnapshot();

//     expect(tree.children).toContain('Loading...');
// });

it('should renders aircrafts', async () => {
    const component = renderer.create(<MockedProvider mocks={aircraftMocks} addTypename={false} >
        <Aircraft />
    </MockedProvider>);

    const tree = component.toJSON();

    await new Promise(resolve => setTimeout(resolve, 4000));

    expect(tree).toMatchSnapshot();
});
