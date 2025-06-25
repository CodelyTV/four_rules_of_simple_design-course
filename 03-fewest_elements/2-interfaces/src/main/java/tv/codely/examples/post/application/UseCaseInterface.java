package tv.codely.examples.post.application;

public interface UseCaseInterface<T, R> {
    R execute(T request);
}