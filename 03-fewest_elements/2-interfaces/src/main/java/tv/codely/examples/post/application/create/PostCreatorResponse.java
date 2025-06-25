package tv.codely.examples.post.application.create;

public class PostCreatorResponse {
    private final String postId;
    private final boolean success;

    public PostCreatorResponse(String postId, boolean success) {
        this.postId = postId;
        this.success = success;
    }

    public String getPostId() {
        return postId;
    }

    public boolean isSuccess() {
        return success;
    }
}
