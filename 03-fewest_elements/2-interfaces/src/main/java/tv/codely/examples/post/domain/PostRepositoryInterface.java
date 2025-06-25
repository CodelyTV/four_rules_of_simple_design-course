package tv.codely.examples.post.domain;

public interface PostRepositoryInterface {
    void save(PostInterface post);
    PostInterface findById(String id);
    void delete(String id);
}