import { User } from "../../domain/User";
import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserRepository } from "../../domain/UserRepository";

export class UserEmailUpdater {
	constructor(private readonly repository: UserRepository) {}

	async updateEmail(id: string, newEmail: string): Promise<void> {
		await this.ensureUserExists(id);

		const updatedUser = new User(id, newEmail);

		await this.repository.save(updatedUser);
	}

	private async ensureUserExists(id: string): Promise<void> {
		const user = await this.repository.search(id);

		if (user === null) {
			throw new UserDoesNotExistError(id);
		}
	}
}
