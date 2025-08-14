import { User } from "../../domain/User";
import { UserAlreadyExistsError } from "../../domain/UserAlreadyExistsError";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	async register(id: string, email: string): Promise<void> {
		await this.ensureUserDoesNotAlreadyExists(email);

		const user = new User(id, email);

		await this.repository.save(user);
	}

	private async ensureUserDoesNotAlreadyExists(email: string): Promise<void> {
		const existingUser = await this.repository.searchByEmail(email);

		if (existingUser) {
			throw new UserAlreadyExistsError(email);
		}
	}
}
