import uuid
from dataclasses import dataclass


@dataclass
class User:
    id: uuid.UUID
    name: str
    is_banned: bool = False

    def ban(self) -> None:
        self.is_banned = True

    def unban(self) -> None:
        self.is_banned = False