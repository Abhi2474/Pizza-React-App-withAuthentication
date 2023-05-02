import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from '../context'
import axios from 'axios'

const Navbar = ({ accessToken, refreshLocalToken }) => {

	const [data, setData] = useState({})
	const { cart, setCart, authenticated, setAuthenticated } = useContext(TokenContext)

	useEffect(() => {
		if (accessToken) {
			axios.get('http://localhost:5000/api/me', {
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


	const handleLogout = () => {
		console.log(accessToken);

		axios.post('http://localhost:5000/api/logout', {
			refresh_token: refreshLocalToken
		}, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
			.then(response => {
				localStorage.removeItem('access_token')
				localStorage.removeItem('refresh_token')
				setAuthenticated(false)
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			})

	}

	return (
		<>
			<div className='bg-green-600 flex justify-between mx-auto rounded px-5 py-2 text-white font-bold'>
				<ul className='flex items-center'>
					<li className='mr-3 text-lg hover:underline cursor-pointer'><Link to={'/'}>Home</Link></li>
				</ul>
				{authenticated ?
					<div className='flex items-center'>
						<span className=''>{data.name?.toUpperCase()}</span>
						<button className="authBtn" onClick={handleLogout}>Logout</button>
						<Link to='/cart'>
							<div className='flex items-center justify-between px-2 py-1 bg-red-600 rounded ml-2'>
								<span className='text-white font-bold'>{cart.totalItems ? cart.totalItems : 0}</span>
							</div>
						</Link>
					</div>
					:
					<div>
						<Link to='/login'><button className='authBtn'>Login</button></Link>
						<Link to='/register'><button className='authBtn'>Sign Up</button></Link>
					</div>
				}

			</div>
		</>
	)
}

export default Navbar