import uuid
from dataclasses import dataclass


@dataclass
class User:
    id: uuid.UUID
    name: str
    status: int

    def is_banned(self) -> bool:
        return self.status == 1

    def ban(self) -> None:
        self.status = 1

    def unban(self) -> None:
        self.status = 0