<?php

declare(strict_types=1);

namespace CodelyTv;

use InvalidArgumentException;

final readonly class User
{
	public function __construct(
		private string $username,
		private string $email,
		private string $name,
		private string $surname
	) {
		$usernameLength = strlen($username);

		if ($usernameLength < 3) {
			throw new InvalidArgumentException('Username must be at least 3 characters long');
		}

		if ($usernameLength > 20) {
			throw new InvalidArgumentException('Username must be less than 20 characters long');
		}
	}
}
