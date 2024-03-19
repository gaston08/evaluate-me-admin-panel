import * as React from 'react';
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TipTap from './components/TipTap';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';

export default function CurrentExerciseForm() {
	const { setCurrentExercise } = useContext(ExerciseContext);
	const [option, setOption] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption(e.target.value);
		console.log(e.target.value);
	};

	const addOption = () => {
		if (option === '') return;
		setCurrentExercise((prev: exerciseType) => {
			const optArr = [...prev.options];
			optArr.push({
				id: window.self.crypto.randomUUID(),
				title: option,
			});
			return {
				...prev,
				options: optArr,
			};
		});
		setOption('');
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
			<Button variant="contained" type="submit" sx={{ mt: 3 }}>
				Crear Ejercicio
			</Button>
		</>
	);
}
