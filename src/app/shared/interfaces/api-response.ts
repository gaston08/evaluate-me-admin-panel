import { examType } from './exam';

export interface expressError {
	type: string;
	msg: string;
	path: string;
	location: string;
}

export interface apiPostResponse {
	ok: boolean;
	data: {
		token?: string;
	};
	error: string | null;
	errors: Array<expressError> | null;
}

export interface apiGetResponse {
	ok: boolean;
	data: object;
	error: string | null;
	errors: Array<expressError> | null;
}

export interface apiGetAllSubjects extends apiGetResponse {
	data: {
		exams: Array<examType>;
	};
}

export interface apiGetAllUsersResponse extends apiGetResponse {
	data: {
		users: Array<{
			_id: string;
			email: string;
			firstName: string;
			lastName: string;
			role: string;
		}>;
	};
}

export interface apiGetExamResponse extends apiGetResponse {
	data: {
		exam: examType;
	};
}
