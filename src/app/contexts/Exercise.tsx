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
		'<p>Escribe tu pregunta aquí. Puedes estilizar este texto con el editor!</p>',
	options: [],
};
