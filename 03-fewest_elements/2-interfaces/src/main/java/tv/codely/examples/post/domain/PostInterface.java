package tv.codely.examples.post.domain;

public interface PostInterface {
    String getId();
    String getTitle();
    String getContent();
    String getAuthorId();
    void setTitle(String title);
    void setContent(String content);
    void publish();
    boolean isPublished();
}