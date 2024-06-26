import * as React from 'react';
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TipTap from './components/TipTap';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';

import ArgumentGeneral from './components/ArgumentGeneral';

export default function CurrentExerciseForm() {
	const { setCurrentExercise } = useContext(ExerciseContext);
	const [option, setOption] = useState<string>('');

	const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption(e.target.value);
	};

	const addOption = () => {
		if (option === '') return;
		const replacedOption: string = option.replaceAll('\n', '<br>');

		setCurrentExercise((prev: exerciseType) => {
			const optArr = [...prev.options];
			optArr[optArr.length - 1].push({
				id: window.self.crypto.randomUUID(),
				title: replacedOption,
				feedback: '',
			});
			return {
				...prev,
				options: optArr,
			};
		});
		setOption('');
	};

	return (
		<Box sx={{ pl: 1 }}>
			<TipTap />
			<Typography variant="h6" gutterBottom sx={{ ml: 2, mt: 2 }}>
				Añade más de una opción.
			</Typography>
			<TextField
				multiline
				rows={4}
				sx={{ mt: 0, width: '100%' }}
				value={option}
				onChange={handleOption}
			/>
			<Button variant="outlined" sx={{ mt: 3 }} onClick={addOption}>
				Agregar opción
			</Button>
			<Box sx={{ pt: 2 }}>
				<Typography>Argumento</Typography>
				<ArgumentGeneral />
			</Box>
		</Box>
	);
}
