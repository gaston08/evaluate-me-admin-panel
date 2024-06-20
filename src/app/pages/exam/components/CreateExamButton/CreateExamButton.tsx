import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { ExamContext, defaultCurrentExam } from 'app/contexts/Exam';
import { createExam } from 'app/shared/interfaces/exam';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { axiosPost } from 'app/utils/axios';

export default function CreateExamButton() {
	const { exam, setExam } = React.useContext<createExam>(ExamContext);
	const [open, setOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(false);

	const createExam = async () => {
		if (exam.year === '') {
			setError('El año es obligatorio.');
			setOpen(true);
		} else if (exam.subject === '') {
			setError('Seleccione una materia..');
			setOpen(true);
		} else if (exam.type === '') {
			setError('Seleccione el tipo de exámen.');
			setOpen(true);
		} else if (exam.exam_number === '') {
			setError('Seleccione el tema del exámen.');
			setOpen(true);
		} else if (exam.exercises.length === 0) {
			setError('Debe crear al menos un ejercicio.');
			setOpen(true);
		} else {
			// call api
			setLoading(true);

			const data = { ...exam };

			console.log(data);

			const result: apiPostResponse = await axiosPost('api/exam/create', data);
			if (result.ok) {
				console.log('CREADO CORRECTAMENTE');
				console.log(data);
				setExam(defaultCurrentExam);
				setLoading(false);
			} else {
				setError(result.error);
				setOpen(true);
				if (result.errors) {
					result.errors.forEach((err: expressError): void => {
						setError(err.msg);
						setOpen(true);
					});
				}
				setLoading(false);
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ pl: 1 }}>
			<Button
				disabled={loading}
				variant="contained"
				onClick={() => {
					createExam().then().catch(console.error);
				}}
				sx={{ mt: 3, mb: 2 }}
			>
				Crear Exámen
			</Button>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
			>
				<Alert variant="filled" severity="error">
					{error}
				</Alert>
			</Snackbar>
		</Box>
	);
}
