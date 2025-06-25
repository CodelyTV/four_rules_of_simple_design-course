import { UserGetter } from "../../../../src/users/application/get/UserGetter";
import { User } from "../../../../src/users/domain/User";
import { UserDoesNotExistError } from "../../../../src/users/domain/UserDoesNotExistError";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserGetter", () => {
	let repository: MockUserRepository;
	let userGetter: UserGetter;

	beforeEach(() => {
		repository = new MockUserRepository();
		userGetter = new UserGetter(repository);
	});

	it("should return user when user exists", async () => {
		const user = new User("123", "test@example.com");
		repository.addUser(user);

		const result = await userGetter.get("123");

		expect(result).toBe(user);
	});

	it("should throw UserDoesNotExistError when user does not exist", async () => {
		await expect(userGetter.get("non-existent-id")).rejects.toThrow(
			UserDoesNotExistError,
		);
	});

	it("should throw UserDoesNotExistError with correct message", async () => {
		const id = "non-existent-id";

		await expect(userGetter.get(id)).rejects.toThrow(
			`User with id ${id} does not exist`,
		);
	});
});
