package tv.codely.examples.c_repository;

import java.util.UUID;

public record User(
    UUID id,
    String name,
    String surname,
    String email,
    int age,
    boolean active,
    String country,
    String city
) {}
