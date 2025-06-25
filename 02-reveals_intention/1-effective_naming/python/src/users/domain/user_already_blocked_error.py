import uuid


class UserAlreadyBlockedError(Exception):
    def __init__(self, user_id: uuid.UUID):
        super().__init__(f"User with id {user_id} is already blocked")
        self.user_id = user_id