import { User } from "./User";

export interface UserRepository {
	get(id: string): Promise<User | null>;
}
