import { User } from "../../../src/users/domain/User";
import { UserRepository } from "../../../src/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
	private readonly mockGet = jest.fn();

	async get(id: string): Promise<User | null> {
		expect(this.mockGet).toHaveBeenCalledWith(id);

		return this.mockGet() as Promise<User | null>;
	}

	shouldGet(user: User): void {
		this.mockGet(user.id);
		this.mockGet.mockReturnValueOnce(user);
	}

	shouldGetAndReturnNull(id: string): void {
		this.mockGet(id);
		this.mockGet.mockReturnValueOnce(null);
	}
}
