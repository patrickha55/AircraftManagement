import renderer from 'react-test-renderer';
import Basic from '../pages/Basic';
import React from 'react';

test("Basic page should renders with or without name", () => {
    //arrange
    let tree = renderer
        .create(<Basic />)
        .toJSON();

    //assert
    expect(tree).toMatchSnapshot();

    tree = renderer
        .create(<Basic name="Phat" />)
        .toJSON();

    //assert
    expect(tree).toMatchSnapshot();
})