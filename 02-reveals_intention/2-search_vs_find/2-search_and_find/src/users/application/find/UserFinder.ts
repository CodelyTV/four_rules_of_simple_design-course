import { User } from "../../domain/User";
import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserRepository } from "../../domain/UserRepository";

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	async find(id: string): Promise<User> {
		const user = await this.repository.search(id);

		if (user === null) {
			throw new UserDoesNotExistError(id);
		}

		return user;
	}
}
