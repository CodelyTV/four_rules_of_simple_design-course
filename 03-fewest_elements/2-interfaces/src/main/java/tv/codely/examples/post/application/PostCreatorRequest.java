package tv.codely.examples.post.application;

public class PostCreatorRequest {
    private final String id;
    private final String title;
    private final String content;
    private final String authorId;

    public PostCreatorRequest(String id, String title, String content, String authorId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getAuthorId() {
        return authorId;
    }
}