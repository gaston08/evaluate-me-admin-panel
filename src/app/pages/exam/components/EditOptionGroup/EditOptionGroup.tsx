import { useContext, useState, ChangeEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {
	faTrash,
	faSquareCheck,
	faComment,
	faCommentSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contextExercise } from 'app/shared/interfaces/exercise';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType, optionType } from 'app/shared/interfaces/exercise';

interface EditOptionGroupProps {
	option: optionType;
}

export default function EditOptionGroup(props: EditOptionGroupProps) {
	const option = props.option;
	const id: string = option.id;
	const { setCurrentExercise }: contextExercise = useContext(ExerciseContext);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [feedback, setFeedback] = useState<string>(option.feedback);

	const deleteOption = () => {
		setCurrentExercise((prev: exerciseType) => {
			const newOptions = prev.options.map((optArr) => {
				return optArr.filter((obj) => {
					return obj.id !== id;
				});
			});
			const newCorrectOptions: Array<string> = prev.correctOptions.map(
				(arr) => {
					return arr.filter((prevOpt) => prevOpt !== id);
				},
			);

			return {
				...prev,
				options: newOptions,
				correctOptions: newCorrectOptions,
			};
		});
	};

	const toggleCorrectOption = () => {
		setCurrentExercise((prev: exerciseType): exerciseType => {
			console.log('A');
			const newCorrectOptions = Array.from(
				{ length: prev.options.length },
				() => [],
			);
			console.log('B');
			for (let i = 0; i < prev.options.length; i++) {
				for (let j = 0; j < prev.options[i].length; j++) {
					if (prev.options[i][j].id === id) {
						if (prev.correctOptions[i]) {
							if (prev.correctOptions[i].includes(id)) {
								newCorrectOptions[i] = newCorrectOptions[i].filter(
									(opt) => opt !== id,
								);
							} else {
								newCorrectOptions[i].push(id);
							}
						} else {
							newCorrectOptions[i].push(id);
						}
					} else if (prev.correctOptions[i]) {
						if (prev.correctOptions[i][j]) {
							newCorrectOptions[i].push(prev.correctOptions[i][j]);
						}
					}
				}
			}

			return {
				...prev,
				correctOptions: newCorrectOptions,
			};
		});
	};

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
		setArgument();
	};

	const setArgument = () => {
		setCurrentExercise((prev: exerciseType) => {
			const newArr = prev.options.map((arrOpt: Array<optionType>) => {
				return arrOpt.map((opt: optionType) => {
					if (opt.id === option.id) {
						return {
							...opt,
							feedback,
						};
					} else {
						return opt;
					}
				});
			});

			return {
				...prev,
				options: newArr,
			};
		});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFeedback(e.target.value);
	};

	return (
		<Box sx={{ width: 220 }}>
			<div>
				<IconButton onClick={handleOpenModal}>
					<FontAwesomeIcon
						icon={option.feedback.length !== 0 ? faComment : faCommentSlash}
					/>
				</IconButton>
				<IconButton onClick={toggleCorrectOption}>
					<FontAwesomeIcon icon={faSquareCheck} id="correctOptionIcon" />
				</IconButton>
				<IconButton onClick={deleteOption}>
					<FontAwesomeIcon icon={faTrash} id="deleteIcon" />
				</IconButton>
			</div>
			<>
				<Dialog onClose={handleClose} open={openModal}>
					<DialogTitle>Añadir feedback.</DialogTitle>
					<Box sx={{ p: 4 }}>
						<TextField
							multiline
							rows={4}
							value={feedback}
							onChange={handleChange}
							sx={{ width: '100%' }}
						/>
					</Box>
				</Dialog>
			</>
		</Box>
	);
}
