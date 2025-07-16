<?php

declare(strict_types=1);

namespace CodelyTv\Retention\Pushes\Application\SendWelcomePush;

use CodelyTv\Retention\Pushes\Domain\PushSenderGateway;
use CodelyTv\Retention\Pushes\Domain\WelcomePush;

final readonly class WelcomePushSender
{
	public function __construct(private PushSenderGateway $sender) {}

	public function send(string $name, string $deviceToken): void
	{
		$push = new WelcomePush($deviceToken, $name);

		$this->sender->send($push);
	}
}