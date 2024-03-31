import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { axiosPost } from 'app/utils/axios';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';

export default function CreateUserPage() {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [role, setRole] = useState<string>('user');
	const [email, setEmail] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<boolean>>([]);

	const createUser = async (): void => {
		setLoading(true);
		setErrors([]);

		const data = {
			firstName,
			lastName,
			role,
			email,
		};

		const result: apiPostResponse = await axiosPost(
			'api/admin/user/create',
			data,
		);

		if (result.ok) {
			navigate('/admin/users');
			setLoading(false);
		} else {
			const errArr = [];
			if (result.error) {
				errArr.push(result.error);
			}

			if (result.errors) {
				result.errors.forEach((err: expressError): void => {
					errArr.push(err.msg);
				});
			}

			setErrors(errArr);
			setLoading(false);
		}
	};

	return (
		<Grid container justifyContent="center">
			<Grid xs={12} md={6}>
				<Card sx={{ backgroundColor: 'white' }}>
					<CardHeader
						subheader="Asegurate de escribir bien tus datos."
						title="Perfil"
					/>
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							<Grid md={6} xs={12}>
								<FormControl fullWidth required>
									<InputLabel>Nombre</InputLabel>
									<OutlinedInput
										value={firstName}
										label="Nombre"
										name="firstName"
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											setFirstName(e.target.value);
										}}
									/>
								</FormControl>
							</Grid>
							<Grid md={6} xs={12}>
								<FormControl fullWidth required>
									<InputLabel>Apellido</InputLabel>
									<OutlinedInput
										value={lastName}
										label="Apellido"
										name="lastName"
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											setLastName(e.target.value);
										}}
									/>
								</FormControl>
							</Grid>
							<Grid md={6} xs={12}>
								<FormControl fullWidth required>
									<InputLabel>Correo Electrónico</InputLabel>
									<OutlinedInput
										value={email}
										label="Correo Electrónico"
										name="email"
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											setEmail(e.target.value);
										}}
									/>
								</FormControl>
							</Grid>
							<Grid md={6} xs={12}>
								<FormControl fullWidth>
									<InputLabel>Rol</InputLabel>
									<Select
										value={role}
										label="Rol"
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											setRole(e.target.value);
										}}
									>
										<MenuItem value={'user'}>Usuario</MenuItem>
										<MenuItem value={'moderator'}>Moderador</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Box sx={{ mt: 2 }}>
							<>
								{errors.map((error) => {
									return (
										<Box key={error}>
											<Typography color="error">{error}</Typography>
										</Box>
									);
								})}
							</>
						</Box>
					</CardContent>
					<Divider />
					<CardActions sx={{ justifyContent: 'flex-end' }}>
						<Button disabled={loading} variant="contained" onClick={createUser}>
							Crear usuario
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
}
