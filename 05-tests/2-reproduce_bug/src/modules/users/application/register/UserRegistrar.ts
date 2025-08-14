import { User } from "../../domain/User";
import { UserAlreadyExistsError } from "../../domain/UserAlreadyExistsError";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	async register(id: string, email: string): Promise<void> {
		await this.ensureUserAlreadyDoesNotExists(id);

		const user = new User(id, email);

		await this.repository.save(user);
	}

	private async ensureUserAlreadyDoesNotExists(id: string): Promise<void> {
		const existingUser = await this.repository.search(id);

		if (existingUser !== null) {
			throw new UserAlreadyExistsError(id);
		}
	}
}
