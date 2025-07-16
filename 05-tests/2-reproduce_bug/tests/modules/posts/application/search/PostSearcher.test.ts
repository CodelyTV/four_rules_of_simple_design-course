import { MockPostRepository } from "../../infrastructure/MockPostRepository";
import {PostSearcher} from "@/modules/posts/application/search/PostSearcher";
import {Post} from "@/modules/posts/domain/Post";

describe("PostSearcher", () => {
	const repository = new MockPostRepository();
	const postSearcher = new PostSearcher(repository);

	it("should return post when post exists", async () => {
		const postId = "123";
		const post = new Post(postId, "This is a test post body");

		repository.shouldSearch(post);

		expect(await postSearcher.search(postId)).toBe(post);
	});

	it("should return null when post does not exists", async () => {
		const postId = "123";

		repository.shouldSearchAndReturnNull(postId);

		expect(await postSearcher.search(postId)).toBeNull();
	});
});
