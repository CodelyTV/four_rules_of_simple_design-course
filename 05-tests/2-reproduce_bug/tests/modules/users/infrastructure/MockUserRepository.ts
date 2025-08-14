import { User } from "@/modules/users/domain/User";
import { UserRepository } from "@/modules/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSave = jest.fn();

	async save(user: User): Promise<void> {
		expect(this.mockSave).toHaveBeenCalledWith(user);

		return this.mockSave() as Promise<void>;
	}

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

	shouldSave(user: User): void {
		this.mockSave(user);
		this.mockSave.mockReturnValueOnce(Promise.resolve());
	}
}
