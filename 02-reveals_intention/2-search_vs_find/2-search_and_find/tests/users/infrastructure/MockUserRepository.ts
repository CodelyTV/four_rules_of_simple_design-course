import { User } from "../../../src/users/domain/User";
import { UserRepository } from "../../../src/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
	private readonly mockSearch = jest.fn();

	async search(id: string): Promise<User | null> {
		expect(this.mockSearch).toHaveBeenCalledWith(id);

		return this.mockSearch() as Promise<User | null>;
	}

	shouldSearch(user: User): void {
		this.mockSearch(user.id);
		this.mockSearch.mockReturnValueOnce(user);
	}

	shouldSearchAndReturnNull(id: string): void {
		this.mockSearch(id);
		this.mockSearch.mockReturnValueOnce(null);
	}
}
