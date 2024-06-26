import { createContext } from 'react';
import { contextExam } from 'app/shared/interfaces/exam';

export const ExamContext = createContext<contextExam>({
	exam: {},
	setExam: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCurrentExam = {
	year: '',
	subject: '',
	exercises: [],
	type: '',
	exam_number: '',
	totalPts: 0,
};
