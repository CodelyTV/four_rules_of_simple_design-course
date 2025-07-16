export class UserDoesNotExistError extends Error {
	constructor(id: string) {
		super(`User with id ${id} does not exist`);
	}
}
