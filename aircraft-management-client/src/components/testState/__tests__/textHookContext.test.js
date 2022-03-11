import React from 'react';
import ReactDOM from 'react-dom';
import TestHookContext from '../testHookContext';
import { act, fireEvent, render, cleanup } from '@testing-library/react';
import App from '../../../App';
import Context from '../../../context/context';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test("Context value is updated by child component", () => {
    const { container, getByText } = render(
        <BrowserRouter>
            <App>
                <Context.Provider>
                    <TestHookContext />
                </Context.Provider>
            </App>
        </BrowserRouter>
    );

    expect(getByText(/Some/i).textContent).toBe("Some text");

    fireEvent.click(getByText("Change Text"));

    expect(getByText(/Some/i).textContent).toBe("Some other text");
});