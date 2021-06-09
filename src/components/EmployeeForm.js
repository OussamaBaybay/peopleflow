import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";

const EmployeeForm = ({ defaultValues, onFormSubmit, isLoading }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	const onSubmit = (data) => {
		onFormSubmit(data);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group controlId="full-name">
				<Form.Label>Full Name</Form.Label>
				<Form.Control
					{...register("fullName", {
						required: "this field is required",
					})}
					type="text"
					placeholder="Enter name"
					name="fullName"
				/>
				{errors.fullName && (
					<Form.Text className="text-danger">
						{errors.fullName.message}
					</Form.Text>
				)}
			</Form.Group>
			<Form.Group controlId="email">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					{...register("email", {
						required: "this field is required",
						pattern: {
							value:
								/^([0-9]{9})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/,
							message: "Invalid email address",
						},
					})}
					type="email"
					placeholder="Enter email"
				/>
				{errors.email && (
					<Form.Text className="text-danger">{errors.email.message}</Form.Text>
				)}
			</Form.Group>
			<Form.Group controlId="phone">
				<Form.Label>Phone</Form.Label>
				<Form.Control
					{...register("phone", {
						required: "this field is required",
						pattern: {
							value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
							message: "Invalid phone",
						},
					})}
					type="phone"
					placeholder="Enter phone"
				/>
				{errors.phone && (
					<Form.Text className="text-danger">{errors.phone.message}</Form.Text>
				)}
			</Form.Group>
			<Form.Group controlId="company">
				<Form.Label>Company</Form.Label>
				<Form.Control
					{...register("companyName", { required: "this field is required" })}
					type="text"
					placeholder="Enter company name"
				/>
				{errors.companyName && (
					<Form.Text className="text-danger">
						{errors.companyName.message}
					</Form.Text>
				)}
			</Form.Group>

			<Form.Group controlId="status">
				<Form.Label>Status</Form.Label>
				<Form.Control
					{...register("status")}
					as="select"
					defaultValue="Choose..."
				>
					<option value="ADDED">ADDED</option>
					<option value="INCHECK">INCHECK</option>
					<option value="APPROVED">APPROVED</option>
					<option value="ACTIVE">ACTIVE</option>
					<option value="INACTIVE">INACTIVE</option>
				</Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={isLoading}>
				{isLoading ? (
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
					"Submit"
				)}
			</Button>
		</Form>
	);
};

export default EmployeeForm;
