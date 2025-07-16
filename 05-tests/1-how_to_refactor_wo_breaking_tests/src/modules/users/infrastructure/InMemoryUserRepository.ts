import { User } from "@/modules/users/domain/User";
import { UserRepository } from "@/modules/users/domain/UserRepository";

export class InMemoryUserRepository implements UserRepository {
	private static readonly users: Map<string, User> = new Map();

	async search(id: string): Promise<User | null> {
		const user = InMemoryUserRepository.users.get(id);

		return user ?? null;
	}

	async save(user: User): Promise<void> {
		InMemoryUserRepository.users.set(user.id, user);
	}
}
