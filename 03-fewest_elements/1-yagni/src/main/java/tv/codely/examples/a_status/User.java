package tv.codely.examples.a_status;

import java.util.UUID;

public record User(UUID id, String name, Status status) {

    public enum Status {
        DEFAULT,
        BANNED,
        ACTIVE,
        INACTIVE,
        SUSPENDED,
        TRIAL,
        EXPIRED
    }

    public boolean isBanned() {
        return status == Status.BANNED;
    }

    public boolean isDefault() {
        return status == Status.DEFAULT;
    }

    public boolean isActive() {
        return status == Status.ACTIVE;
    }

    public boolean isInactive() {
        return status == Status.INACTIVE;
    }

    public boolean isSuspended() {
        return status == Status.SUSPENDED;
    }

    public boolean isTrial() {
        return status == Status.TRIAL;
    }

    public boolean isExpired() {
        return status == Status.EXPIRED;
    }

    public User ban() {
        return new User(id, name, Status.BANNED);
    }

    public User unban() {
        return new User(id, name, Status.DEFAULT);
    }
}
