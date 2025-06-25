import uuid


class UserNotFoundError(Exception):
    def __init__(self, user_id: uuid.UUID):
        super().__init__(f"User with id {user_id} not found")
        self.user_id = user_id