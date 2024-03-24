import Grid from '@mui/material/Grid';
import CurrentExerciseForm from 'app/pages/exam/components/CurrentExerciseForm';
import CreateExamButton from 'app/pages/exam/components/CreateExamButton';
import Exercises from 'app/pages/exam/components/Exercises';
import ExamForm from 'app/pages/exam/components/ExamForm';
import PreviewExercise from 'app/pages/exam/components/PreviewExercise';

import './create.scss';

export default function Create() {
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
						<PreviewExercise />
					</div>
					<div></div>
					<Exercises />
				</Grid>
			</Grid>
		</div>
	);
}
