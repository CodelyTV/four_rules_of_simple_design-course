/* eslint-disable check-file/folder-naming-convention */
import { NextRequest, NextResponse } from "next/server";

import { UserFinder } from "@/modules/users/application/find/UserFinder";
import { UserDoesNotExistError } from "@/modules/users/domain/UserDoesNotExistError";
import { InMemoryUserRepository } from "@/modules/users/infrastructure/persistence/InMemoryUserRepository";

const userRepository = new InMemoryUserRepository();
const userFinder = new UserFinder(userRepository);

export async function GET(
	_request: NextRequest,
	{ params }: { params: { user_id: string } },
): Promise<NextResponse> {
	const id = params.user_id;

	try {
		const user = await userFinder.find(id);

		return NextResponse.json({ user });
	} catch (error) {
		if (error instanceof UserDoesNotExistError) {
			return NextResponse.json({ error: error.message }, { status: 404 });
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
