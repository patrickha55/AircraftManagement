import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import CreateAircraftModal from '../CreateAircraftModal';
import { MockedProvider } from '@apollo/react-testing';
import { GET_AIRCRAFTS } from '../../../pages/aircraft/Aircraft';

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

afterEach(cleanup);

test("Submit button should change from disabled to enabled", () => {
    render(
        <MockedProvider mocks={aircraftMocks} addTypename={false} >
            <CreateAircraftModal />
        </MockedProvider>
    );

    screen.debug();
});