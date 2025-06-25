import uuid

from src.users.domain.user_repository import UserRepository
from src.users.domain.user_not_found_error import UserNotFoundError
from src.users.domain.user_already_banned_error import UserAlreadyBannedError


class UserBanner:
	def __init__(self, user_repository: UserRepository):
		self._user_repository = user_repository

	def ban(self, user_id: uuid.UUID) -> None:
		user = self._user_repository.search(user_id)

		if user is None:
			raise UserNotFoundError(user_id)

		if user.is_banned():
			raise UserAlreadyBannedError(user_id)

		user.ban()

		self._user_repository.save(user)
