import { createContext } from 'react';
import { contextExercise } from 'app/shared/interfaces/exercise';

export const ExerciseContext = createContext<contextExercise>({
	currentExercise: {},
	setCurrentExercise: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCurrentExercise = {
	id: 0,
	question:
		'<p>Escribe tu pregunta aquí. Puedes estilizar este texto con el editor!</p>',
	correctOptions: [0, 1],
	options: [
		{
			id: 0,
			title: 'option 1',
		},
		{
			id: 1,
			title: 'option 2',
		},
		{
			id: 2,
			title: 'option 3',
		},
		{
			id: 3,
			title: 'option 4',
		},
	],
};
