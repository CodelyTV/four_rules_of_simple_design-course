import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";

export class PostGetter {
	constructor(private readonly repository: PostRepository) {}

	async get(id: string): Promise<Post | null> {
		return await this.repository.get(id);
	}
}
