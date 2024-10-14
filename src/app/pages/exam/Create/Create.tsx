import { useState, useEffect, useContext } from 'react';
import { ExercisesContext } from 'app/contexts/Exercises';
import { ExerciseContext } from 'app/contexts/Exercise';
import Grid from '@mui/material/Grid';
import CurrentExerciseForm from 'app/pages/exam/components/CurrentExerciseForm';
import GroupButtons from 'app/pages/exam/components/CurrentExerciseForm/components/GroupButtons';
import CreateExamButton from 'app/pages/exam/components/CreateExamButton';
import Exercises from 'app/pages/exam/components/Exercises';
import ExamForm from 'app/pages/exam/components/ExamForm';
import LoadExercisesJs from 'app/pages/exam/components/LoadExercisesJs';
import LoadOptions from 'app/pages/exam/components/LoadOptions';
import PreviewExercise from 'app/pages/exam/components/PreviewExercise';
import { contextExercises } from 'app/shared/interfaces/exercise';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getRandomInt } from 'app/utils/common';

import '../exam-form.scss';

export default function Create() {
	const { exercises } = useContext<contextExercises>(ExercisesContext);
	const { setCurrentExercise } = useContext(ExerciseContext);
	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		if (exercises.length !== 0) {
			const options = exercises[0].options.map((opts) => {
				return opts.map((opt) => {
					return {
						id: window.self.crypto.randomUUID(),
						title: opt,
						feedback: '',
					};
				});
			});

			const question = exercises[0].question.map((q) => {
				return `<p><strong>${q}</strong></p>`;
			});

			setCurrentExercise({
				id: window.self.crypto.randomUUID(),
				question,
				correctOptions: [],
				options,
				argument: [
					{
						feed: 'oficial',
						likes: getRandomInt('likes'),
						dislikes: getRandomInt('dislikes'),
						text: '',
					},
				],
				pts: exercises[0].pts,
				referenceId: '',
			});

			/*setCurrentExercise({
				id: window.self.crypto.randomUUID(),
				argument: exercises[0].argument,
				question: exercises[0].question,
				options: exercises[0].options,
				correctOptions: exercises[0].correctOptions,
				pts: exercises[0].pts,
				referenceId: '',
			});*/
		} else {
			setCurrentExercise({
				id: window.self.crypto.randomUUID(),
				question: ['<p></p>'],
				correctOptions: [],
				options: [[]],
				argument: [
					{
						feed: 'oficial',
						likes: getRandomInt('likes'),
						dislikes: getRandomInt('dislikes'),
						text: '',
					},
				],
				pts: '',
				referenceId: '',
			});
		}
	}, [exercises]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="tiptapAppCreateExam">
			<Grid container spacing={1}>
				<Grid item xs={12} md={4} lg={4}>
					<LoadExercisesJs />
					<LoadOptions />
					<ExamForm />
					<CurrentExerciseForm />
					<CreateExamButton />
				</Grid>
				<Grid item xs={12} md={8} lg={8} className="gridRight">
					<GroupButtons setError={setError} setOpen={setOpen} />
					<div className="previewContainer">
						<PreviewExercise />
					</div>
					<div></div>
					<Exercises />
				</Grid>
			</Grid>
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
		</div>
	);
}
