const Role = {
    aircrafts: async ({ id }: any, __: any, { aircraftApi }: any) => {
        try {
            const response = await aircraftApi.getAircraftsAsync();

            return response.data.filter((a: { roleId: any; }) => a.roleId === id);
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

export default Role;