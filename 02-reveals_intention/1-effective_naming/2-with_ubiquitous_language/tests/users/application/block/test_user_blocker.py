import unittest
import uuid
import copy
from unittest.mock import Mock

from src.users.application.block.user_blocker import UserBlocker
from src.users.domain.user_not_found_error import UserNotFoundError
from src.users.domain.user_already_blocked_error import UserAlreadyBlockedError
from src.users.domain.user import User


class TestUserBlocker(unittest.TestCase):
    def setUp(self):
        self.repository = Mock()
        self.user_blocker = UserBlocker(self.repository)

    def test_block_user_successfully(self):
        user_id = uuid.uuid4()
        user = User(id=user_id, name="Javier", status=0)

        self.repository.search.return_value = copy.deepcopy(user)

        self.user_blocker.block(user_id)

        saved_user = self.repository.save.call_args[0][0]
        self.assertTrue(saved_user.is_blocked())
        self.assertEqual(saved_user.status, 1)

    def test_raises_error_when_user_not_found(self):
        non_existent_user_id = uuid.uuid4()

        self.repository.search.return_value = None

        with self.assertRaises(UserNotFoundError) as context:
            self.user_blocker.block(non_existent_user_id)

        self.assertEqual(context.exception.user_id, non_existent_user_id)

    def test_raises_error_when_user_already_blocked(self):
        user_id = uuid.uuid4()
        already_blocked_user = User(id=user_id, name="Javier", status=1)

        self.repository.search.return_value = already_blocked_user

        with self.assertRaises(UserAlreadyBlockedError) as context:
            self.user_blocker.block(user_id)

        self.assertEqual(context.exception.user_id, user_id)


if __name__ == "__main__":
    unittest.main()
