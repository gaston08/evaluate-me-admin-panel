import { useContext } from 'react';
import Exercise from '../Exercise';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';
import Box from '@mui/material/Box';

export default function Exam() {
	const { exam } = useContext<contextExam>(ExamContext);

	return (
		<>
			{exam.exercises.map((exercise) => {
				return (
					<Box sx={{ border: '1px solid red' }}>
						<Box>{exercise.id}</Box>
						<Exercise key={exercise.id} exercise={exercise} canSelect={true} />
					</Box>
				);
			})}
		</>
	);
}
