import { NextRequest, NextResponse } from "next/server";

import { UserRegistrar } from "@/modules/users/application/register/UserRegistrar";
import { UserAlreadyExistsError } from "@/modules/users/domain/UserAlreadyExistsError";
import { InMemoryUserRepository } from "@/modules/users/infrastructure/InMemoryUserRepository";

const userRepository = new InMemoryUserRepository();
const userRegistrar = new UserRegistrar(userRepository);

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json();
		const { id, email } = body;

		if (!id || !email) {
			return NextResponse.json(
				{ error: "Id and email are required" },
				{ status: 400 },
			);
		}

		await userRegistrar.register(id, email);

		return NextResponse.json({}, { status: 201 });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return NextResponse.json({ error: error.message }, { status: 409 });
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
