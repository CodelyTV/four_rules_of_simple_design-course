package tv.codely.examples.post.domain;

public class PostFactory implements PostFactoryInterface {
    @Override
    public PostInterface create(String id, String title, String content, String authorId) {
        return new Post(id, title, content, authorId);
    }
}