import { UserGetter } from "../../../../src/users/application/get/UserGetter";
import { User } from "../../../../src/users/domain/User";
import { UserDoesNotExistError } from "../../../../src/users/domain/UserDoesNotExistError";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserGetter", () => {
	const repository = new MockUserRepository();
	const userGetter = new UserGetter(repository);

	it("should return user when user exists", async () => {
		const user = new User("123", "test@example.com");

		repository.shouldGet(user);

		const result = await userGetter.get("123");

		expect(result).toBe(user);
	});

	it("should throw UserDoesNotExistError when user does not exist", async () => {
		const id = "non-existent-id";

		repository.shouldGetAndReturnNull(id);

		await expect(userGetter.get(id)).rejects.toThrow(UserDoesNotExistError);
	});
});
