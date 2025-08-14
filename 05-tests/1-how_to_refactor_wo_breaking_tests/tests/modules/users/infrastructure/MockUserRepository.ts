import { User } from "@/modules/users/domain/User";
import { UserRepository } from "@/modules/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSearchByEmail = jest.fn();
	private readonly mockSave = jest.fn();

	async save(user: User): Promise<void> {
		this.mockSave(user);
		return Promise.resolve();
	}

	async search(id: string): Promise<User | null> {
		expect(this.mockSearch).toHaveBeenCalledWith(id);

		return this.mockSearch() as Promise<User | null>;
	}

	async searchByEmail(email: string): Promise<User | null> {
		return this.mockSearchByEmail(email) as Promise<User | null>;
	}

	shouldSearch(user: User): void {
		this.mockSearch(user.id);
		this.mockSearch.mockReturnValueOnce(user);
	}

	shouldSearchAndReturnNull(id: string): void {
		this.mockSearch(id);
		this.mockSearch.mockReturnValueOnce(null);
	}

	shouldSearchByEmailAndReturn(email: string, user: User | null): void {
		this.mockSearchByEmail.mockReturnValueOnce(user);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(Promise.resolve());
	}

	getSaveMock(): jest.Mock {
		return this.mockSave;
	}

	getSearchByEmailMock(): jest.Mock {
		return this.mockSearchByEmail;
	}
}
