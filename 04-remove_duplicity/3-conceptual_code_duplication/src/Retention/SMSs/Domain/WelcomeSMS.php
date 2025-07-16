<?php

declare(strict_types=1);

namespace CodelyTv\Retention\SMSs\Domain;

final readonly class WelcomeSMS
{
	public function __construct(
		private string $phoneNumber,
		private string $name
	) {}

	public function phoneNumber(): string
	{
		return $this->phoneNumber;
	}

	public function name(): string
	{
		return $this->name;
	}
}