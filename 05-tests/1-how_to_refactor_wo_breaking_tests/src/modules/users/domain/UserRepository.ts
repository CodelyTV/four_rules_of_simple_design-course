import { User } from "./User";

export interface UserRepository {
	save(user: User): Promise<void>;

	search(id: string): Promise<User | null>;

	searchByEmail(email: string): Promise<User | null>;
}
