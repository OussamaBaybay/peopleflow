import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3001/",
});

export const getEmployees = () => api.get("/employees").then((res) => res.data);

export const getEmployee = (id) =>
	api.get(`/employees/${id}`).then((res) => res.data);
export const getEmployeesByStatus = (status) =>
	api.get(`/employees?status=${status}`).then((res) => res.data);

export const updateEmployee = ({ id, ...updatedEmployee }) =>
	api.patch(`/employees/${id}`, updatedEmployee).then((res) => res.data);

export const newEmployee = ({ ...newEmployee }) =>
	api.post(`/employees/`, newEmployee).then((res) => res.data);

export const removeEmployee = (id) =>
	api.delete(`/employees/${id}`).then((res) => res.data);
