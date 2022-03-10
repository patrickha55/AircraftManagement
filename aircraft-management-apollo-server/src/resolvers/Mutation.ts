import roleApi from "../api/roleAPI";

const Mutation = {
    createAircraft: async (_: any, { aircraft }: any, { aircraftApi }: any) => {
        try {
            await aircraftApi.createAsync(aircraft);

            return aircraft;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }
        }
    },
    createRole: async (_: any, { role }: any, { roleApi }: any) => {
        try {
            await roleApi.createAsync(role);

            return role;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }
        }
    },

    updateAircraft: async (_: any, { aircraft }: any, { aircraftApi }: any) => {
        try {
            await aircraftApi.editAsync(aircraft.id, aircraft);

            return aircraft;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }

            return null;
        }
    },
    updateRole: async (_: any, { role }: any, { roleApi }: any) => {
        try {
            await roleApi.editAsync(role.id, role);

            return role;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }

            return null;
        }
    },

    deleteAircraft: async (_: any, { id }: any, { aircraftApi }: any) => {
        try {
            await aircraftApi.deleteAsync(id);
            console.log(id);
            return true;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }

            return false;
        }
    },

    deleteRole: async (_: any, { id }: any, { roleApi }: any) => {
        try {
            await roleApi.deleteAsync(id);

            return true;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }

            return false;
        }
    }
};

export default Mutation;