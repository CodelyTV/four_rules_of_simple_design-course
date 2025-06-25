package tv.codely.examples.shared.application;

public interface UseCaseInterface<T, R> {
    R execute(T request);
}
