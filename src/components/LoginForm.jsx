import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TokenContext } from '../context';
import { Link, useNavigate  } from 'react-router-dom';


const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email address').required('Email is required'),
	password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password is required')
});

function LoginForm() {
	const { setAuthenticated } = useContext(TokenContext)
	const navigate = useNavigate()

	const fetchData = (data) => {
		axios.post('http://localhost:5000/api/login', data)
			.then(response => {
				console.log(response.data);
				localStorage.setItem('access_token', response.data.access_token);
				localStorage.setItem('refresh_token', response.data.refresh_token);
				setAuthenticated(true)
				navigate('/')
			}).then()
			.catch(error => {
				console.log(error);
			});
	}

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		console.log(values);
		fetchData(values)
		
		setSubmitting(false)
		resetForm()
	}

	return (
		<>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<h1 className='text-3xl text-center font-bold'>Login Form</h1>

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

						<button className='btn' type="submit" disabled={isSubmitting}>
							Submit
						</button>

						<h1 className='cursor-pointer text-center text-sm my-2 hover:underline hover:text-red-800'>
							<Link to='/'>New User?</Link>
						</h1>

					</Form>
				)}
			</Formik>

		</>
	);
}


export default LoginForm

