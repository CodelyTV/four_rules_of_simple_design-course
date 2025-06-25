package tv.codely.examples.post.infrastructure;

import tv.codely.examples.post.domain.PostInterface;
import tv.codely.examples.post.domain.PostRepositoryInterface;

import java.util.HashMap;
import java.util.Map;

public class PostRepository implements PostRepositoryInterface {
    private final Map<String, PostInterface> posts = new HashMap<>();

    @Override
    public void save(PostInterface post) {
        posts.put(post.getId(), post);
    }

    @Override
    public PostInterface findById(String id) {
        return posts.get(id);
    }

    @Override
    public void delete(String id) {
        posts.remove(id);
    }
}