import uuid
from dataclasses import dataclass


@dataclass
class User:
    id: uuid.UUID
    name: str
    status: int

    def is_blocked(self) -> bool:
        return self.status == 1

    def block(self) -> None:
        self.status = 1

    def unblock(self) -> None:
        self.status = 0