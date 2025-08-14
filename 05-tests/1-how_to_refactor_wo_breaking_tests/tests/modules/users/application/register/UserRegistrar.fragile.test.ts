/* eslint-disable */
import { UserRegistrar } from "@/modules/users/application/register/UserRegistrar";
import { User } from "@/modules/users/domain/User";

import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserRegistrar - FRAGILE TESTS", () => {
	const repository = new MockUserRepository();
	const userRegistrar = new UserRegistrar(repository);

	it("should call ensureUserDoesNotAlreadyExists and save user when registering", async () => {
		const ensureUserSpy = jest
			.spyOn(userRegistrar as any, "ensureUserDoesNotAlreadyExists")
			.mockResolvedValue(undefined);

		repository.shouldSave(new User("123", "test@example.com"));

		await userRegistrar.register("123", "test@example.com");

		expect(ensureUserSpy).toHaveBeenCalledWith("test@example.com");

		ensureUserSpy.mockRestore();
	});
});
