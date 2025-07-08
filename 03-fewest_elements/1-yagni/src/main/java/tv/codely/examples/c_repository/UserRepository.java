package tv.codely.examples.c_repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    Optional<User> searchById(UUID id);

    Optional<User> searchByName(String name);

    Optional<User> searchByEmail(String email);

    List<User> searchByNameAndSurname(String name, String surname);

    List<User> searchByNameOrSurname(String name, String surname);

    List<User> searchByNameContaining(String nameFragment);

    List<User> searchBySurnameContaining(String surnameFragment);

    List<User> searchByEmailContaining(String emailFragment);

    List<User> searchByNameStartingWith(String prefix);

    List<User> searchBySurnameStartingWith(String prefix);

    List<User> searchByNameEndingWith(String suffix);

    List<User> searchBySurnameEndingWith(String suffix);

    List<User> searchByAgeGreaterThan(int age);

    List<User> searchByAgeLessThan(int age);

    List<User> searchByAgeBetween(int minAge, int maxAge);

    List<User> searchByNameAndEmail(String name, String email);

    List<User> searchByNameAndSurnameAndEmail(String name, String surname, String email);

    List<User> searchByNameOrEmail(String name, String email);

    List<User> searchByActiveTrue();

    List<User> searchByActiveFalse();

    List<User> searchByNameAndActiveTrue(String name);

    List<User> searchByNameAndActiveFalse(String name);

    List<User> searchByCountry(String country);

    List<User> searchByCity(String city);

    List<User> searchByCountryAndCity(String country, String city);

    List<User> searchByNameOrderByAgeAsc(String name);

    List<User> searchByNameOrderByAgeDesc(String name);

    List<User> searchBySurnameOrderByNameAsc(String surname);

    List<User> searchBySurnameOrderByNameDesc(String surname);

    List<User> searchAll();

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
