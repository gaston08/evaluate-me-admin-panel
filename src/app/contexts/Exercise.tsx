import { createContext } from 'react';
import { contextExercise } from 'app/shared/interfaces/exercise';
import { getRandomInt } from 'app/utils/common';

export const ExerciseContext = createContext<contextExercise>({
	currentExercise: {},
	setCurrentExercise: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCurrentExercise = {
	id: window.self.crypto.randomUUID(),
	question: ['<p></p>'],
	correctOptions: [],
	argument: [
		{
			feed: 'oficial',
			likes: getRandomInt('likes'),
			dislikes: getRandomInt('dislikes'),
			text: '',
		},
	],
	pts: '',
	options: [[]],
	argumentId: '',
};
