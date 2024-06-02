import { ValidationError } from 'express-validator';

type ApiErrorsType = [] | ValidationError[];

export class ApiError extends Error {
	status: number;
	errors?: ApiErrorsType;

	constructor(status: number, message: string, errors?: ApiErrorsType) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static BadRequest(message: string, errors: [] = []) {
		return new ApiError(400, message, errors);
	}

	static UnauthorizedError() {
		return new ApiError(401, 'User is not authorized');
	}

	static ValidationError(errors: ValidationError[]) {
		return new ApiError(400, 'Validation error', errors);
	}

	static Internal(message: string) {
		return new ApiError(500, message);
	}
}