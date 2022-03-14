import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/react-testing';
import { cleanup, render, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import Aircraft, { GET_AIRCRAFTS } from '../Aircraft';
import wait from 'waait';

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
                aircrafts
            }
        }
    }
];

const aircraftMockWithGraphQLError = [
    {
        request: {
            query: GET_AIRCRAFTS
        },
        result: {
            data: {
                aircrafts: []
            },
            errors: [new GraphQLError('GraphQL Error!')]
        }
    }
]

const aircraftMockWithNetworkError = [
    {
        request: {
            query: GET_AIRCRAFTS
        },
        result: {
            data: {
                aircrafts: []
            },
            errors: [new Error('An error occurred')]
        }
    }
]

it("renders without error.", () => {
    render(
        <MockedProvider mocks={aircraftMocks} addTypename={false} >
            <Aircraft />
        </MockedProvider>
    );
});

it('should renders loading state initially', () => {
    //arrange
    const { getByText } = render(
        <MockedProvider mocks={[]} addTypename={false}>
            <Aircraft />
        </MockedProvider>,
    );

    expect(getByText(/(loading)[.]+/i).textContent).toContain('Loading...');
});

it('should renders GraphQL error message', async () => {
    const { getByRole, queryByText } = render(
        <MockedProvider mocks={aircraftMockWithGraphQLError} addTypename={false}>
            <Aircraft />
        </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => queryByText(/loading[.]+/i));

    await wait(0);

    const error = getByRole('heading');

    expect(error).not.toBeNull();

    expect(error.className).toMatch(/alert/i);

    expect(error.textContent).toContain('GraphQL Error!');
});

it('should renders a network error message', async () => {
    const { getByRole, queryByText } = render(
        <MockedProvider mocks={aircraftMockWithNetworkError} addTypename={false}>
            <Aircraft />
        </MockedProvider>,
    );

    await waitForElementToBeRemoved(() => queryByText(/loading[.]+/i));

    await wait(0);

    const error = getByRole('heading');

    expect(error).not.toBeNull();

    expect(error.className).toMatch(/alert/i);

    expect(error.textContent).toContain('An error occurred');
});

it('should renders aircrafts', async () => {
    const { findAllByText, queryByText } = render(
        <MockedProvider mocks={aircraftMocks} addTypename={false} >
            <Aircraft />
        </MockedProvider>
    );

    await waitForElementToBeRemoved(() => queryByText(/loading[.]+/i));

    await wait(0);

    const manufacturers = await findAllByText(/boeing|lockheed martin/i);
    const models = await findAllByText(/a380|f22/i);
    const roles = await findAllByText(/wide body|superiority/i);

    expect(manufacturers && models && roles).not.toBeNull();

    for (const manufacturer of manufacturers) {
        expect(manufacturer.textContent).toMatch(/boeing|lockheed martin/i);
    };

    for (const model of models) {
        expect(model.textContent).toMatch(/a380|f22/i);
    };

    for (const role of roles) {
        expect(role.textContent).toMatch(/wide body|superiority/i);
    }
});