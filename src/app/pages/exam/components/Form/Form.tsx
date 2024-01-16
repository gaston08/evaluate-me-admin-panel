import * as React from 'react';
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TipTap from './components/TipTap';
import { ExerciseContext } from 'app/contexts/Exercise';
import { contextExercise, exerciseType } from 'app/shared/interfaces/exercise';

export default function Form() {
	const { setCurrentExercise } = useContext(ExerciseContext) as contextExercise;
	const [option, setOption] = useState<string>('');

	const handleSubmitOption = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption(e.target.value);
	};

	return (
		<Grid item xs={12} md={4} lg={4} sx={{ position: 'fixed', width: '100%' }}>
			<TipTap />
			<Typography variant="h6" gutterBottom sx={{ ml: 2, mt: 2 }}>
				Añade más de una opción.
			</Typography>
			<form action="post" onSubmit={handleSubmitOption}>
				<TextField
					multiline
					rows={4}
					sx={{ mt: 0, width: '100%' }}
					value={option}
					onChange={handleChange}
				/>
				<Button variant="outlined" type="submit" sx={{ mt: 3 }}>
					Agregar opción
				</Button>
			</form>
		</Grid>
	);
}
