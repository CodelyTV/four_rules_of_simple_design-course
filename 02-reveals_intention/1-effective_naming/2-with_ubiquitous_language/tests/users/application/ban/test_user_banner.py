import unittest
import uuid
import copy
from unittest.mock import Mock

from src.users.application.ban.user_banner import UserBanner
from src.users.domain.user_not_found_error import UserNotFoundError
from src.users.domain.user_already_banned_error import UserAlreadyBannedError
from src.users.domain.user import User


class TestUserBanner(unittest.TestCase):
    def setUp(self):
        self.repository = Mock()
        self.user_banner = UserBanner(self.repository)

    def test_ban_user_successfully(self):
        user_id = uuid.uuid4()
        user = User(id=user_id, name="Javier", status=0)

        self.repository.search.return_value = copy.deepcopy(user)

        self.user_banner.ban(user_id)

        saved_user = self.repository.save.call_args[0][0]
        self.assertTrue(saved_user.is_banned())
        self.assertEqual(saved_user.status, 1)

    def test_raises_error_when_user_not_found(self):
        non_existent_user_id = uuid.uuid4()

        self.repository.search.return_value = None

        with self.assertRaises(UserNotFoundError) as context:
            self.user_banner.ban(non_existent_user_id)

        self.assertEqual(context.exception.user_id, non_existent_user_id)

    def test_raises_error_when_user_already_banned(self):
        user_id = uuid.uuid4()
        already_banned_user = User(id=user_id, name="Javier", status=1)

        self.repository.search.return_value = already_banned_user

        with self.assertRaises(UserAlreadyBannedError) as context:
            self.user_banner.ban(user_id)

        self.assertEqual(context.exception.user_id, user_id)


if __name__ == "__main__":
    unittest.main()
