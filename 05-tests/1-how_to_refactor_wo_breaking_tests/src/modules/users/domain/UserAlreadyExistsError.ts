export class UserAlreadyExistsError extends Error {
	constructor(readonly email: string) {
		super(`User with email ${email} already exists`);
	}
}
