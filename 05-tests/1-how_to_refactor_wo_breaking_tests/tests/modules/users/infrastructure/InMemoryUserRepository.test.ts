import { User } from "@/modules/users/domain/User";
import { InMemoryUserRepository } from "@/modules/users/infrastructure/InMemoryUserRepository";

describe("InMemoryUserRepository", () => {
	const repository = new InMemoryUserRepository();

	beforeEach(() => {
		InMemoryUserRepository.users.clear();
	});

	it("should save a user", async () => {
		const user = new User("123", "test@example.com");

		await repository.save(user);

		const savedUser = await repository.search("123");
		expect(savedUser).toBe(user);
	});

	it("should return user when found", async () => {
		const user = new User("123", "test@example.com");
		await repository.save(user);

		const result = await repository.search("123");

		expect(result).toBe(user);
	});

	it("should return null when user not found", async () => {
		const result = await repository.search("non-existent");

		expect(result).toBeNull();
	});
});
