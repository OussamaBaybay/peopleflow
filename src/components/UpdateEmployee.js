import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../employeesApi";
import EmployeeForm from "./EmployeeForm";

const UpdateEmployee = ({ data, id, show, onHide, statusList }) => {
	const queryClient = useQueryClient();
	const { mutateAsync, isLoading: isMutating } = useMutation(
		api.updateEmployee
	);

	const { mutateAsync: mutateAsyncNewEmp, isLoading: isMutatingNewEmp } =
		useMutation(api.newEmployee);

	const onFormSubmit = async (data) => {
		id
			? await mutateAsync({ id, ...data })
			: await mutateAsyncNewEmp({ ...data });
		onHide();
		queryClient.invalidateQueries(["employees", { key: statusList }]);
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Modal heading
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Centered Modal</h4>
				<EmployeeForm
					defaultValues={data}
					onFormSubmit={onFormSubmit}
					isLoading={id ? isMutating : isMutatingNewEmp}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default UpdateEmployee;
