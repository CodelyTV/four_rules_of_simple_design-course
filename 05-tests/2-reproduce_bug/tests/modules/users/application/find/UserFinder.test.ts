import { UserFinder } from "@/modules/users/application/find/UserFinder";
import { User } from "@/modules/users/domain/User";
import { UserDoesNotExistError } from "@/modules/users/domain/UserDoesNotExistError";

import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserFinder", () => {
	const repository = new MockUserRepository();
	const userFinder = new UserFinder(repository);

	it("should return user when user exists", async () => {
		const user = new User("123", "test@example.com");

		repository.shouldSearch(user);

		const result = await userFinder.find("123");

		expect(result).toBe(user);
	});

	it("should throw UserDoesNotExistError when user does not exist", async () => {
		const id = "non-existent-id";

		repository.shouldSearchAndReturnNull(id);

		await expect(userFinder.find(id)).rejects.toThrow(
			UserDoesNotExistError,
		);
	});
});
