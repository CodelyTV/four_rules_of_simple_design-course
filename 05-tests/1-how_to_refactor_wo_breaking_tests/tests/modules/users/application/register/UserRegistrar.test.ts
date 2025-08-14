import { UserRegistrar } from "@/modules/users/application/register/UserRegistrar";
import { User } from "@/modules/users/domain/User";
import { UserAlreadyExistsError } from "@/modules/users/domain/UserAlreadyExistsError";

import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar", () => {
	const repository = new MockUserRepository();
	const userRegistrar = new UserRegistrar(repository);

	it("should register user successfully when user does not exist", async () => {
		const user = new User("123", "test@example.com");

		repository.shouldSearchByEmailAndReturn(user.email, null);
		repository.shouldSave(user);

		await userRegistrar.register(user.id, user.email);
	});

	it("should throw UserAlreadyExistsError when user already exists", async () => {
		const newUserId = "789";
		const existingUser = new User("456", "existing@example.com");

		repository.shouldSearchByEmailAndReturn(
			existingUser.email,
			existingUser,
		);

		await expect(
			userRegistrar.register(newUserId, existingUser.email),
		).rejects.toThrow(UserAlreadyExistsError);
	});
});
