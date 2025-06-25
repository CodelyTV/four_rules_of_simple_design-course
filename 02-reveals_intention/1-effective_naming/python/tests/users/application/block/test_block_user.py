import unittest
import uuid
from typing import Dict, Optional

from src.users.application.block.block_user import (
    BlockUser,
    UserAlreadyBlockedError,
    UserNotFoundError,
    UserRepository,
)
from src.users.domain.user import User


class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._users: Dict[uuid.UUID, User] = {}

    def find_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        return self._users.get(user_id)

    def save(self, user: User) -> None:
        self._users[user.id] = user


class TestBlockUser(unittest.TestCase):
    def setUp(self):
        self.repository = InMemoryUserRepository()
        self.block_user = BlockUser(self.repository)

    def test_block_user_successfully(self):
        user_id = uuid.uuid4()
        user = User(id=user_id, name="John Doe", status=0)
        self.repository.save(user)

        self.block_user.execute(user_id)

        saved_user = self.repository.find_by_id(user_id)
        self.assertTrue(saved_user.is_blocked())
        self.assertEqual(saved_user.status, 1)

    def test_raises_error_when_user_not_found(self):
        non_existent_user_id = uuid.uuid4()

        with self.assertRaises(UserNotFoundError) as context:
            self.block_user.execute(non_existent_user_id)

        self.assertEqual(context.exception.user_id, non_existent_user_id)

    def test_raises_error_when_user_already_blocked(self):
        user_id = uuid.uuid4()
        already_blocked_user = User(id=user_id, name="Jane Doe", status=1)
        self.repository.save(already_blocked_user)

        with self.assertRaises(UserAlreadyBlockedError) as context:
            self.block_user.execute(user_id)

        self.assertEqual(context.exception.user_id, user_id)


if __name__ == "__main__":
    unittest.main()