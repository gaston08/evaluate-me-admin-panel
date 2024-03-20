import { useContext } from 'react';
import CurrentExerciseForm from 'app/pages/exam/components/CurrentExerciseForm';
import CreateExamButton from 'app/pages/exam/components/CreateExamButton';
import { ExerciseContext } from 'app/contexts/Exercise';
import Exercise from 'app/pages/exam/components/Exercise';
import Exercises from 'app/pages/exam/components/Exercises';
import ExamForm from 'app/pages/exam/components/ExamForm';
import Grid from '@mui/material/Grid';

import './create.scss';

export default function Create() {
	const { currentExercise } = useContext(ExerciseContext);

	return (
		<div className="tiptapAppCreateExam">
			<Grid container spacing={1}>
				<Grid item xs={12} md={4} lg={4}>
					<ExamForm />
					<CurrentExerciseForm />
					<CreateExamButton />
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
					<Exercises />
				</Grid>
			</Grid>
		</div>
	);
}
