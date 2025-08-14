export class UserAlreadyExistsError extends Error {
	constructor(id: string) {
		super(`User with id ${id} already exists`);
	}
}
