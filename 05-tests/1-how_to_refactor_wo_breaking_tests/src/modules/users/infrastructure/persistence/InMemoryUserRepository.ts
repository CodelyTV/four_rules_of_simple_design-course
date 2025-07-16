import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class InMemoryUserRepository implements UserRepository {
	private readonly users: Map<string, User> = new Map();

	async search(id: string): Promise<User | null> {
		const user = this.users.get(id);

		return user ?? null;
	}

	async save(user: User): Promise<void> {
		this.users.set(user.id, user);
	}
}
