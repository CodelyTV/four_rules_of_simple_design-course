package tv.codely.examples.post.application;

import tv.codely.examples.post.domain.PostFactoryInterface;
import tv.codely.examples.post.domain.PostInterface;
import tv.codely.examples.post.domain.PostRepositoryInterface;

public class PostCreator implements PostCreatorInterface {
    private final PostRepositoryInterface repository;
    private final PostFactoryInterface factory;

    public PostCreator(PostRepositoryInterface repository, PostFactoryInterface factory) {
        this.repository = repository;
        this.factory = factory;
    }

    @Override
    public PostCreatorResponse execute(PostCreatorRequest request) {
        PostInterface post = factory.create(
            request.getId(),
            request.getTitle(),
            request.getContent(),
            request.getAuthorId()
        );
        
        repository.save(post);
        
        return new PostCreatorResponse(post.getId(), true);
    }
}