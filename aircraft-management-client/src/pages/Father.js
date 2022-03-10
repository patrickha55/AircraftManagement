import React from 'react'
import Child from './Child';

const Father = () => {
    return (
        <div>
            <h1>Father</h1>
            <p>Father component</p>
            <Child />
        </div>
    )
}

export default Father