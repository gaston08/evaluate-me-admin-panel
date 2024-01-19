import { useContext } from 'react';
import Form from './components/Form';
import { ExerciseContext } from 'app/contexts/Exercise';
import { contextExercise } from 'app/shared/interfaces/exercise';
import Exercise from './components/Exercise';
import Exercises from './components/Exercises';
import ExamForm from './components/ExamForm';
import Grid from '@mui/material/Grid';

import './create.scss';

export default function Create() {
	const { currentExercise } = useContext(ExerciseContext) as contextExercise;

	return (
		<div className="tiptapAppCreateExam">
			<Grid container spacing={1}>
				<Grid item xs={12} md={4} lg={4} sx={{ width: '100%' }}>
					<ExamForm />
					<Form />
				</Grid>
				<Grid item xs={12} md={8} lg={8} className="gridRight">
					<div className="previewContainer">
						<Exercise exercise={currentExercise} canSelect={false} />
					</div>
					<div></div>
					<Exercises />
				</Grid>
			</Grid>
		</div>
	);
}
