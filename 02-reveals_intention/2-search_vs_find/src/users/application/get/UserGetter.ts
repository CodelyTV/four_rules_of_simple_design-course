import { User } from "../domain/User";
import { UserDoesNotExistError } from "../domain/UserDoesNotExistError";
import { UserRepository } from "../domain/UserRepository";

export class UserGetter {
	constructor(private readonly repository: UserRepository) {}

	async search(id: string): Promise<User> {
		const user = await this.repository.get(id);

		if (user === null) {
			throw new UserDoesNotExistError(id);
		}

		return user;
	}
}
