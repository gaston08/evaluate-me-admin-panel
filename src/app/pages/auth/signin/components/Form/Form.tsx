import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alert from '@mui/material/Alert';
import { axiosPost } from 'app/utils/axios';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';

export default function Form() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{
				email: 'gaston08pedraza@gmail.com',
				password: 'abcd1234',
			}}
			validate={(values) => {
				const errors = {};

				if (!values.email) {
					errors.email = 'El campo es obligatorio';
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
				) {
					errors.email = 'Dirección de correo electrónico no válida';
				}

				if (!values.password) {
					errors.password = 'El campo es obligatorio';
				} else if (values.password.length < 8) {
					errors.password = 'La contraseña debe poseer al menos 8 caracteres';
				}

				return errors;
			}}
			onSubmit={async (values, obj) => {
				const data = {
					email: values.email,
					password: values.password,
				};

				const result: apiPostResponse = await axiosPost('api/login', data);
				if (result.ok) {
					localStorage.setItem('access_token', result.data.token);
					navigate('/admin/users');
				} else {
					setError(result.error);
					if (result.errors) {
						result.errors.forEach((err: expressError): void => {
							obj
								.setFieldTouched(err.path, true)
								.then(() => {
									obj.setFieldError(err.path, err.msg);
								})
								.catch(console.error);
						});
					}
				}
				obj.setSubmitting(false);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Stack spacing={3}>
						<TextField
							error={errors.email && touched.email}
							helperText={errors.email}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							fullWidth
							label="Correo electrónico"
							name="email"
						/>

						<TextField
							error={errors.password && touched.password}
							helperText={errors.password}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							fullWidth
							label="Contraseña"
							name="password"
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => {
												setShowPassword(!showPassword);
											}}
											edge="end"
										>
											{showPassword ? (
												<FontAwesomeIcon icon={faEye} />
											) : (
												<FontAwesomeIcon icon={faEyeSlash} />
											)}
											{/*<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />*/}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Stack>

					<Stack
						direction="row"
						alignItems="center"
						justifyContent="flex-end"
						sx={{ my: 3 }}
					>
						{error !== '' ? (
							<Grid item xs={12}>
								<Alert severity="error">{error}</Alert>
							</Grid>
						) : null}
					</Stack>

					<LoadingButton
						fullWidth
						size="large"
						type="submit"
						variant="contained"
						color="inherit"
					>
						Login
					</LoadingButton>
				</Box>
			)}
		</Formik>
	);
}
