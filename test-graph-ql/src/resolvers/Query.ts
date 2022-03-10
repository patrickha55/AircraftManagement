const Query = {
    aircrafts: async (_: any, __: any, { aircraftApi }: any) => {
        try {
            const response = await aircraftApi.getAircraftsAsync();

            return response.data;
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
    aircraft: async (_: any, { id }: any, { aircraftApi }: any) => {
        try {
            const response = await aircraftApi.getAircraftAsync(id);

            return response.data;
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

    roles: async (_: any, __: any, { roleApi }: any) => {
        try {
            const response = await roleApi.getRolesAsync();

            return response.data;
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
    role: async (_: any, { id }: any, { roleApi }: any) => {
        try {
            const response = await roleApi.getRoleAsync(id);

            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error);
            }
        }
    }
};

export default Query;