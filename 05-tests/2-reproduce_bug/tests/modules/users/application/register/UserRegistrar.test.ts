import { UserRegistrar } from "@/modules/users/application/register/UserRegistrar";
import { User } from "@/modules/users/domain/User";
import { UserAlreadyExistsError } from "@/modules/users/domain/UserAlreadyExistsError";

import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar", () => {
	const repository = new MockUserRepository();
	const userRegistrar = new UserRegistrar(repository);

	it("should register a new user when user does not exist", async () => {
		const id = "123";
		const email = "test@example.com";
		const expectedUser = new User(id, email);

		repository.shouldSearchAndReturnNull(id);
		repository.shouldSave(expectedUser);

		await userRegistrar.register(id, email);
	});

	it("should throw UserAlreadyExistsError when user already exists", async () => {
		const id = "123";
		const email = "test@example.com";
		const existingUser = new User(id, "existing@example.com");

		repository.shouldSearch(existingUser);

		await expect(userRegistrar.register(id, email)).rejects.toThrow(
			UserAlreadyExistsError,
		);
	});
});