import * as React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';

import Option from './components/Option';
import AdminOption from 'app/pages/exam/components/Exercise/components/AdminOption';
import { exerciseType, optionType } from 'app/shared/interfaces/exercise';

interface ExerciseProps {
	exercise: exerciseType;
	canSelect: boolean;
	canEdit: boolean;
}

export default function Exercise(props: ExerciseProps) {
	const exercise: exerciseType = props.exercise;
	const canSelect: boolean = props.canSelect;
	const canEdit: boolean = props.canEdit;
	const theme = useTheme();

	return (
		<Box sx={{ width: '100%', mb: 4 }}>
			{Array.from(Array(exercise.question.length), (e, i) => {
				return (
					<Box key={i}>
						<Paper
							elevation={0}
							sx={{ p: 2, background: theme.palette.action.selected }}
						>
							<div
								dangerouslySetInnerHTML={{
									__html: exercise.question[i],
								}}
								className="tiptap"
							></div>
						</Paper>
						<List component="nav" sx={{ pt: 0 }}>
							{exercise.options[i].map((option: optionType) => {
								if (canEdit) {
									return (
										<AdminOption
											key={option.id}
											exercise={exercise}
											option={option}
											canSelect={canSelect}
											canEdit={canEdit}
										/>
									);
								} else {
									return <Option key={option.id} title={option.title} />;
								}
							})}
						</List>
					</Box>
				);
			})}
		</Box>
	);
}
