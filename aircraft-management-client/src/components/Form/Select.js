import React, { FormEvent } from 'react'

const Select = ({
    label,
    defaultOptionLabel,
    handleSelect,
    items,
    size,
    isValid }) => {
    return (
        <div className='mb-3'>
            <label className="form-label" htmlFor={label}>{label}</label>
            <select className={`form-select mb-3 fs-6 ${size ? "form-select-sm" : "form-select-lg"} ${!isValid && "border-danger"}`}
                aria-label=".form-select-lg example"
                onChange={handleSelect}
                id={label}
            >
                <option selected>{defaultOptionLabel}</option>
                {
                    items.map((i) => <option key={i.id} value={i.id} >{i.name}</option>)
                }
            </select>
            {!isValid && <small className='text-danger'>Please select a {label}</small>}
        </div>
    )
};

export default Select;