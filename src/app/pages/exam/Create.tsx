import { useContext } from 'react';
import CurrentExerciseForm from './components/CurrentExerciseForm';
import { ExerciseContext } from 'app/contexts/Exercise';
import Exercise from './components/Exercise';
//import Exercises from './components/Exercises';
import ExamForm from './components/ExamForm';
import Grid from '@mui/material/Grid';

import './create.scss';

export default function Create() {
	const { currentExercise } = useContext(ExerciseContext);

	console.log(currentExercise);

	return (
		<div className="tiptapAppCreateExam">
			<Grid container spacing={1}>
				<Grid item xs={12} md={4} lg={4}>
					<ExamForm />
					<CurrentExerciseForm />
				</Grid>
				<Grid item xs={12} md={8} lg={8} className="gridRight">
					<div className="previewContainer">
						<Exercise
							exercise={currentExercise}
							canSelect={false}
							canEdit={true}
						/>
					</div>
					<div></div>
					{/**<Exercises />**/}
				</Grid>
			</Grid>
		</div>
	);
}
