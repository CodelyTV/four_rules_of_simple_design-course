import { NextRequest } from "next/server";

import { GET } from "@/app/api/users/[user_id]/route";
import { User } from "@/modules/users/domain/User";
import { UserDoesNotExistError } from "@/modules/users/domain/UserDoesNotExistError";

const mockFind = jest.fn();

jest.mock("@/modules/users/application/find/UserFinder", () => ({
	UserFinder: jest.fn().mockImplementation(() => ({
		find: mockFind,
	})),
}));

jest.mock(
	"@/modules/users/infrastructure/persistence/InMemoryUserRepository",
	() => ({
		InMemoryUserRepository: jest.fn().mockImplementation(() => ({})),
	}),
);

describe("GET /api/users/[user_id]", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return a user when found", async () => {
		const userId = "123";
		const expectedUser = new User(userId, "test@example.com");
		const request = new NextRequest(
			`http://localhost:3000/api/users/${userId}`,
		);
		const params = { user_id: userId };

		mockFind.mockResolvedValue(expectedUser);

		const response = await GET(request, { params });
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data).toEqual({ user: expectedUser });
		expect(mockFind).toHaveBeenCalledWith(userId);
	});

	it("should return 404 when user does not exist", async () => {
		const userId = "non-existent";
		const request = new NextRequest(
			`http://localhost:3000/api/users/${userId}`,
		);
		const params = { user_id: userId };

		mockFind.mockRejectedValue(new UserDoesNotExistError(userId));

		const response = await GET(request, { params });
		const data = await response.json();

		expect(response.status).toBe(404);
		expect(data).toEqual({
			error: `User with id ${userId} does not exist`,
		});
		expect(mockFind).toHaveBeenCalledWith(userId);
	});

	it("should return 500 for unexpected errors", async () => {
		const userId = "123";
		const request = new NextRequest(
			`http://localhost:3000/api/users/${userId}`,
		);
		const params = { user_id: userId };

		mockFind.mockRejectedValue(new Error("Unexpected error"));

		const response = await GET(request, { params });
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data).toEqual({ error: "Internal server error" });
		expect(mockFind).toHaveBeenCalledWith(userId);
	});
});
