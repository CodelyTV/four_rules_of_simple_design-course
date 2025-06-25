import uuid
from abc import ABC, abstractmethod
from typing import Optional

from src.users.domain.user import User


class UserRepository(ABC):
	@abstractmethod
	def find_by_id(self, user_id: uuid.UUID) -> Optional[User]:
		pass

	@abstractmethod
	def save(self, user: User) -> None:
		pass


class UserNotFoundError(Exception):
	def __init__(self, user_id: uuid.UUID):
		super().__init__(f"User with id {user_id} not found")
		self.user_id = user_id


class UserAlreadyBlockedError(Exception):
	def __init__(self, user_id: uuid.UUID):
		super().__init__(f"User with id {user_id} is already blocked")
		self.user_id = user_id


class BlockUser:
	def __init__(self, user_repository: UserRepository):
		self._user_repository = user_repository

	def execute(self, user_id: uuid.UUID) -> None:
		user = self._user_repository.find_by_id(user_id)

		if user is None:
			raise UserNotFoundError(user_id)

		if user.is_blocked():
			raise UserAlreadyBlockedError(user_id)

		user.block()
		self._user_repository.save(user)
