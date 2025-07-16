<?php

declare(strict_types=1);

namespace CodelyTv\Retention\Pushes\Domain;

final readonly class WelcomePush
{
	public function __construct(
		private string $deviceToken,
		private string $name
	) {}

	public function deviceToken(): string
	{
		return $this->deviceToken;
	}

	public function name(): string
	{
		return $this->name;
	}
}