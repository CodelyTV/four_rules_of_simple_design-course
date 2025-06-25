import uuid


class UserAlreadyBannedError(Exception):
    def __init__(self, user_id: uuid.UUID):
        super().__init__(f"User with id {user_id} is already banned")
        self.user_id = user_id