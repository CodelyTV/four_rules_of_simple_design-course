import { NextRequest } from "next/server";

import { POST } from "@/app/api/users/route";
import { User } from "@/modules/users/domain/User";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { InMemoryUserRepository } from "@/modules/users/infrastructure/InMemoryUserRepository";

describe("POST /api/users", () => {
	let repository: UserRepository;

	beforeEach(() => {
		repository = new InMemoryUserRepository();
		InMemoryUserRepository.users.clear();
	});

	it("should create a new user successfully", async () => {
		const userData = { id: "123", email: "test@example.com" };

		const response = await POST(
			new NextRequest("http://localhost:3000/api/users", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: { "Content-Type": "application/json" },
			}),
		);

		expect(response.status).toBe(201);
	});

	it("should return 409 when user already exists", async () => {
		const userData = { id: "123", email: "test@example.com" };
		const existingUser = new User(userData.id, "existing@example.com");

		await repository.save(existingUser);

		const response = await POST(
			new NextRequest("http://localhost:3000/api/users", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: { "Content-Type": "application/json" },
			}),
		);

		expect(response.status).toBe(409);
		expect(await response.json()).toEqual({
			error: `User with id ${userData.id} already exists`,
		});
	});

	it("should return 400 when id is missing", async () => {
		const userData = { email: "test@example.com" };

		const response = await POST(
			new NextRequest("http://localhost:3000/api/users", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: { "Content-Type": "application/json" },
			}),
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			error: "Id and email are required",
		});
	});

	it("should return 400 when email is missing", async () => {
		const userData = { id: "123" };

		const response = await POST(
			new NextRequest("http://localhost:3000/api/users", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: { "Content-Type": "application/json" },
			}),
		);

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			error: "Id and email are required",
		});
	});
});
