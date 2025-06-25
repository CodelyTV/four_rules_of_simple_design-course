package tv.codely.examples.post.domain;

public class Post implements PostInterface {
    private final String id;
    private String title;
    private String content;
    private final String authorId;
    private boolean published;

    public Post(String id, String title, String content, String authorId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.published = false;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getContent() {
        return content;
    }

    @Override
    public String getAuthorId() {
        return authorId;
    }

    @Override
    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public void publish() {
        this.published = true;
    }

    @Override
    public boolean isPublished() {
        return published;
    }
}