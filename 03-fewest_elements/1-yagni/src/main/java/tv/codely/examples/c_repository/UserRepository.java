package tv.codely.examples.c_repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    Optional<User> findById(UUID id);

    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);

    List<User> findByNameAndSurname(String name, String surname);

    List<User> findByNameOrSurname(String name, String surname);

    List<User> findByNameContaining(String nameFragment);

    List<User> findBySurnameContaining(String surnameFragment);

    List<User> findByEmailContaining(String emailFragment);

    List<User> findByNameStartingWith(String prefix);

    List<User> findBySurnameStartingWith(String prefix);

    List<User> findByNameEndingWith(String suffix);

    List<User> findBySurnameEndingWith(String suffix);

    List<User> findByAgeGreaterThan(int age);

    List<User> findByAgeLessThan(int age);

    List<User> findByAgeBetween(int minAge, int maxAge);

    List<User> findByNameAndEmail(String name, String email);

    List<User> findByNameAndSurnameAndEmail(String name, String surname, String email);

    List<User> findByNameOrEmail(String name, String email);

    List<User> findByActiveTrue();

    List<User> findByActiveFalse();

    List<User> findByNameAndActiveTrue(String name);

    List<User> findByNameAndActiveFalse(String name);

    List<User> findByCountry(String country);

    List<User> findByCity(String city);

    List<User> findByCountryAndCity(String country, String city);

    List<User> findByNameOrderByAgeAsc(String name);

    List<User> findByNameOrderByAgeDesc(String name);

    List<User> findBySurnameOrderByNameAsc(String surname);

    List<User> findBySurnameOrderByNameDesc(String surname);

    List<User> findAll();

    User save(User user);

    void deleteById(UUID id);

    void deleteByName(String name);

    void deleteAll();

    long count();

    long countByName(String name);

    long countBySurname(String surname);

    boolean existsById(UUID id);

    boolean existsByEmail(String email);

    boolean existsByNameAndSurname(String name, String surname);
}
