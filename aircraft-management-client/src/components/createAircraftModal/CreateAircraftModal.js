import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import useInput from '../../hooks/use-input';
import Input from '../Form/Input';
import Select from '../Form/Select';

export const GET_ROLES = gql`
    query Roles {
        roles {
            id,
            name
        }
    }
`;

export const CREATE_AIRCRAFT = gql`
    mutation CreateAircraft ($aircraft: aircraftInput) {
        createAircraft(aircraft: $aircraft) {
            id
            manufacturer
            model
            image
            roleId
            role {
                name
            }
        }
    }
`;

const CreateAircraftModal = ({
    open,
    handleModal,
    onCreateAircraft
}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { data } = useQuery(GET_ROLES);

    const [createAircraft, { error }] = useMutation(CREATE_AIRCRAFT, { errorPolicy: 'all' });

    const validateInput = (value) => typeof (value) === 'string' ?
        value.trim() !== ""
        : value > 0;

    const {
        value: enteredManufacturer,
        isValid: enteredManufacturerIsValid,
        hasError: manufacturerInputHasError,
        valueChangeHandler: manufacturerChangedHandler,
        inputBlurHandler: manufacturerBlurHandler,
        reset: resetManufacturerInput
    } = useInput(validateInput);

    const {
        value: enteredModel,
        isValid: enteredModelIsValid,
        hasError: modelInputHasError,
        valueChangeHandler: modelChangedHandler,
        inputBlurHandler: modelBlurHandler,
        reset: resetModelInput
    } = useInput(validateInput);

    const {
        value: enteredId,
        isValid: enteredIdIsValid,
        hasError: idInputHasError,
        valueChangeHandler: idChangedHandler,
        inputBlurHandler: idBlurHandler,
        reset: resetIdInput
    } = useInput(validateInput);

    const [role, setRole] = useState(0);

    let formIsValid = false;

    const handleRoleSelect = (event) => {
        setRole(event.target.value);
    };

    if (enteredManufacturerIsValid && enteredIdIsValid && enteredModelIsValid && role > 0) {
        formIsValid = true;
    };

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        if (!enteredManufacturerIsValid || !enteredModelIsValid || !enteredIdIsValid || role <= 0)
            return;

        const data = await createAircraft({
            variables: {
                aircraft: {
                    id: parseInt(enteredId),
                    manufacturer: enteredManufacturer,
                    model: enteredModel,
                    image: "https://localhost:5001/images/f22.jpg",
                    roleId: parseInt(role.toString())
                }
            }
        });

        onCreateAircraft(data.data.createAircraft);

        resetManufacturerInput();
        resetIdInput();
        resetModelInput();
    };

    const resetHandler = () => {
        resetManufacturerInput();
        resetIdInput();
        resetModelInput();
    };

    return (
        <Modal
            open={open}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create Aircraft
                </Typography>
                <form onSubmit={formSubmitHandler}>
                    <div className="row">
                        <div className="col-4">
                            <Input
                                label="ID"
                                type="number"
                                hasError={idInputHasError}
                                handleInputBlur={idBlurHandler}
                                handleInputChange={idChangedHandler}
                                value={enteredId} />
                        </div>
                        <div className="col-8">
                            <Input
                                label="Manufacturer"
                                type="text"
                                hasError={manufacturerInputHasError}
                                handleInputBlur={manufacturerBlurHandler}
                                handleInputChange={manufacturerChangedHandler}
                                value={enteredManufacturer} />
                        </div>
                        <div className="col-6">
                            <Input
                                label="Model"
                                type="text"
                                hasError={modelInputHasError}
                                handleInputBlur={modelBlurHandler}
                                handleInputChange={modelChangedHandler}
                                value={enteredModel} />
                        </div>
                        <div className="col-6 ">
                            {
                                data && <Select label="Role"
                                    defaultOptionLabel="Open to select a role"
                                    items={data.roles}
                                    handleSelect={handleRoleSelect}
                                    size={false}
                                    isValid={role > 0}
                                    defaultSelectedValue={role} />
                            }
                        </div>
                        <div className="col-6">
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginRight: "1rem" }}
                                onClick={resetHandler} >Reset</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!formIsValid}>Submit</Button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default CreateAircraftModal;