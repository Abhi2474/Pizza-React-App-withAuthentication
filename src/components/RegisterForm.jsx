import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';


const validationSchema = Yup.object().shape({
	name: Yup.string().required('First name is required'),
	email: Yup.string().email('Invalid email address').required('Email is required'),
	password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
	repeat_password: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm password is required'),
});

function RegisterForm() {

	const fetchData = (data) => {
		axios.post('http://localhost:5000/api/register', data)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		console.log(values);
		// fetchData(values)
		setSubmitting(false)
		resetForm()
	}

	return (
		<>
			<Formik
				initialValues={{ name: '', email: '', password: '', repeat_password: '',  role: 'customer'  }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<h1 className='text-3xl text-center font-bold'>Registration Form</h1>
						<div>
							<label htmlFor="name">Name:</label>
							<Field className='field' type="text" name="name" />
							<ErrorMessage className='errMsg' name="name" component="div" />
						</div>
						<div>
							<label htmlFor="email">Email:</label>
							<Field className='field' type="email" name="email" />
							<ErrorMessage className='errMsg' name="email" component="div" />
						</div>
						<div>
							<label htmlFor="password">Password:</label>
							<Field className='field' type="password" name="password" />
							<ErrorMessage className='errMsg' name="password" component="div" />
						</div>
						<div>
							<label htmlFor="repeat_password">Confirm Password:</label>
							<Field className='field' type="password" name="repeat_password" />
							<ErrorMessage className='errMsg' name="repeat_password" component="div" />
						</div>
						<div>
							<label htmlFor="role">Role</label>
							<Field
								as="select"
								id="role"
								name="role"
								className='field'
							>
								<option value="customer">Customer</option>
								<option value="admin">Admin</option>
							</Field>
							<ErrorMessage name="role" component="div" />
						</div>
						<button className='btn' type="submit" disabled={isSubmitting}>
							Submit
						</button>
						<h1 className='cursor-pointer text-center text-sm my-2 hover:underline hover:text-red-800'>
							<Link to='/login'>Already have an account?</Link>
						</h1>
					</Form>
				)}
			</Formik>
		</>
	);
}


export default RegisterForm