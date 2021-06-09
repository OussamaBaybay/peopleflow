import { React, useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as api from "../employeesApi";
import { empStates, ADDED } from "../constants";
import UpdateEmployee from "./UpdateEmployee";

const EmployeesList = () => {
	const [modalShow, setModalShow] = useState(false);
	const [itemContent, setItemContent] = useState(false);
	const [employeeData, setEmployeeData] = useState({});
	const [key, setKey] = useState(ADDED);
	const { data, isLoading, refetch, isError, error } = useQuery(
		["employees", { key }],
		() => api.getEmployeesByStatus(key)
	);

	const handleChange = (key) => {
		setKey(key);
	};
	const handleEmployee = (data) => {
		setModalShow(true);
		setEmployeeData(data);
	};

	useEffect(() => {
		refetch();
	}, [key, refetch]);

	const queryClient = useQueryClient();
	const { mutateAsync, isLoading: isMutation } = useMutation(
		api.removeEmployee
	);

	const remove = async (id) => {
		setItemContent(id);
		await mutateAsync(id);
		queryClient.invalidateQueries(["employees", { key }]);
	};

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Tabs
					id="states-tabs"
					activeKey={key}
					onSelect={(k) => handleChange(k)}
				>
					{empStates.map(({ name }) => (
						<Tab key={name} eventKey={name} title={name}></Tab>
					))}
				</Tabs>
				<Button variant="outline-danger" onClick={() => handleEmployee()}>
					Add
				</Button>
			</div>
			<Table responsive>
				<thead>
					<tr>
						<th>full name</th>
						<th>email</th>
						<th>phone</th>
						<th>company</th>
						<th>status</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				{isLoading ? (
					<tbody>
						<tr>
							<td colSpan="100%">
								<Spinner animation="border" role="status">
									<span className="sr-only">Loading...</span>
								</Spinner>
							</td>
						</tr>
					</tbody>
				) : (
					<tbody>
						{data?.map((employee) => (
							<tr key={employee.id}>
								<td>{employee.fullName}</td>
								<td>{employee.email}</td>
								<td>{employee.phone}</td>
								<td>{employee.companyName}</td>
								<td>
									<Badge
										pill
										variant={
											empStates.find((x) => x.name === employee.status).color
										}
									>
										{employee.status}
									</Badge>
								</td>
								<td>
									<Button
										variant="outline-primary"
										onClick={() => handleEmployee(employee)}
									>
										Edit
									</Button>
								</td>
								<td>
									<Button
										variant="outline-danger"
										onClick={() => remove(employee.id)}
										disabled={(itemContent === employee.id) & isMutation}
									>
										{(itemContent === employee.id) & isMutation ? (
											<>
												<Spinner
													as="span"
													animation="grow"
													size="sm"
													role="status"
													aria-hidden="true"
												/>
												Loading...
											</>
										) : (
											"Remove"
										)}
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
			<UpdateEmployee
				id={employeeData && employeeData.id}
				show={modalShow}
				onHide={() => setModalShow(false)}
				data={employeeData}
				statusList={key}
			/>
		</>
	);
};

export default EmployeesList;
