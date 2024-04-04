import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CurrentExerciseForm from 'app/pages/exam/components/CurrentExerciseForm';
import CreateExamButton from 'app/pages/exam/components/CreateExamButton';
import Exercises from 'app/pages/exam/components/Exercises';
import ExamForm from 'app/pages/exam/components/ExamForm';
import PreviewExercise from 'app/pages/exam/components/PreviewExercise';
import { apiGetExamResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import { ExamContext } from 'app/contexts/Exam';
import { createExam } from 'app/shared/interfaces/exam';

import '../exam-form.scss';

export default function Update() {
	const { id } = useParams();
	const { setExam } = useContext<createExam>(ExamContext);

	useEffect(() => {
		async function getExam() {
			const result: apiGetExamResponse = await axiosGet('api/exam/find:' + id);
			if (result.ok) {
				console.log(result.data.exam);
				setExam(result.data.exam);
			} else {
				/*setError(result.error);
				setOpen(true);
				if (result.errors) {
					result.errors.forEach((err: expressError): void => {
						setError(err.msg);
						setOpen(true);
					});
				}*/
			}
		}

		getExam().then().catch(console.error);
	}, []);

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
