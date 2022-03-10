const Aircraft = {
    role: async ({ roleId }: any, _: any, { roleApi }: any) => {
        try {
            const response = await roleApi.getRoleAsync(roleId);

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

export default Aircraft;