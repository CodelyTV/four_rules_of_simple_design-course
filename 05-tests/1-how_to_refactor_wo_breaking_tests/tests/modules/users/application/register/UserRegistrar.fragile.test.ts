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

	it("should call ensureUserDoesNotAlreadyExists and save user when registering", async () => {
		const ensureUserSpy = jest
			.spyOn(userRegistrar as any, "ensureUserDoesNotAlreadyExists")
			.mockResolvedValue(undefined);

		const user = new User("123", "test@example.com");

		repository.shouldSave(user);

		await userRegistrar.register(user.id, user.email);

		expect(ensureUserSpy).toHaveBeenCalledWith(user.email);
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
