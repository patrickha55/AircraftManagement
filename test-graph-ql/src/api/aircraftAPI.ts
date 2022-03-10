import axiosInstance from "./axiosClient";

class AircraftAPI {
    getAircraftsAsync = async () => {
        const url = "/Aircrafts";

        return await axiosInstance.get(url);
    }

    getAircraftAsync = async (id: number) => {
        const url = `/Aircrafts/${id}`;

        return await axiosInstance.get(url);
    }

    createAsync = async (aircraft: any) => {
        const url = '/Aircrafts';

        return await axiosInstance.post(url, aircraft);
    };

    editAsync = async (id: number, aircraft: any) => {
        const url = `/Aircrafts/${id}`;

        return await axiosInstance.put(url, aircraft);
    };

    deleteAsync = async (id: number) => {
        const url = `/Aircrafts/${id}`;

        return await axiosInstance.delete(url);
    };
};

const aircraftApi = new AircraftAPI();

export default aircraftApi;