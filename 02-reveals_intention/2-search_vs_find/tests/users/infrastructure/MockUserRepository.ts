import { User } from "../../../src/users/domain/User";
import { UserRepository } from "../../../src/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
	private readonly users: Map<string, User> = new Map();

	async get(id: string): Promise<User | null> {
		return this.users.get(id) ?? null;
	}

	addUser(user: User): void {
		this.users.set(user.id, user);
	}
}
