import uuid
from abc import ABC, abstractmethod
from typing import Optional

from src.users.domain.user import User


class UserRepository(ABC):
    @abstractmethod
    def search(self, user_id: uuid.UUID) -> Optional[User]:
        pass

    @abstractmethod
    def save(self, user: User) -> None:
        pass