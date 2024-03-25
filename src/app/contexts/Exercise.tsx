import { createContext } from 'react';
import { contextExercise } from 'app/shared/interfaces/exercise';

export const ExerciseContext = createContext<contextExercise>({
	currentExercise: {},
	setCurrentExercise: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCurrentExercise = {
	id: window.self.crypto.randomUUID(),
	question: ['<p>titulo 1</p>', '<p>titulo 2</p>'],
	correctOptions: [],
	argument: '',
	options: [
		[
			{ id: 1, title: 'hola' },
			{ id: 2, title: 'option 2' },
		],
		[
			{ id: 3, title: 'opt' },
			{ id: 4, title: 'lastoption' },
		],
	],
};
