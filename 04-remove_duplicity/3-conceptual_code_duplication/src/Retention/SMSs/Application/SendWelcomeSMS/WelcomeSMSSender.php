<?php

declare(strict_types=1);

namespace CodelyTv\Retention\SMSs\Application\SendWelcomeSMS;

use CodelyTv\Retention\SMSs\Domain\SMSSenderGateway;
use CodelyTv\Retention\SMSs\Domain\WelcomeSMS;

final readonly class WelcomeSMSSender
{
	public function __construct(private SMSSenderGateway $sender) {}

	public function send(string $name, string $phoneNumber): void
	{
		$sms = new WelcomeSMS($phoneNumber, $name);

		$this->sender->send($sms);
	}
}