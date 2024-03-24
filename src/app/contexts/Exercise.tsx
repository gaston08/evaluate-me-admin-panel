import { createContext } from 'react';
import { contextExercise } from 'app/shared/interfaces/exercise';

export const ExerciseContext = createContext<contextExercise>({
	currentExercise: {},
	setCurrentExercise: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCurrentExercise = {
	id: window.self.crypto.randomUUID(),
	question:
		'Escribe tu pregunta aquí. Puedes estilizar este texto con el editor!',
	correctOptions: [],
	argument: '',
	options: [
		{
			id: window.self.crypto.randomUUID(),
			title: 'opcion 1',
		},
		{
			id: window.self.crypto.randomUUID(),
			title: 'opcion 2',
		},
		{
			id: window.self.crypto.randomUUID(),
			title: 'opcion 3',
		},
		{
			id: window.self.crypto.randomUUID(),
			title: 'opcion 4',
		},
	],
};
