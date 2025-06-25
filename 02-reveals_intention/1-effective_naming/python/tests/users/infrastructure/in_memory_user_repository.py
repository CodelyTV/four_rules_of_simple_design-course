import uuid
from typing import Dict, Optional

from src.users.domain.user import User
from src.users.domain.user_repository import UserRepository


class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._users: Dict[uuid.UUID, User] = {}

    def search(self, user_id: uuid.UUID) -> Optional[User]:
        return self._users.get(user_id)

    def save(self, user: User) -> None:
        self._users[user.id] = user