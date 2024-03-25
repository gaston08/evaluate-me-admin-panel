import * as React from 'react';
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TipTap from './components/TipTap';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';

import ArgumentGeneral from './components/ArgumentGeneral';
import GroupButtons from './components/GroupButtons';

export default function CurrentExerciseForm() {
	const { setCurrentExercise } = useContext(ExerciseContext);
	const [option, setOption] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

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
			});
			return {
				...prev,
				options: optArr,
			};
		});
		setOption('');
	};

	const handleClose = () => {
		setOpen(false);
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
			<GroupButtons setError={setError} setOpen={setOpen} />

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
