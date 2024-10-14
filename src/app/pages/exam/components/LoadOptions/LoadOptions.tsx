import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { ExerciseContext } from 'app/contexts/Exercise';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function BasicModal() {
	const [open, setOpen] = useState<boolean>(false);
	const [json, setJson] = useState<string>('');
	const { setCurrentExercise } = useContext(ExerciseContext);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setJson(e.target.value);
	};

	const uploadJSON = () => {
		setCurrentExercise((prev) => {
			return {
				...prev,
				options: [JSON.parse(json)],
			};
		});
		handleClose();
	};

	return (
		<Box sx={{ p: 1 }}>
			<Button onClick={handleOpen} variant="contained">
				Cargar opciones json
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<TextField
						sx={{ width: '100%' }}
						multiline
						rows={18}
						value={json}
						onChange={handleChange}
					/>
					<Button onClick={uploadJSON} variant="contained" sx={{ mt: 2 }}>
						Cargar
					</Button>
				</Box>
			</Modal>
		</Box>
	);
}
