package tv.codely.examples.post.domain;

public interface PostFactoryInterface {
    PostInterface create(String id, String title, String content);
}