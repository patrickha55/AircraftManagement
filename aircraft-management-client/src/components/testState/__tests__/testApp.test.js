import React from 'react';
import { ReactDOM } from 'react';
import TestHook from '../testHook';
import TestApp from '../testApp';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

/**
 * @jest-environment js-dom
 */
it("Text in state is changed when button is clicked", () => {
    const { getByText } = render(<TestHook />);

    expect(getByText(/Initial/i).textContent).toBe('Initial State');

    fireEvent.click(getByText("State Change Button"));

    expect(getByText(/Initial/i).textContent).toBe('Initial State Changed');
});

/**
 * @jest-environment js-dom
 */
it('button click changes props', () => {
    const { getByText } = render(<TestApp>
        <TestHook />
    </TestApp>);

    expect(getByText(/Moe/i).textContent).toBe("Moe");

    fireEvent.click(getByText("Change Name"));

    expect(getByText(/Steve/i).textContent).toBe("Steve");
});