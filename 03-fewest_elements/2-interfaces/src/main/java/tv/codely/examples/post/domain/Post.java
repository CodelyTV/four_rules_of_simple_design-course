package tv.codely.examples.post.domain;

public record Post(
    String id,
    String title,
    String content
) implements PostInterface {
}
