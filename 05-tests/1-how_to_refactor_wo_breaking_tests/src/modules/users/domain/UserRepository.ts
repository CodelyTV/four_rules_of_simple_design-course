import { User } from "./User";

export interface UserRepository {
	search(id: string): Promise<User | null>;
}
