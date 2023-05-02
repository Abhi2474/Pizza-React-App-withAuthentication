import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../context";

function Me({ accessToken }) {
	const [data, setData] = useState({})
	const { setAuthenticated } = useContext(TokenContext)

	useEffect(() => {
		if(accessToken){
			axios.get('http://localhost:5000/api/productslogin', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
			.then(response => {
				console.log(response.data);
				setData(response.data)
				setAuthenticated(true)
			})
			.catch(error => {
				console.log(error);
			})
		}
		
	}, [accessToken])


	return (
		<>
			<h1>helloo</h1>
			<ul>
				<li>{data.name}</li>
				<li>{data.email}</li>
			</ul>
		</>
	)
}

export default Me