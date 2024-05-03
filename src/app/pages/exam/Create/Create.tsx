import { useEffect, useContext } from 'react';
import { ExercisesContext } from 'app/contexts/Exercises';
import { ExerciseContext } from 'app/contexts/Exercise';
import Grid from '@mui/material/Grid';
import CurrentExerciseForm from 'app/pages/exam/components/CurrentExerciseForm';
import CreateExamButton from 'app/pages/exam/components/CreateExamButton';
import Exercises from 'app/pages/exam/components/Exercises';
import ExamForm from 'app/pages/exam/components/ExamForm';
import LoadExercisesJs from 'app/pages/exam/components/LoadExercisesJs';
import PreviewExercise from 'app/pages/exam/components/PreviewExercise';
import { contextExercises } from 'app/shared/interfaces/exercise';

import '../exam-form.scss';

export default function Create() {
	const { exercises } = useContext<contextExercises>(ExercisesContext);
	const { setCurrentExercise } = useContext(ExerciseContext);

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
				argument: '',
				pts: exercises[0].points as string,
			});
		}
	}, [exercises]);

	return (
		<div className="tiptapAppCreateExam">
			<Grid container spacing={1}>
				<Grid item xs={12} md={4} lg={4}>
					<LoadExercisesJs />
					<ExamForm />
					<CurrentExerciseForm />
					<CreateExamButton />
				</Grid>
				<Grid item xs={12} md={8} lg={8} className="gridRight">
					<div className="previewContainer">
						<PreviewExercise />
					</div>
					<div></div>
					<Exercises />
				</Grid>
			</Grid>
		</div>
	);
}
