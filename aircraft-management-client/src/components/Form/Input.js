import React, { FormEvent } from 'react'

const Input = ({
    label,
    type,
    handleInputChange,
    handleInputBlur,
    value,
    hasError }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className={`form-control ${hasError && "border-danger"}`}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={value} />
            {
                hasError &&
                <small className='text-danger'>
                    {label} must not be {type === "text" ? "empty" : "smaller than 1"}
                </small>
            }
        </div>
    )
}

export default Input