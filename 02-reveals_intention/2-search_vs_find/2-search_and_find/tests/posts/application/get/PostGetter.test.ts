import { PostGetter } from "../../../../src/posts/application/get/PostGetter";
import { Post } from "../../../../src/posts/domain/Post";
import { MockPostRepository } from "../../infrastructure/MockPostRepository";

describe("PostGetter", () => {
	const repository = new MockPostRepository();
	const postGetter = new PostGetter(repository);

	it("should return post when post exists", async () => {
		const postId = "123";
		const post = new Post(postId, "This is a test post body");

		repository.shouldGet(post);

		expect(await postGetter.get(postId)).toBe(post);
	});

	it("should return null when post does not exists", async () => {
		const postId = "123";

		repository.shouldGetAndReturnNull(postId);

		expect(await postGetter.get(postId)).toBeNull();
	});
});
