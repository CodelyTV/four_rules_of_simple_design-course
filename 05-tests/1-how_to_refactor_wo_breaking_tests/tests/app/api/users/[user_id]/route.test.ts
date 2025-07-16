/* eslint-disable check-file/folder-naming-convention */
import { NextRequest } from "next/server";

import { GET } from "@/app/api/users/[user_id]/route";
import { User } from "@/modules/users/domain/User";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { InMemoryUserRepository } from "@/modules/users/infrastructure/persistence/InMemoryUserRepository";

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
