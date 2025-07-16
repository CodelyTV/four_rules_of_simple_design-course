<?php

declare(strict_types=1);

namespace CodelyTv\Retention\Emails\Domain;

final readonly class WelcomeEmail
{
	public function __construct(
		private string $emailAddress,
		private string $name
	) {}

	public function emailAddress(): string
	{
		return $this->emailAddress;
	}

	public function name(): string
	{
		return $this->name;
	}
}
