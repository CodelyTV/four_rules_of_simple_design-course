import { Post } from "../../../src/posts/domain/Post";
import { PostRepository } from "../../../src/posts/domain/PostRepository";

export class MockPostRepository implements PostRepository {
	private readonly mockGet = jest.fn();

	async get(id: string): Promise<Post | null> {
		expect(this.mockGet).toHaveBeenCalledWith(id);

		return this.mockGet() as Promise<Post | null>;
	}

	shouldGet(post: Post): void {
		this.mockGet(post.id);
		this.mockGet.mockReturnValueOnce(post);
	}

	shouldGetAndReturnNull(id: string): void {
		this.mockGet(id);
		this.mockGet.mockReturnValueOnce(null);
	}
}