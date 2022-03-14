import { gql, useMutation, useQuery } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateAircraftModal from '../../components/createAircraftModal/CreateAircraftModal';
import React from 'react';

export const GET_AIRCRAFTS = gql`
    query Aircrafts{
        aircrafts {
            id
            manufacturer
            model
            image
            role {
                name
            }
        }
    }
`;

export const DELETE_AIRCRAFT = gql`
    mutation ($id: Int!) {
        deleteAircraft (id: $id)
    }
`;

const Aircraft = () => {
    const [aircrafts, setAircrafts] = useState([]);

    const { data, error, loading: loadingAircraft } = useQuery(GET_AIRCRAFTS);
    const [deleteAircraft, {
        loading,
        error: mutationError
    }
    ] = useMutation(DELETE_AIRCRAFT);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setAircrafts(data.aircrafts);
        }
    }, [data]);


    const handleModal = () => setOpen(prev => !prev);

    const createAircraftHandler = (aircraft) => {

        setAircrafts([...aircrafts, aircraft]);

    };

    const deleteHandler = async (id) => {
        const result = await deleteAircraft({
            variables: {
                id: id
            }
        });

        if (result.data.deleteAircraft) {
            setAircrafts(aircrafts.filter(p => p.id !== id));
        };
    };

    if (loadingAircraft) return <p>Loading...</p>
    if (error) return <h2 className='alert alert-danger'>{error.message}</h2>

    return (
        <div className='container'>
            <h1 className='text-center my-5'>Aircraft</h1>
            <Button variant="contained" color="primary" onClick={handleModal}>
                Create Aircraft
            </Button>
            <CreateAircraftModal
                open={open}
                handleModal={handleModal}
                onCreateAircraft={createAircraftHandler} />
            {
                aircrafts.map((a) =>
                    <div key={a.id} className="card w-75 mx-auto mt-4 shadow-lg" >
                        <div className="card-body">
                            <img src={a.image} className="card-img-top  border-2 shadow-lg" alt="..."></img>
                            <h2>{a.manufacturer}</h2>
                            <div className='row'>
                                <div className="col-6">
                                    <h5 className="card-text">Model: </h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-text text-secondary">{a.model}</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-text">Role: </h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-text text-secondary">{a.role.name}</h5>
                                </div>
                                <div className="col-6">
                                    Update
                                </div>
                                <div className="col-6">
                                    <IconButton aria-label="delete"
                                        onClick={async () => { await deleteHandler(a.id) }}
                                        disabled={loading && true}
                                    >
                                        <DeleteIcon data-testid={`delete${a.model}`} />
                                    </IconButton>
                                </div>
                                <div className="col-12">
                                    {
                                        mutationError && <small className='text-danger'>Something went wrong. Please try again!</small>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Aircraft;