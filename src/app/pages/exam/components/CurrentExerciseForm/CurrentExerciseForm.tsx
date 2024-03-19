import * as React from 'react';
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TipTap from './components/TipTap';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';
import { ExamContext } from 'app/contexts/Exam';
import { examType, createExam } from 'app/shared/interfaces/exam';

export default function CurrentExerciseForm() {
	const { setExam } = React.useContext<createExam>(ExamContext);
	const { setCurrentExercise, currentExercise } = useContext(ExerciseContext);
	const [option, setOption] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption(e.target.value);
	};

	const addOption = () => {
		if (option === '') return;
		const replacedOption: string = option.replaceAll('\n', '<br>');

		setCurrentExercise((prev: exerciseType) => {
			const optArr = [...prev.options];
			optArr.push({
				id: window.self.crypto.randomUUID(),
				title: replacedOption,
			});
			return {
				...prev,
				options: optArr,
			};
		});
		setOption('');
	};

	const addToExam = () => {
		if (currentExercise.question.length < 10) {
			setError('La consigna es obligatoria.');
			setOpen(true);
		} else if (currentExercise.options.length < 2) {
			setError('Añade al menos dos opciones.');
			setOpen(true);
		} else if (currentExercise.correctOptions.length === 0) {
			setError('Añade al menos una respuesta correcta');
			setOpen(true);
		} else {
			setExam((prev: examType) => {
				return {
					...prev,
					exercises: [...prev.exercises, currentExercise],
				};
			});
			setCurrentExercise({
				id: window.self.crypto.randomUUID(),
				question: '<p></p>',
				correctOptions: [],
				options: [],
			});
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<TipTap />
			<Typography variant="h6" gutterBottom sx={{ ml: 2, mt: 2 }}>
				Añade más de una opción.
			</Typography>
			<TextField
				multiline
				rows={4}
				sx={{ mt: 0, width: '100%' }}
				value={option}
				onChange={handleChange}
			/>
			<Button variant="outlined" sx={{ mt: 3 }} onClick={addOption}>
				Agregar opción
			</Button>
			<Button variant="contained" onClick={addToExam} sx={{ mt: 3 }}>
				Crear Ejercicio
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
		</>
	);
}
