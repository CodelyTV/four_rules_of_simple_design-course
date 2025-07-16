import { Post } from "../../../src/posts/domain/Post";
import { PostRepository } from "../../../src/posts/domain/PostRepository";

export class MockPostRepository implements PostRepository {
	private readonly mockSearch = jest.fn();

	async search(id: string): Promise<Post | null> {
		expect(this.mockSearch).toHaveBeenCalledWith(id);

		return this.mockSearch() as Promise<Post | null>;
	}

	shouldSearch(post: Post): void {
		this.mockSearch(post.id);
		this.mockSearch.mockReturnValueOnce(post);
	}

	shouldSearchAndReturnNull(id: string): void {
		this.mockSearch(id);
		this.mockSearch.mockReturnValueOnce(null);
	}
}
