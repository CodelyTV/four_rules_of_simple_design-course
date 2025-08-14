/* eslint-disable */
import {
	UserRegistrar
} from "@/modules/users/application/register/UserRegistrar";
import {User} from "@/modules/users/domain/User";

import {MockUserRepository} from "../../infrastructure/MockUserRepository";
import {
	UserAlreadyExistsError
} from "@/modules/users/domain/UserAlreadyExistsError";

describe("UserRegistrar - FRAGILE TESTS", () => {
	const repository = new MockUserRepository();
	const userRegistrar = new UserRegistrar(repository);
	const ensureUserSpy = jest
		.spyOn(userRegistrar as any, "ensureUserDoesNotAlreadyExists")
		.mockResolvedValue(undefined);

	afterEach(() => {
		ensureUserSpy.mockRestore();
	});

	it("should call ensureUserDoesNotAlreadyExists and save user when registering", async () => {
		repository.shouldSave(new User("123", "test@example.com"));

		await userRegistrar.register("123", "test@example.com");

		expect(ensureUserSpy).toHaveBeenCalledWith("test@example.com");
	});

	it("should not save user when ensureUserDoesNotAlreadyExists throws error", async () => {
		const userEmail = "test@example.com";

		const ensureUserSpy = jest
			.spyOn(userRegistrar as any, "ensureUserDoesNotAlreadyExists")
			.mockRejectedValue(new UserAlreadyExistsError(userEmail));

		await expect(
			userRegistrar.register("123", userEmail)
		).rejects.toThrow(UserAlreadyExistsError);

		expect(ensureUserSpy).toHaveBeenCalledWith(userEmail);
	});
});
