import { UserEmailUpdater } from "@/modules/users/application/update-email/UserEmailUpdater";
import { User } from "@/modules/users/domain/User";
import { UserDoesNotExistError } from "@/modules/users/domain/UserDoesNotExistError";

import { MockUserRepository } from "../../infrastructure/MockUserRepository";

describe("UserEmailUpdater", () => {
	const repository = new MockUserRepository();
	const userEmailUpdater = new UserEmailUpdater(repository);

	it("should update user email when user exists", async () => {
		const id = "123";
		const oldEmail = "old@example.com";
		const newEmail = "new@example.com";
		const existingUser = new User(id, oldEmail);
		const updatedUser = new User(id, newEmail);

		repository.shouldSearch(existingUser);
		repository.shouldSave(updatedUser);

		await userEmailUpdater.updateEmail(id, newEmail);
	});

	it("should throw UserDoesNotExistError when user does not exist", async () => {
		const id = "non-existent";
		const newEmail = "new@example.com";

		repository.shouldSearchAndReturnNull(id);

		await expect(
			userEmailUpdater.updateEmail(id, newEmail),
		).rejects.toThrow(UserDoesNotExistError);
	});
});
