import { cleanup, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import CreateAircraftModal from '../CreateAircraftModal';
import { MockedProvider } from '@apollo/react-testing';
import { GET_ROLES, CREATE_AIRCRAFT } from '../CreateAircraftModal';
import wait from 'waait';

afterEach(cleanup);

const roles = [
    { id: 1, name: "Wide body aircraft" },
    { id: 2, name: "Air superiority fighter" }
];

const mocks = [
    {
        request: {
            query: GET_ROLES
        },
        result: {
            data: {
                roles: roles
            }
        }
    },
    {
        request: {
            query: CREATE_AIRCRAFT,
            variables: {
                aircraft: {
                    id: 2,
                    manufacturer: "Boeing",
                    model: "747",
                    image: "Boeing-image",
                    roleId: 1,
                }
            }
        },
        result: {
            data: {
                aircraft: {
                    id: 2,
                    manufacturer: "Boeing",
                    model: "747",
                    roleId: 1,
                    role: {
                        id: 1,
                        name: "Wide body aircraft"
                    }
                }
            }
        }
    }
];

const handleModal = jest.fn();
const createAircraftHandler = jest.fn();

test("component should renders", () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <CreateAircraftModal open={true} handleModal={handleModal} onCreateAircraft={createAircraftHandler} />
        </MockedProvider>);
});

describe('the first time form is loaded', () => {
    test("submit button should be disabled", () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateAircraftModal open={true} handleModal={handleModal} onCreateAircraft={createAircraftHandler} />
            </MockedProvider>);

        const button = getByText(/submit/i);

        expect(button.className).toMatch(/disabled/i);
    });

    test("input fields should be empty", async () => {
        const { getAllByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CreateAircraftModal open={true} handleModal={handleModal} onCreateAircraft={createAircraftHandler} />
            </MockedProvider>);

        // await waitForElementToBeRemoved(() => { });

        await wait(0);

        const inputs = getAllByLabelText(/id|manufacturer|model|role/i);

        for (const input of inputs) {
            if (input.id !== 'Role') {
                expect(input.textContent).toEqual("");
            } else {
                expect(input.className).toMatch(/form-select/i);
                const selectValues = input.textContent.split(' ');

                expect(selectValues[0]).toMatch(/open/i);
            }
        }
    });
})

