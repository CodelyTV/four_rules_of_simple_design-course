<?php

declare(strict_types=1);

namespace CodelyTv;

use InvalidArgumentException;
use function strlen;

final readonly class Admin
{
	public function __construct(private string $username, private string $email, private string $code)
	{
		$usernameLength = strlen($username);

		if ($usernameLength < 3) {
			throw new InvalidArgumentException('Username must be at least 3 characters long');
		}

		if ($usernameLength > 20) {
			throw new InvalidArgumentException('Username must be less than 20 characters long');
		}
	}
}
