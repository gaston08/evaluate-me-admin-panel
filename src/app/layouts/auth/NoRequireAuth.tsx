import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import axios from 'axios';

export default function RequireAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const checkAuth = async () => {
		const access_token = localStorage.getItem('access_token');
		const access_token_expires_in = localStorage.getItem(
			'access_token_expires_in',
		);
		const expired =
			access_token_expires_in - new Date().getTime() >= 0 ? false : true;

		if (expired) {
			localStorage.removeItem('access_token');
			localStorage.removeItem('access_token_expires_in');
			setIsLoading(false);
			return;
		}

		if (access_token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
			const result = await axiosPost('api/refresh-token', {});
			if (result.ok) {
				const hour = 1000 * 60 * 60;
				localStorage.setItem('access_token', result.data.token);
				localStorage.setItem('access_token_expires_in', hour);
				navigate('/blog/exam');
			} else {
				localStorage.removeItem('access_token');
				localStorage.removeItem('access_token_expires_in');
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
}
