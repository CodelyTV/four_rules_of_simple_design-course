import { Post } from "./Post";

export interface PostRepository {
	search(id: string): Promise<Post | null>;
}
