import * as React from 'react';
import { useContext } from 'react';
import { ExerciseContext } from 'app/contexts/Exercise';
import { ExamContext } from 'app/contexts/Exam';
import { examType, createExam } from 'app/shared/interfaces/exam';
import { exerciseType } from 'app/shared/interfaces/exercise';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function GroupButtons({
	setError,
	setOpen,
}: {
	setError: () => void;
	setOpen: () => void;
}) {
	const { setExam } = React.useContext<createExam>(ExamContext);
	const { setCurrentExercise, currentExercise } = useContext(ExerciseContext);
	const addToExam = () => {
		if (
			currentExercise.question[currentExercise.question.length - 1].length < 10
		) {
			setError('La consigna es obligatoria.');
			setOpen(true);
		} else if (
			currentExercise.options[currentExercise.options.length - 1].length < 2
		) {
			setError('Añade al menos dos opciones.');
			setOpen(true);
		} else if (!checkCorrectOptions()) {
			setError('Añade al menos una respuesta correcta para cada ejercicio.');
			setOpen(true);
		} else if (currentExercise.pts === '' || isNaN(currentExercise.pts)) {
			setError('Añade los puntos del ejercicio.');
			setOpen(true);
		} else {
			setExam((prev: examType) => {
				return {
					...prev,
					exercises: [...prev.exercises, currentExercise],
				};
			});
			resetExercise();
		}
	};

	const resetExercise = () => {
		setCurrentExercise({
			id: window.self.crypto.randomUUID(),
			question: ['<p></p>'],
			correctOptions: [],
			options: [[]],
			argument: '',
			pts: '',
		});
	};

	const checkCorrectOptions = (): boolean => {
		let aux: number = 0;
		let hasCorrectOptions: boolean;

		for (let j = 0; j < currentExercise.options.length; j++) {
			hasCorrectOptions = false;
			for (let i = 0; i < currentExercise.options[j].length; i++) {
				hasCorrectOptions = currentExercise.correctOptions.includes(
					currentExercise.options[j][i].id,
				);

				if (hasCorrectOptions) {
					i = currentExercise.options[j].length;
					aux += 1;
				}
			}
		}

		return aux === currentExercise.options.length ? true : false;
	};

	const addExercise = () => {
		if (
			currentExercise.question[currentExercise.question.length - 1].length < 10
		) {
			setError('La consigna es obligatoria.');
			setOpen(true);
		} else if (
			currentExercise.options[currentExercise.options.length - 1].length < 2
		) {
			setError('Añade al menos dos opciones.');
			setOpen(true);
		} else {
			setCurrentExercise((prev) => {
				const newExercise = {
					...prev,
					question: [...prev.question, '<p></p>'],
					options: [...prev.options, []],
				};
				return newExercise;
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentExercise((prev: exerciseType) => {
			return {
				...prev,
				pts: e.target.value,
			};
		});
	};

	return (
		<Box sx={{ mt: 3 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
				<TextField
					sx={{ width: '30%', mr: 2 }}
					value={currentExercise.pts}
					onChange={handleChange}
				/>
				<Typography>Pts</Typography>
			</Box>
			<Button color="secondary" variant="contained" onClick={addToExam}>
				Crear Ejercicio
			</Button>
			<Button
				sx={{ ml: 1 }}
				color="secondary"
				variant="outlined"
				onClick={addExercise}
			>
				Agregar Ejercicio
			</Button>
			<Button
				sx={{ mt: 2 }}
				color="error"
				variant="contained"
				onClick={resetExercise}
			>
				Vaciar Ejercicio
			</Button>
		</Box>
	);
}
