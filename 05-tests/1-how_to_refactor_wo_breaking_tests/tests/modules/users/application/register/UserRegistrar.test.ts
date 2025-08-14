import { UserRegistrar } from "@/modules/users/application/register/UserRegistrar";
import { User } from "@/modules/users/domain/User";
import { UserAlreadyExistsError } from "@/modules/users/domain/UserAlreadyExistsError";

import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar", () => {
	const repository = new MockUserRepository();
	const userRegistrar = new UserRegistrar(repository);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should register user successfully when user does not exist", async () => {
		repository.shouldSearchByEmailAndReturn("test@example.com", null);
		repository.shouldSave();

		await userRegistrar.register("123", "test@example.com");

		expect(repository.getSaveMock()).toHaveBeenCalledWith(
			new User("123", "test@example.com"),
		);
	});

	it("should throw UserAlreadyExistsError when user already exists", async () => {
		const existingUser = new User("456", "existing@example.com");

		repository.shouldSearchByEmailAndReturn(
			existingUser.email,
			existingUser,
		);

		await expect(
			userRegistrar.register("789", existingUser.email),
		).rejects.toThrow(UserAlreadyExistsError);
	});
});
