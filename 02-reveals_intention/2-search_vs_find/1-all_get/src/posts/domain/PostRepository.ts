import { Post } from "./Post";

export interface PostRepository {
	get(id: string): Promise<Post | null>;
}