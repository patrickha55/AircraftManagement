import React from 'react'

const Basic = (props) => {
    return (
        <div>
            {
                props.name && <p>Hello {props.name}</p>
            }
            {
                !props.name && <p>Welcome</p>
            }
        </div>
    )
}

export default Basic;