/* eslint-disable check-file/folder-naming-convention */
import { NextRequest } from "next/server";

import { GET, PATCH } from "@/app/api/users/[user_id]/route";
import { User } from "@/modules/users/domain/User";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { InMemoryUserRepository } from "@/modules/users/infrastructure/InMemoryUserRepository";

describe("GET /api/users/[user_id]", () => {
	let repository: UserRepository;

	beforeEach(() => {
		repository = new InMemoryUserRepository();
	});

	it("should return 404 when user does not exist", async () => {
		const userId = "non-existent";

		const response = await GET(
			new NextRequest(`http://localhost:3000/api/users/${userId}`),
			{ params: { user_id: userId } },
		);

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({
			error: `User with id ${userId} does not exist`,
		});
	});

	it("should return a user when found", async () => {
		const userId = "123";
		const expectedUser = new User(userId, "test@example.com");

		await repository.save(expectedUser);

		const response = await GET(
			new NextRequest(`http://localhost:3000/api/users/${userId}`),
			{ params: { user_id: userId } },
		);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ...expectedUser });
	});
});

describe("PATCH /api/users/[user_id]", () => {
	let repository: UserRepository;

	beforeEach(() => {
		repository = new InMemoryUserRepository();
		InMemoryUserRepository.users.clear();
	});

	it("should update user email when user exists", async () => {
		const userId = "123";
		const oldUser = new User(userId, "old@example.com");
		const newEmail = "new@example.com";

		await repository.save(oldUser);

		const response = await PATCH(
			new NextRequest(`http://localhost:3000/api/users/${userId}`, {
				method: "PATCH",
				body: JSON.stringify({ email: newEmail }),
				headers: { "Content-Type": "application/json" },
			}),
			{ params: { user_id: userId } },
		);

		expect(response.status).toBe(200);

		const updatedUser = await repository.search(userId);
		expect(updatedUser?.email).toBe(newEmail);
	});

	it("should return 404 when user does not exist", async () => {
		const userId = "non-existent";
		const newEmail = "new@example.com";

		const response = await PATCH(
			new NextRequest(`http://localhost:3000/api/users/${userId}`, {
				method: "PATCH",
				body: JSON.stringify({ email: newEmail }),
				headers: { "Content-Type": "application/json" },
			}),
			{ params: { user_id: userId } },
		);

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({
			error: `User with id ${userId} does not exist`,
		});
	});

	it("should return 400 when email is missing", async () => {
		const userId = "123";

		const response = await PATCH(
			new NextRequest(`http://localhost:3000/api/users/${userId}`, {
				method: "PATCH",
				body: JSON.stringify({}),
				headers: { "Content-Type": "application/json" },
			}),
			{ params: { user_id: userId } },
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			error: "Email is required",
		});
	});
});
