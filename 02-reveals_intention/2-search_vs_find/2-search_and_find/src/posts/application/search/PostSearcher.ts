import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";

export class PostSearcher {
	constructor(private readonly repository: PostRepository) {}

	async search(id: string): Promise<Post | null> {
		return await this.repository.search(id);
	}
}
