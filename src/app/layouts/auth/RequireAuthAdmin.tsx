import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosPost } from 'app/utils/axios';
import axios from 'axios';

export default function RequireAuthAdmin() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const checkAuth = async () => {
		const access_token: string = localStorage.getItem('access_token');

		if (!access_token) {
			localStorage.removeItem('access_token');
			navigate('/auth/login');
			return;
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
		const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			localStorage.setItem('access_token', result.data.token);
			setIsLoading(false);
		} else {
			localStorage.removeItem('access_token');
			navigate('/auth/login');
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
	return (
		<>
			<Outlet />
		</>
	);
}
