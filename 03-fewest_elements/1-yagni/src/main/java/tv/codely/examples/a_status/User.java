package tv.codely.examples.a_status;

import java.util.UUID;

public record User(UUID id, String name, Status status) {

    public enum Status {
        DEFAULT,
        BANNED
    }

    public boolean isBanned() {
        return status == Status.BANNED;
    }

    public User ban() {
        return new User(id, name, Status.BANNED);
    }

    public User unban() {
        return new User(id, name, Status.DEFAULT);
    }
}
